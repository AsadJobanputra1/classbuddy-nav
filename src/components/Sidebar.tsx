import { Link } from "react-router-dom";
import { LayoutDashboard, Users, Bot, MessageSquare, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Bot, label: "Virtual TAs", path: "/" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <h1 className="text-2xl font-bold text-primary">ClassBuddy</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;