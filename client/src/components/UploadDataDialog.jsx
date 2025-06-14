import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export function UploadDataDialog({
  open,
  onOpenChange,
  onDataUpload,
  currentData,
}) {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(currentData, null, 2)
  );
  const [error, setError] = useState(null);

  const handleUpload = () => {
    try {
      const parsedData = JSON.parse(jsonInput);

      // Validate the data structure
      if (!Array.isArray(parsedData.followers)) {
        throw new Error("Followers must be an array of numbers");
      }

      if (!Array.isArray(parsedData.engagement)) {
        throw new Error("Engagement must be an array of objects");
      }

      if (typeof parsedData.bestPostTime !== "string") {
        throw new Error("Best post time must be a string");
      }

      // If validation passes, upload the data
      onDataUpload(parsedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
    }
  };

  const handleSampleData = () => {
    const sampleData = {
      followers: [1500, 1550, 1620, 1700, 1750, 1820, 1900],
      engagement: [
        { post: 1, likes: 450, comments: 32 },
        { post: 2, likes: 520, comments: 45 },
        { post: 3, likes: 380, comments: 28 },
        { post: 4, likes: 600, comments: 52 },
        { post: 5, likes: 480, comments: 38 },
      ],
      bestPostTime: "Friday 7 PM",
    };

    setJsonInput(JSON.stringify(sampleData, null, 2));
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] h-[90vh] sm:h-auto overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Upload Analytics Data
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Paste your JSON data below or use the sample data to update the
            dashboard.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="font-mono text-sm min-h-[200px] sm:min-h-[300px] w-full resize-y"
            placeholder="Paste your JSON data here..."
          />

          <div className="text-xs text-muted-foreground">
            <p className="mb-1">Expected format:</p>
            <div className="bg-muted p-2 rounded-md overflow-x-auto text-[10px] sm:text-xs leading-relaxed">
              <pre className="whitespace-pre-wrap sm:whitespace-pre">
                {`{
  "followers": [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  "engagement": [
    {"post": 1, "likes": 320, "comments": 25},
    {"post": 2, "likes": 400, "comments": 40}
  ],
  "bestPostTime": "Wednesday 7 PM"
}`}
              </pre>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleSampleData}
            className="w-full sm:w-auto sm:mr-auto"
          >
            Use Sample Data
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} className="w-full sm:w-auto gap-2">
            <Upload className="h-4 w-4" />
            Update Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
