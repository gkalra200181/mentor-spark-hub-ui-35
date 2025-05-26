import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Award } from 'lucide-react';
import { toast } from "sonner";
export default function ActionsAndNudges() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const nudgeTemplates = [{
    value: 'welcome',
    label: 'Welcome to the community'
  }, {
    value: 'inactive',
    label: 'We miss you! Check out the new activities'
  }, {
    value: 'progress',
    label: 'Great progress so far! Here\'s what\'s next'
  }, {
    value: 'project',
    label: 'Project submission deadline reminder'
  }, {
    value: 'achievement',
    label: 'Congrats on your latest achievement!'
  }];
  const handleSendNudge = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    toast.success("Nudge sent successfully!");
    setSelectedTemplate('');
  };
  const handleAction = (action: string) => {
    switch (action) {
      case 'message':
        toast.info("Messaging feature will be available soon!");
        break;
      case 'shoutout':
        toast.info("Creating public shout-out...");
        break;
      case 'email':
        toast.info("Email feature coming soon!");
        break;
      default:
        break;
    }
  };
  return <div className="card">
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
                {nudgeTemplates.map(template => <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleSendNudge} disabled={!selectedTemplate} className="bg-primary hover:bg-primary/90">Copy Message</Button>
          </div>
        </div>
        
        
        
        
      </div>
    </div>;
}