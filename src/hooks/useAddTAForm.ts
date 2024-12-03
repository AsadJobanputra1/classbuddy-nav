import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { virtualTAsApi } from "@/apis/virtualTAs";
import { supabase } from "@/integrations/supabase/client";

export const useAddTAForm = (editId: string | null) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    course: "",
    name: "",
    instructor_name: "",
    instructor_email: "",
    ta_email: "",
    welcome_message: "",
    prompt_questions: [""],
    default_prompt: "",
    ai_guardrails: "",
    teaching_style: "by_the_book",
    no_answer_response: "",
    canvas_enabled: false,
    canvas_api_key: "",
    canvas_course_url: "",
    panopto_enabled: false,
    panopto_api_key: "",
    panopto_course_url: "",
    captioning_enabled: false,
  });

  const fetchTAData = async () => {
    try {
      const data = await virtualTAsApi.getById(editId);
      if (data) {
        setFormData({
          ...data,
          prompt_questions: data.prompt_questions || [""],
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch TA data",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromptQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formData.prompt_questions];
    newQuestions[index] = value;
    setFormData((prev) => ({
      ...prev,
      prompt_questions: newQuestions,
    }));
  };

  const addPromptQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      prompt_questions: [...prev.prompt_questions, ""],
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const submissionData = {
        ...formData,
        last_modified_by: user?.id,
        last_modified: new Date().toISOString()
      };

      if (editId) {
        await virtualTAsApi.update(editId, submissionData);
      } else {
        await virtualTAsApi.create(submissionData);
      }
      
      toast({
        title: "Success",
        description: `Virtual TA has been ${editId ? 'updated' : 'created'} successfully`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editId ? 'update' : 'create'} Virtual TA`,
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handlePromptQuestionChange,
    addPromptQuestion,
    handleSubmit,
    fetchTAData,
  };
};