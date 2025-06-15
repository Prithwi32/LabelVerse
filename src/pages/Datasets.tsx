
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Image, Mic, Video, Clock, CheckCircle, Target } from 'lucide-react';
import { Dataset, DataType, DatasetStatus } from '@/types';

const Datasets = () => {
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
    },
    {
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
    },
    {
      id: '4',
      name: 'Traffic Camera Dataset',
      description: 'Video footage for autonomous vehicle training',
      dataType: DataType.VIDEO,
      formatRequirements: 'MP4, 1080p, 30fps, 10-120 seconds',
      sampleCountGoal: 2000,
      currentSampleCount: 450,
      baseRewardPerSample: 5.0,
      createdAt: '2024-03-01',
      status: DatasetStatus.ACTIVE
    },
    {
      id: '5',
      name: 'Handwriting Recognition',
      description: 'Handwritten text images for OCR training',
      dataType: DataType.IMAGE,
      formatRequirements: 'PNG, 300 DPI minimum, clear handwriting',
      sampleCountGoal: 8000,
      currentSampleCount: 1200,
      baseRewardPerSample: 0.8,
      createdAt: '2024-03-10',
      status: DatasetStatus.ACTIVE
    },
    {
      id: '6',
      name: 'Code Documentation',
      description: 'Programming code with comprehensive documentation',
      dataType: DataType.TEXT,
      formatRequirements: 'Any programming language, well-commented',
      sampleCountGoal: 3000,
      currentSampleCount: 3000,
      baseRewardPerSample: 1.5,
      createdAt: '2024-01-20',
      status: DatasetStatus.COMPLETED
    }
  ];

  const [activeTab, setActiveTab] = useState('all');

  const getIcon = (dataType: DataType) => {
    switch (dataType) {
      case DataType.TEXT:
        return <FileText className="w-5 h-5" />;
      case DataType.IMAGE:
        return <Image className="w-5 h-5" />;
      case DataType.AUDIO:
        return <Mic className="w-5 h-5" />;
      case DataType.VIDEO:
        return <Video className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: DatasetStatus) => {
    switch (status) {
      case DatasetStatus.ACTIVE:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case DatasetStatus.COMPLETED:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case DatasetStatus.CLOSED:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const filterDatasets = (datasets: Dataset[], filter: string) => {
    if (filter === 'all') return datasets;
    return datasets.filter(dataset => dataset.dataType.toLowerCase() === filter);
  };

  const getProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Active Datasets</h1>
            <p className="text-xl mb-8 opacity-90">
              Choose a dataset to contribute to and start earning tokens for verified submissions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="text">
              <FileText className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="image">
              <Image className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="audio">
              <Mic className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDatasets(datasets, activeTab).map((dataset) => (
                <Card key={dataset.id} className="hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getIcon(dataset.dataType)}
                        <CardTitle className="text-lg dark:text-white">{dataset.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(dataset.status)}>
                        {dataset.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{dataset.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="font-medium dark:text-white">
                          {dataset.currentSampleCount}/{dataset.sampleCountGoal}
                        </span>
                      </div>
                      <Progress value={getProgress(dataset.currentSampleCount, dataset.sampleCountGoal)} />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <Target className="w-4 h-4" />
                        <span>{dataset.baseRewardPerSample} tokens/sample</span>
                      </div>
                      
                      {dataset.status === DatasetStatus.ACTIVE ? (
                        <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 dark:text-white">
                          <Link to={`/contribute/${dataset.id}`}>Contribute</Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          {dataset.status === DatasetStatus.COMPLETED ? 'Completed' : 'Closed'}
                        </Button>
                      )}
                    </div>

                    <div className="pt-2 border-t dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <strong>Requirements:</strong> {dataset.formatRequirements}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-orange-100 dark:border-orange-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {datasets.filter(d => d.status === DatasetStatus.ACTIVE).length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Datasets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {datasets.reduce((sum, d) => sum + d.currentSampleCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Samples</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {datasets.reduce((sum, d) => sum + (d.currentSampleCount * d.baseRewardPerSample), 0).toFixed(1)}K
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Tokens Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(datasets.reduce((sum, d) => sum + (d.currentSampleCount / d.sampleCountGoal), 0) / datasets.length * 100)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Completion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasets;
