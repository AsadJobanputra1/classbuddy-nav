import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface TATableProps {
  tas: any[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TATable = ({ tas, onDelete, onEdit }: TATableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teaching Style</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tas.map((ta) => (
            <TableRow key={ta.id}>
              <TableCell className="font-medium">{ta.name}</TableCell>
              <TableCell>{ta.course}</TableCell>
              <TableCell>{ta.instructor_name}</TableCell>
              <TableCell>{ta.ta_email}</TableCell>
              <TableCell className="capitalize">{ta.teaching_style}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(ta.id)}
                    className="p-2 hover:bg-gray-100 rounded-full"
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
                        <AlertDialogAction onClick={() => onDelete(ta.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TATable;