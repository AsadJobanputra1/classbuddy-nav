import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/lib/supabase";

interface GPTKnowledgebaseStepProps {
  gptId: string | null;
  files: Array<{
    filename: string;
    file_path: string;
  }>;
  onFileUpload: () => void;
}

const GPTKnowledgebaseStep = ({ gptId, files, onFileUpload }: GPTKnowledgebaseStepProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('gpt-files')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      if (gptId) {
        const { error: dbError } = await supabase
          .from('gpt_files')
          .insert({
            gpt_id: gptId,
            filename: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size
          });

        if (dbError) {
          throw dbError;
        }
      }

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      
      onFileUpload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Step 4: Configure Knowledge Base</h3>
      <p className="text-gray-600 mb-4">Upload files to be used in the knowledge base.</p>
      
      <div>
        <Label htmlFor="file">Upload File</Label>
        <div className="mt-2">
          <Input
            id="file"
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={uploading}
            onClick={() => document.getElementById('file')?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <Label>Uploaded Files</Label>
          <div className="mt-2 space-y-2">
            {files.map((file) => (
              <div
                key={file.file_path}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-600">{file.filename}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GPTKnowledgebaseStep;