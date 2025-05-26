
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";

export default function ActionsAndNudges() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  const nudgeTemplates = [{
    id: 1,
    title: "Missed Assignment Reminder",
    text: "Hi! I noticed you haven't submitted the latest assignment. Is there anything I can help with?"
  }, {
    id: 2,
    title: "Low Participation",
    text: "Just checking in as I've noticed you haven't been active lately. Is everything okay?"
  }, {
    id: 3,
    title: "Celebration",
    text: "Great job on completing your project! Your work really stood out - I especially liked how you approached the theme this week."
  }, {
    id: 4,
    title: "Progress Check-in",
    text: "You're making great progress on your learning journey. I'd love to hear how you're finding the course so far."
  }, {
    id: 5,
    title: "Group Project Guidance",
    text: "I saw your group is working on an interesting project. Would you like to schedule a quick chat to discuss your approach?"
  }];

  const selectedTemplateData = nudgeTemplates.find(template => template.id.toString() === selectedTemplate);

  const handleCopyMessage = async () => {
    if (!selectedTemplateData) {
      toast.error("Please select a template first");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(selectedTemplateData.text);
      toast.success("Message copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy message");
    }
  };
  
  return (
    <div className="card">
      <h3 className="font-semibold text-lg text-left mb-4">Actions & Nudges</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Send a templated message to nudge learners 🙂
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template-select" className="flex-1">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {nudgeTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleCopyMessage} 
              disabled={!selectedTemplate} 
              className="bg-primary hover:bg-primary/90"
            >
              Copy Message
            </Button>
          </div>
        </div>
        
        {selectedTemplateData && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border">
            <h4 className="font-medium text-sm text-left mb-2">{selectedTemplateData.title}</h4>
            <p className="text-sm text-left text-gray-700">{selectedTemplateData.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
