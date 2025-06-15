
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, Image, Mic, Video, AlertCircle } from 'lucide-react';
import { Dataset, DataType, DatasetStatus } from '@/types';

const Contribution = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock dataset data - in real app, fetch by ID
  const mockDatasets: Record<string, Dataset> = {
    '1': {
      id: '1',
      name: 'Tamil Voice Recognition',
      description: 'High-quality Tamil voice recordings for speech recognition models',
      dataType: DataType.AUDIO,
      formatRequirements: 'WAV format, 16kHz, 60 seconds max',
      sampleCountGoal: 10000,
      currentSampleCount: 7500,
      baseRewardPerSample: 0.5,
      createdAt: '2024-01-15',
      status: DatasetStatus.ACTIVE
    },
    '3': {
      id: '3',
      name: 'Sentiment Analysis Corpus',
      description: 'Text samples with emotional sentiment labels',
      dataType: DataType.TEXT,
      formatRequirements: 'Plain text, 10-500 words, English only',
      sampleCountGoal: 15000,
      currentSampleCount: 3200,
      baseRewardPerSample: 0.3,
      createdAt: '2024-02-15',
      status: DatasetStatus.ACTIVE
    }
  };

  const dataset = datasetId ? mockDatasets[datasetId] : null;

  if (!dataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Dataset Not Found</h2>
            <p className="text-gray-600 mb-4">The requested dataset could not be found.</p>
            <Button onClick={() => navigate('/datasets')}>
              Back to Datasets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getIcon = (dataType: DataType) => {
    switch (dataType) {
      case DataType.TEXT:
        return <FileText className="w-6 h-6" />;
      case DataType.IMAGE:
        return <Image className="w-6 h-6" />;
      case DataType.AUDIO:
        return <Mic className="w-6 h-6" />;
      case DataType.VIDEO:
        return <Video className="w-6 h-6" />;
    }
  };

  const getAcceptedFileTypes = (dataType: DataType) => {
    switch (dataType) {
      case DataType.AUDIO:
        return '.wav,.mp3,.m4a';
      case DataType.IMAGE:
        return '.png,.jpg,.jpeg';
      case DataType.VIDEO:
        return '.mp4,.mov,.avi';
      default:
        return '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (dataset.dataType !== DataType.TEXT && !file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (dataset.dataType === DataType.TEXT && !textContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter text content.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: "Your contribution has been submitted for verification.",
      });

      // Reset form
      setFile(null);
      setDescription('');
      setTextContent('');
      
      // Navigate to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit contribution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/datasets')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Datasets
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            {getIcon(dataset.dataType)}
            <h1 className="text-3xl font-bold text-gray-900">{dataset.name}</h1>
            <Badge className="bg-emerald-100 text-emerald-800">
              {dataset.status}
            </Badge>
          </div>
          
          <p className="text-gray-600">{dataset.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Text Input for Text Datasets */}
                  {dataset.dataType === DataType.TEXT && (
                    <div>
                      <Label htmlFor="textContent">Text Content *</Label>
                      <Textarea
                        id="textContent"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        placeholder="Enter your text content here..."
                        rows={8}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {textContent.split(' ').filter(word => word.length > 0).length} words
                      </p>
                    </div>
                  )}

                  {/* File Upload for Non-Text Datasets */}
                  {dataset.dataType !== DataType.TEXT && (
                    <div>
                      <Label htmlFor="file">Upload File *</Label>
                      <div className="mt-1">
                        <Input
                          id="file"
                          type="file"
                          accept={getAcceptedFileTypes(dataset.dataType)}
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        {file && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Upload className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <span className="text-sm text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add any additional context or notes about your contribution..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-violet-600 hover:bg-violet-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : `Submit Contribution (${dataset.baseRewardPerSample} tokens)`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dataset Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dataset Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Format Requirements</h4>
                  <p className="text-sm text-gray-600">{dataset.formatRequirements}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Reward per Sample</h4>
                  <p className="text-sm text-gray-600">{dataset.baseRewardPerSample} tokens</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Progress</h4>
                  <p className="text-sm text-gray-600">
                    {dataset.currentSampleCount} / {dataset.sampleCountGoal} samples
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>Follow format requirements exactly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>Ensure high quality and clarity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>Avoid copyrighted content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>Provide accurate and relevant data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Verification Process */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">1</span>
                    </div>
                    <span>AI model analyzes your submission</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">2</span>
                    </div>
                    <span>Quality score is calculated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">3</span>
                    </div>
                    <span>Tokens are awarded for verified contributions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
