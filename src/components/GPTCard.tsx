import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Pin, Trash, Share2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";

interface GPTCardProps {
  id: string;
  name: string;
  description: string;
  is_featured: boolean;
  onDelete: (id: string) => void;
  onToggleFeature: (id: string, featured: boolean) => void;
}

const GPTCard = ({ id, name, description, is_featured, onDelete, onToggleFeature }: GPTCardProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/gpt/${id}`);
      toast({
        title: "Link copied",
        description: "GPT link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFeature(id, !is_featured)}
              className={is_featured ? "text-yellow-500" : ""}
            >
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Additional content can be added here */}
      </CardContent>
    </Card>
  );
};

export default GPTCard;