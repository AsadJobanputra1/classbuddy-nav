import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("this-week");

  // Fetch Virtual TAs
  const { data: virtualTAs } = useQuery({
    queryKey: ['virtual-tas'],
    queryFn: async () => {
      const { data } = await supabase
        .from('virtual_tas')
        .select('name')
        .limit(6);
      return data || [];
    },
  });

  // Fetch GPTs
  const { data: gpts } = useQuery({
    queryKey: ['gpts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('gpts')
        .select('name')
        .limit(8);
      return data || [];
    },
  });

  // Generate mock data for charts
  const generateDailyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      value: Math.floor(Math.random() * (500 - 150 + 1)) + 150
    }));
  };

  const generateTAData = () => {
    return (virtualTAs || []).map(ta => ({
      name: ta.name,
      value: Math.floor(Math.random() * (500 - 150 + 1)) + 150
    }));
  };

  const generateGPTData = () => {
    return (gpts || []).map(gpt => ({
      name: gpt.name,
      value: Math.floor(Math.random() * (900 - 450 + 1)) + 450
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Global Chat Usage</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateDailyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Virtual TA Usage</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateTAData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">GPTs Usage</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateGPTData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;