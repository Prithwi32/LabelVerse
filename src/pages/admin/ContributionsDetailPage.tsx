import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Contribution,
  DataType,
  Dataset,
  VerificationStatus,
} from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContributionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contribution, setContribution] = useState<Contribution | null>(null);
  const [datasetName, setDatasetName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contribRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/contributions/${id}`
        );
        setContribution(contribRes.data);

        const datasetRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/datasets/${contribRes.data.datasetId}`
        );
        setDatasetName(datasetRes.data.name);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load contribution or dataset",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [id]);

  const handleVerification = async (status: VerificationStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/contributions/${contribution?.id}`,
        { status }
      );

      setContribution((prev) =>
        prev ? { ...prev, status } : prev
      );

      toast({
        title: "Status Updated",
        description: `Contribution marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive",
      });
    }
  };

  const renderFilePreview = (url: string, type: DataType) => {
    if (!url) return null;

    switch (type) {
      case DataType.IMAGE:
        return <img src={url} alt="Preview" className="w-full max-w-md rounded-md shadow" />;
      case DataType.AUDIO:
        return <audio controls src={url} className="w-full" />;
      case DataType.VIDEO:
        return <video controls src={url} className="w-full max-w-md rounded-md shadow" />;
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

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.PENDING:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case VerificationStatus.VERIFIED:
        return <Badge className="bg-emerald-100 text-emerald-800">Verified</Badge>;
      case VerificationStatus.REJECTED:
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!contribution) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-2xl">Contribution Details</CardTitle>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            ← Back to Admin
          </Button>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p><strong>ID:</strong> {contribution.id}</p>
              <p><strong>User ID:</strong> {contribution.userId}</p>
              <p><strong>Dataset:</strong> {datasetName}</p>
              <p><strong>Status:</strong> {getStatusBadge(contribution.status)}</p>
              <p><strong>Uploaded:</strong> {new Date(contribution.uploadedAt).toLocaleString()}</p>
              {contribution.verificationScore !== undefined && (
                <p><strong>Score:</strong> {contribution.verificationScore || "0"}/10</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Actions</h3>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleVerification(VerificationStatus.VERIFIED)}
                  disabled={contribution.status === VerificationStatus.VERIFIED}
                >
                  ✅ Verify
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleVerification(VerificationStatus.REJECTED)}
                  disabled={contribution.status === VerificationStatus.REJECTED}
                >
                  ❌ Reject
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Preview</h3>
            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-800">
              {renderFilePreview(contribution.url, contribution.dataType || DataType.TEXT)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContributionDetails;
