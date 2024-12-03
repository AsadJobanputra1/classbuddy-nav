import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TACard from "@/components/TACard";
import GPTCard from "@/components/GPTCard";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "student",
    last_use: "",
  });
  const [virtualTAs, setVirtualTAs] = useState([]);
  const [gpts, setGPTs] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUserContent();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive",
      });
      return;
    }

    setProfile(data);
  };

  const fetchUserContent = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [tasResponse, gptsResponse] = await Promise.all([
      supabase
        .from("virtual_tas")
        .select("*")
        .eq("last_modified_by", user.id),
      supabase
        .from("gpts")
        .select("*")
        .eq("last_modified_by", user.id),
    ]);

    if (tasResponse.data) setVirtualTAs(tasResponse.data);
    if (gptsResponse.data) setGPTs(gptsResponse.data);
  };

  const handleUpdate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopNav />
      <div className="ml-64 pt-16 p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>
          
          <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <Label>First Name</Label>
              <Input
                value={profile.first_name || ""}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, first_name: e.target.value }))
                }
              />
            </div>
            
            <div>
              <Label>Last Name</Label>
              <Input
                value={profile.last_name || ""}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, last_name: e.target.value }))
                }
              />
            </div>
            
            <div>
              <Label>Email</Label>
              <Input
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            
            <div>
              <Label>Role</Label>
              <Select
                value={profile.role}
                onValueChange={(value) =>
                  setProfile((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="power_user">Power User</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Last Use</Label>
              <Input
                value={profile.last_use ? new Date(profile.last_use).toLocaleDateString() : ''}
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <Button onClick={handleUpdate} className="w-full">Update Profile</Button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Your Virtual TAs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {virtualTAs.map((ta) => (
                <TACard key={ta.id} {...ta} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Your GPTs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gpts.map((gpt) => (
                <GPTCard key={gpt.id} {...gpt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;