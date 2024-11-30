import { Bell, User } from "lucide-react";

const TopNav = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">John Doe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;