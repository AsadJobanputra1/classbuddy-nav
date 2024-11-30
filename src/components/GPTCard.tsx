import { Edit, Trash2, Bot } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface GPTCardProps {
  id: string;
  name: string;
  description: string;
  icon?: string | null;
  onDelete?: () => void;
  onEdit?: () => void;
}

const GPTCard = ({ 
  id, 
  name, 
  description,
  icon,
  onDelete,
  onEdit 
}: GPTCardProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("gpts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete GPT",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "GPT deleted successfully",
    });

    if (onDelete) {
      onDelete();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {icon && !imageError ? (
            <img 
              src={icon} 
              alt={name} 
              className="w-8 h-8 rounded-full"
              onError={handleImageError}
            />
          ) : (
            <img 
              src="/lovable-uploads/16e66459-08b8-409e-8e30-045c5f91ca38.png"
              alt={name}
              className="w-8 h-8"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this GPT.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default GPTCard;