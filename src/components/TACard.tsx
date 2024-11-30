import { Edit, Trash2 } from "lucide-react";
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

interface TACardProps {
  id: string;
  name: string;
  course: string;
  instructor_name?: string;
  instructor_email?: string;
  ta_email?: string;
  teaching_style?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const TACard = ({ 
  id, 
  name, 
  course, 
  instructor_name,
  instructor_email,
  ta_email,
  teaching_style,
  onDelete,
  onEdit 
}: TACardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    const { error } = await supabase
      .from("virtual_tas")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete teaching assistant",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Teaching assistant deleted successfully",
    });

    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{course}</p>
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
                  Are you sure you want to delete this teaching assistant?
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
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Instructor:</span> {instructor_name || 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {ta_email || 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Teaching Style:</span> {teaching_style || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default TACard;