import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Bot, MessageSquare, Settings, Database } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Bot, label: "Virtual TAs", path: "/" },
    { icon: Database, label: "GPTs", path: "/gpts" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link to="/">
          <img 
            src="/lovable-uploads/2ddd02c0-2f21-4773-8f86-9014d539018b.png" 
            alt="ClassBuddy" 
            className="h-8"
          />
        </Link>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
              location.pathname === item.path ? "bg-primary text-primary-foreground" : ""
            }`}
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