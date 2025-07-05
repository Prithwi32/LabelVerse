import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  ArrowLeft,
  Upload,
  FileText,
  Image,
  Mic,
  Video,
  AlertCircle,
} from "lucide-react";
import { Dataset, DataType, DatasetStatus } from "@/types";

const Contribution = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDataset = async () => {
      if (!datasetId) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/datasets/${datasetId}`
        );
        setDataset(response.data);
      } catch (error) {
        console.error("Error fetching dataset:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dataset. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataset();
  }, [datasetId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading dataset...</p>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Dataset Not Found</h2>
            <p className="text-gray-600 mb-4">
              The requested dataset could not be found.
            </p>
            <Button onClick={() => navigate("/datasets")}>
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
        return ".wav,.mp3,.m4a";
      case DataType.IMAGE:
        return ".png,.jpg,.jpeg";
      case DataType.VIDEO:
        return ".mp4,.mov,.avi";
      default:
        return "";
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

  if (!dataset) return;

  const userId = "46449169-9daf-48a7-909f-92aff169419b"; // Replace this with the actual logged-in user's ID

  // Basic validation
  if (dataset.dataType !== DataType.TEXT && !file) {
    toast({
      title: "Error",
      description: "Please select a file to upload.",
      variant: "destructive",
    });
    setIsSubmitting(false);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("userId", userId);
    formData.append("datasetId", dataset.id);

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/contributions`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast({
      title: "Success!",
      description: "Your contribution has been submitted for verification.",
    });

    setFile(null);
    setDescription("");
    setTextContent("");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } catch (error: any) {
    console.error("Contribution submission error:", error);
    toast({
      title: "Error",
      description:
        error?.response?.data?.message ||
        "Failed to submit contribution. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/datasets")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Datasets
          </Button>

          <div className="flex items-center space-x-3 mb-4">
            {getIcon(dataset.dataType)}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{dataset.name}</h1>
            <Badge className="bg-emerald-100 text-emerald-800">
              {dataset.status}
            </Badge>
          </div>

          <p className="text-gray-600 dark:text-gray-400">{dataset.description}</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {
                          textContent
                            .split(" ")
                            .filter((word) => word.length > 0).length
                        }{" "}
                        words
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
                              <span className="text-sm font-medium">
                                {file.name}
                              </span>
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
                    className="w-full bg-violet-600 hover:bg-violet-700 dark:text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : `Submit Contribution (${dataset.baseRewardPerSample} tokens)`}
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
                  <h4 className="font-medium text-gray-900 dark:text-gray-500">
                    Format Requirements
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-600">
                    {dataset.formatRequirements || "No Requirements specified!"}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-500">
                    Reward per Sample
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dataset.baseRewardPerSample} tokens
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-500">Progress</h4>
                  <p className="text-sm text-gray-600">
                    {dataset.currentSampleCount} / {dataset.sampleCountGoal}{" "}
                    samples
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg dark:text-gray-500">Success Criteria</CardTitle>
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
                      <span className="text-xs font-medium text-violet-600">
                        1
                      </span>
                    </div>
                    <span>AI model analyzes your submission</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">
                        2
                      </span>
                    </div>
                    <span>Quality score is calculated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-violet-600">
                        3
                      </span>
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
