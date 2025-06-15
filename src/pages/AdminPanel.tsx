
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, FileText, Image, Mic, Video, Users, BarChart3 } from 'lucide-react';
import { Dataset, DataType, DatasetStatus, Contribution, VerificationStatus } from '@/types';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '',
    dataType: DataType.TEXT,
    formatRequirements: '',
    sampleCountGoal: 1000,
    baseRewardPerSample: 0.5
  });

  // Mock data
  const datasets: Dataset[] = [
    {
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
    {
      id: '2',
      name: 'Medical Image Classification',
      description: 'X-ray and MRI images for medical AI training',
      dataType: DataType.IMAGE,
      formatRequirements: 'PNG/JPEG, 512x512px minimum, DICOM preferred',
      sampleCountGoal: 5000,
      currentSampleCount: 5000,
      baseRewardPerSample: 2.0,
      createdAt: '2024-02-01',
      status: DatasetStatus.COMPLETED
    }
  ];

  const contributions: Contribution[] = [
    {
      id: '1',
      userId: 'user1',
      datasetId: '1',
      url: 'audio-sample-1.wav',
      uploadedAt: '2024-03-15T10:30:00Z',
      verificationScore: 9.2,
      status: VerificationStatus.VERIFIED
    },
    {
      id: '2',
      userId: 'user2',
      datasetId: '1',
      url: 'audio-sample-2.wav',
      uploadedAt: '2024-03-15T11:15:00Z',
      verificationScore: 0,
      status: VerificationStatus.PENDING
    }
  ];

  const getIcon = (dataType: DataType) => {
    switch (dataType) {
      case DataType.TEXT:
        return <FileText className="w-4 h-4" />;
      case DataType.IMAGE:
        return <Image className="w-4 h-4" />;
      case DataType.AUDIO:
        return <Mic className="w-4 h-4" />;
      case DataType.VIDEO:
        return <Video className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: DatasetStatus) => {
    switch (status) {
      case DatasetStatus.ACTIVE:
        return 'bg-emerald-100 text-emerald-800';
      case DatasetStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      case DatasetStatus.CLOSED:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateDataset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Dataset created successfully.",
      });
      
      setIsCreateModalOpen(false);
      setNewDataset({
        name: '',
        description: '',
        dataType: DataType.TEXT,
        formatRequirements: '',
        sampleCountGoal: 1000,
        baseRewardPerSample: 0.5
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create dataset.",
        variant: "destructive"
      });
    }
  };

  const toggleDatasetStatus = (datasetId: string, currentStatus: DatasetStatus) => {
    const newStatus = currentStatus === DatasetStatus.ACTIVE ? DatasetStatus.CLOSED : DatasetStatus.ACTIVE;
    toast({
      title: "Status Updated",
      description: `Dataset status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage datasets, contributions, and platform settings.</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Dataset</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateDataset} className="space-y-4">
                <div>
                  <Label htmlFor="name">Dataset Name</Label>
                  <Input
                    id="name"
                    value={newDataset.name}
                    onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDataset.description}
                    onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="dataType">Data Type</Label>
                  <Select 
                    value={newDataset.dataType} 
                    onValueChange={(value) => setNewDataset({ ...newDataset, dataType: value as DataType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DataType.TEXT}>Text</SelectItem>
                      <SelectItem value={DataType.IMAGE}>Image</SelectItem>
                      <SelectItem value={DataType.AUDIO}>Audio</SelectItem>
                      <SelectItem value={DataType.VIDEO}>Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="formatRequirements">Format Requirements</Label>
                  <Textarea
                    id="formatRequirements"
                    value={newDataset.formatRequirements}
                    onChange={(e) => setNewDataset({ ...newDataset, formatRequirements: e.target.value })}
                    placeholder="e.g., WAV format, 16kHz, 60 seconds max"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sampleCountGoal">Sample Goal</Label>
                    <Input
                      id="sampleCountGoal"
                      type="number"
                      value={newDataset.sampleCountGoal}
                      onChange={(e) => setNewDataset({ ...newDataset, sampleCountGoal: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="baseRewardPerSample">Reward per Sample</Label>
                    <Input
                      id="baseRewardPerSample"
                      type="number"
                      step="0.1"
                      value={newDataset.baseRewardPerSample}
                      onChange={(e) => setNewDataset({ ...newDataset, baseRewardPerSample: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                    Create Dataset
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-violet-600" />
                <div>
                  <p className="text-2xl font-bold">{datasets.length}</p>
                  <p className="text-sm text-gray-500">Total Datasets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{contributions.length}</p>
                  <p className="text-sm text-gray-500">Total Contributions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {datasets.filter(d => d.status === DatasetStatus.ACTIVE).length}
                  </p>
                  <p className="text-sm text-gray-500">Active Datasets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {contributions.filter(c => c.status === VerificationStatus.PENDING).length}
                  </p>
                  <p className="text-sm text-gray-500">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="datasets">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datasets.map((dataset) => (
                    <div key={dataset.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getIcon(dataset.dataType)}
                        <div>
                          <h3 className="font-semibold">{dataset.name}</h3>
                          <p className="text-sm text-gray-500">{dataset.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>{dataset.currentSampleCount}/{dataset.sampleCountGoal} samples</span>
                            <span>{dataset.baseRewardPerSample} tokens/sample</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(dataset.status)}>
                          {dataset.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleDatasetStatus(dataset.id, dataset.status)}
                        >
                          {dataset.status === DatasetStatus.ACTIVE ? 'Close' : 'Activate'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{contribution.url}</h3>
                        <p className="text-sm text-gray-500">
                          User: {contribution.userId} • Dataset: {contribution.datasetId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(contribution.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          contribution.status === VerificationStatus.VERIFIED ? 'bg-emerald-100 text-emerald-800' :
                          contribution.status === VerificationStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {contribution.status}
                        </Badge>
                        {contribution.verificationScore > 0 && (
                          <span className="text-sm text-gray-600">
                            Score: {contribution.verificationScore}/10
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
