import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Image,
  Mic,
  Video,
  Users,
  BarChart3,
} from "lucide-react";
import {
  Dataset,
  DataType,
  DatasetStatus,
  Contribution,
  VerificationStatus,
} from "@/types";
import axios from "axios";

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [newDataset, setNewDataset] = useState<
    Omit<Dataset, "id" | "createdAt" | "currentSampleCount" | "status">
  >({
    name: "",
    description: "",
    dataType: DataType.TEXT,
    formatRequirements: "",
    sampleCountGoal: 1000,
    baseRewardPerSample: 0.5,
  });
  const [editingDataset, setEditingDataset] = useState<Dataset | null>(null);
  const isEditMode = !!editingDataset;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [datasetRes, contribRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/datasets`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/contributions`),
        ]);

        setDatasets(datasetRes.data);
        setContributions(contribRes.data);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Could not load datasets or contributions.",
          variant: "destructive",
        });
      }
    };

    fetchAllData();
  }, []);

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
        return "bg-emerald-100 text-emerald-800";
      case DatasetStatus.COMPLETED:
        return "bg-blue-100 text-blue-800";
      case DatasetStatus.CLOSED:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateDataset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/datasets`,
        newDataset
      );

      toast({
        title: "Success!",
        description: "Dataset created successfully.",
      });

      setDatasets((prev) => [...prev, response.data]);
      setIsCreateModalOpen(false);
      setNewDataset({
        name: "",
        description: "",
        dataType: DataType.TEXT,
        formatRequirements: "",
        sampleCountGoal: 1000,
        baseRewardPerSample: 0.5,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create dataset.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDataset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDataset) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/datasets/${editingDataset.id}`,
        editingDataset
      );

      setDatasets((prev) =>
        prev.map((d) => (d.id === editingDataset.id ? response.data : d))
      );

      toast({
        title: "Success!",
        description: "Dataset updated successfully.",
      });

      setEditingDataset(null);
      setIsCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update dataset.",
        variant: "destructive",
      });
    }
  };

  const toggleDatasetStatus = async (
    datasetId: string,
    currentStatus: DatasetStatus
  ) => {
    const newStatus =
      currentStatus === DatasetStatus.ACTIVE
        ? DatasetStatus.CLOSED
        : DatasetStatus.ACTIVE;

    try {
      const target = datasets.find((d) => d.id === datasetId);
      if (!target) return;

      const updated = { ...target, status: newStatus };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/datasets/${datasetId}`,
        updated
      );

      setDatasets((prev) =>
        prev.map((d) => (d.id === datasetId ? { ...d, status: newStatus } : d))
      );

      toast({
        title: "Status Updated",
        description: `Dataset status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update dataset status.",
        variant: "destructive",
      });
    }
  };

  const renderFilePreview = (url: string, type: DataType) => {
    if (!url) return null;

    switch (type) {
      case DataType.IMAGE:
        return (
          <img src={url} alt="Preview" className="w-40 h-auto rounded-md" />
        );
      case DataType.AUDIO:
        return <audio controls src={url} className="w-full" />;
      case DataType.VIDEO:
        return (
          <video controls src={url} className="w-full max-w-xs rounded-md" />
        );
      case DataType.TEXT:
      default:
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View File
          </a>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage datasets, contributions, and platform settings.
            </p>
          </div>

          <Dialog
            open={isCreateModalOpen}
            onOpenChange={(open) => {
              if (!open) {
                setIsCreateModalOpen(false);
                setEditingDataset(null);
                setNewDataset({
                  name: "",
                  description: "",
                  dataType: DataType.TEXT,
                  formatRequirements: "",
                  sampleCountGoal: 1000,
                  baseRewardPerSample: 0.5,
                });
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-violet-600 hover:bg-violet-700 dark:text-white"
                onClick={() => {
                  setIsCreateModalOpen(true);
                  setEditingDataset(null);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Dataset" : "Create New Dataset"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={
                  isEditMode ? handleUpdateDataset : handleCreateDataset
                }
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">Dataset Name</Label>
                  <Input
                    id="name"
                    value={isEditMode ? editingDataset?.name : newDataset.name}
                    onChange={(e) =>
                      isEditMode
                        ? setEditingDataset({
                            ...editingDataset!,
                            name: e.target.value,
                          })
                        : setNewDataset({ ...newDataset, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={
                      isEditMode
                        ? editingDataset?.description
                        : newDataset.description
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setEditingDataset({
                            ...editingDataset!,
                            description: e.target.value,
                          })
                        : setNewDataset({
                            ...newDataset,
                            description: e.target.value,
                          })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dataType">Data Type</Label>
                  <Select
                    value={
                      isEditMode
                        ? editingDataset?.dataType
                        : newDataset.dataType
                    }
                    onValueChange={(value) =>
                      isEditMode
                        ? setEditingDataset({
                            ...editingDataset!,
                            dataType: value as DataType,
                          })
                        : setNewDataset({
                            ...newDataset,
                            dataType: value as DataType,
                          })
                    }
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
                  <Label htmlFor="formatRequirements">
                    Format Requirements
                  </Label>
                  <Textarea
                    id="formatRequirements"
                    value={
                      isEditMode
                        ? editingDataset?.formatRequirements
                        : newDataset.formatRequirements
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setEditingDataset({
                            ...editingDataset!,
                            formatRequirements: e.target.value,
                          })
                        : setNewDataset({
                            ...newDataset,
                            formatRequirements: e.target.value,
                          })
                    }
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
                      value={
                        isEditMode
                          ? editingDataset?.sampleCountGoal
                          : newDataset.sampleCountGoal
                      }
                      onChange={(e) =>
                        isEditMode
                          ? setEditingDataset({
                              ...editingDataset!,
                              sampleCountGoal: parseInt(e.target.value),
                            })
                          : setNewDataset({
                              ...newDataset,
                              sampleCountGoal: parseInt(e.target.value),
                            })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="baseRewardPerSample">
                      Reward per Sample
                    </Label>
                    <Input
                      id="baseRewardPerSample"
                      type="number"
                      step="0.1"
                      value={
                        isEditMode
                          ? editingDataset?.baseRewardPerSample
                          : newDataset.baseRewardPerSample
                      }
                      onChange={(e) =>
                        isEditMode
                          ? setEditingDataset({
                              ...editingDataset!,
                              baseRewardPerSample: parseFloat(e.target.value),
                            })
                          : setNewDataset({
                              ...newDataset,
                              baseRewardPerSample: parseFloat(e.target.value),
                            })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingDataset(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-700 dark:text-white"
                  >
                    {isEditMode ? "Update Dataset" : "Create Dataset"}
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
                    {
                      datasets.filter((d) => d.status === DatasetStatus.ACTIVE)
                        .length
                    }
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
                    {
                      contributions.filter(
                        (c) => c.status === VerificationStatus.PENDING
                      ).length
                    }
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
                    <div
                      key={dataset.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {getIcon(dataset.dataType)}
                        <div>
                          <h3 className="font-semibold">{dataset.name}</h3>
                          <p className="text-sm text-gray-500">
                            {dataset.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>
                              {dataset.currentSampleCount}/
                              {dataset.sampleCountGoal} samples
                            </span>
                            <span>
                              {dataset.baseRewardPerSample} tokens/sample
                            </span>
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
                          onClick={() =>
                            toggleDatasetStatus(dataset.id, dataset.status)
                          }
                        >
                          {dataset.status === DatasetStatus.ACTIVE
                            ? "Close"
                            : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingDataset(dataset);
                            setIsCreateModalOpen(true);
                          }}
                        >
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
                    <div
                      key={contribution.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">
                          File:{" "}
                          {renderFilePreview(
                            contribution.url,
                            datasets?.dataType || DataType.TEXT
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          User: {contribution.userId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Dataset:{" "}
                          {datasets.find((d) => d.id === contribution.datasetId)
                            ?.name ?? "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            contribution.uploadedAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
                        <Badge
                          className={
                            contribution.status === VerificationStatus.VERIFIED
                              ? "bg-emerald-100 text-emerald-800"
                              : contribution.status ===
                                VerificationStatus.PENDING
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {contribution.status}
                        </Badge>
                        {contribution.verificationScore > 0 && (
                          <span className="text-sm text-gray-600">
                            Score: {contribution.verificationScore}/10
                          </span>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/contributions/${contribution.id}`)
                          }
                        >
                          Verify
                        </Button>
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
