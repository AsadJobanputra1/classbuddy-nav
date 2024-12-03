import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const TopNav = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();

      if (profile?.first_name && profile?.last_name) {
        setUserName(`${profile.first_name} ${profile.last_name}`);
      } else {
        setUserName(user.email || "User");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserName("User");
    }
  };

  const handleProfileClick = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={handleProfileClick}
          >
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700 hover:text-gray-900">{userName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;