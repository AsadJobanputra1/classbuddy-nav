import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const models = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Advanced model by OpenAI known for high-quality language understanding and generation, suitable for a wide range of applications.",
    defaultEnabled: true
  },
  {
    id: "claude",
    name: "Claude",
    description: "Developed by Anthropic, focuses on ethical AI and safety while providing conversational AI capabilities."
  },
  {
    id: "palm-2",
    name: "PaLM 2",
    description: "Google's large language model with multilingual, reasoning, and code understanding capabilities."
  },
  {
    id: "llama",
    name: "LLaMA",
    description: "Meta's foundational model designed for research and efficiency in AI-driven tasks."
  },
  {
    id: "falcon",
    name: "Falcon",
    description: "Open-sourced by TII, known for its balanced efficiency and performance for AI research."
  },
  {
    id: "bloom",
    name: "BLOOM",
    description: "Open-access multilingual LLM developed collaboratively by BigScience for diverse research needs."
  },
  {
    id: "cohere",
    name: "Cohere Command",
    description: "Focused on enterprise needs, designed for high-performance language tasks in commercial applications."
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Lightweight, efficient model focused on performance optimization for AI research and deployment."
  },
  {
    id: "opt",
    name: "OPT",
    description: "Meta's open-source model, emphasizing transparency and accessibility for researchers."
  },
  {
    id: "chatglm",
    name: "ChatGLM",
    description: "Bilingual Chinese-English conversational model by Tsinghua University for diverse applications."
  },
  {
    id: "grok",
    name: "Grok",
    description: "AI model by xAI, focused on understanding natural language and reasoning tasks effectively."
  }
];

const Settings = () => {
  const [enabledModels, setEnabledModels] = useState<Record<string, boolean>>({
    "gpt-4": true
  });

  const handleModelToggle = (modelId: string) => {
    setEnabledModels(prev => ({
      ...prev,
      [modelId]: !prev[modelId]
    }));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <div className="p-6 mt-16 space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">AI Models</h2>
              {models.map(model => (
                <Card key={model.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{model.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{model.description}</p>
                    </div>
                    <Switch
                      checked={enabledModels[model.id] || false}
                      onCheckedChange={() => handleModelToggle(model.id)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;