import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PenLine, Save } from 'lucide-react';
import { toast } from "sonner";
export default function ReflectionLog() {
  const [reflection, setReflection] = useState('');
  const [shareTip, setShareTip] = useState(false);
  const handleSaveReflection = () => {
    if (!reflection.trim()) {
      toast.error("Please enter a reflection before saving");
      return;
    }
    toast.success(shareTip ? "Reflection saved and shared to TA Tips Wall" : "Reflection saved successfully");
    setReflection('');
    setShareTip(false);
  };
  return <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <PenLine className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg text-left">Quick Reflection Entry Log</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Your private notes & reflections
          </label>
          <Textarea placeholder="What's working well in your group? What challenges are you facing? Note any insights or ideas here..." value={reflection} onChange={e => setReflection(e.target.value)} className="min-h-32" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="share-tip" checked={shareTip} onCheckedChange={checked => setShareTip(checked === true)} />
          <Label htmlFor="share-tip" className="text-sm font-normal">
            Share as teaching tip to TA Tips Wall
          </Label>
        </div>
        
        <Button onClick={handleSaveReflection} className="bg-primary hover:bg-primary/90 w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Reflection
        </Button>
      </div>
    </div>;
}