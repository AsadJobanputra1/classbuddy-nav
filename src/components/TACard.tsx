import { Edit, Trash2 } from "lucide-react";

interface TACardProps {
  name: string;
  course: string;
  email: string;
  schedule: string;
}

const TACard = ({ name, course, email, schedule }: TACardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{course}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Schedule:</span> {schedule}
        </p>
      </div>
    </div>
  );
};

export default TACard;