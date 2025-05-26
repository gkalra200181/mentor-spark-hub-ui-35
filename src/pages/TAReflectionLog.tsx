
import { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { toast } from "sonner";
import EmojiPicker from '@/components/EmojiPicker';
import ReflectionEntry from '@/components/ReflectionEntry';
import { useReflections } from '@/hooks/useReflections';
import { ReflectionData } from '@/types/reflection';

const TAReflectionLog = () => {
  const { reflections, addReflection, updateReflection, deleteReflection, getStreak } = useReflections();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isPastEntriesOpen, setIsPastEntriesOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ReflectionData | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    wentWell: '',
    challenges: '',
    mood: '😊',
    moodNote: '',
    insights: ''
  });

  // Auto-save draft
  useEffect(() => {
    const draft = localStorage.getItem('reflection_draft');
    if (draft && !editingEntry) {
      setFormData({ ...formData, ...JSON.parse(draft) });
    }
  }, []);

  useEffect(() => {
    if (!editingEntry) {
      localStorage.setItem('reflection_draft', JSON.stringify(formData));
    }
  }, [formData, editingEntry]);

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      wentWell: '',
      challenges: '',
      mood: '😊',
      moodNote: '',
      insights: ''
    });
    setEditingEntry(null);
    localStorage.removeItem('reflection_draft');
  };

  const handleSave = () => {
    if (!formData.wentWell.trim() && !formData.challenges.trim() && !formData.insights.trim()) {
      toast.error("Please fill in at least one reflection field");
      return;
    }

    if (editingEntry) {
      updateReflection(editingEntry.id, formData);
      toast.success("Reflection updated successfully! ✨");
    } else {
      addReflection(formData);
      
      // Confetti effect
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉✨🌟💫';
      confetti.className = 'fixed top-1/2 left-1/2 text-4xl animate-confetti pointer-events-none z-50';
      document.body.appendChild(confetti);
      setTimeout(() => document.body.removeChild(confetti), 3000);
      
      toast.success("Reflection saved successfully! 📖");
    }

    resetForm();
    setIsFormOpen(false);
    setIsPastEntriesOpen(true);
  };

  const handleEdit = (reflection: ReflectionData) => {
    setEditingEntry(reflection);
    setFormData({
      date: reflection.date,
      wentWell: reflection.wentWell,
      challenges: reflection.challenges,
      mood: reflection.mood,
      moodNote: reflection.moodNote,
      insights: reflection.insights
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteReflection(id);
    toast.success("Reflection deleted");
  };

  const streak = getStreak();
  const firstName = "Teaching Assistant"; // This could be dynamically set

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 overflow-y-auto">
          {/* Sticky Header */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-semibold text-primary mb-2">
                Hi {firstName}, how are you feeling today? 🌤️
              </h1>
              <p className="text-gray-600 text-center">
                Take a moment to reflect and jot down your thoughts 💭 ✨
              </p>
              {streak > 1 && (
                <div className="mt-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  🔥 You've reflected {streak} days in a row!
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Daily Reflection Card */}
              <Card className="shadow-soft">
                <Collapsible open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary">
                          {editingEntry ? '✏️ Edit Reflection' : '📝 Today\'s Reflection'}
                        </CardTitle>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isFormOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="space-y-6">
                      {/* Date Field */}
                      <div>
                        <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      {/* What went well */}
                      <div>
                        <Label htmlFor="wentWell" className="text-sm font-medium text-gray-700">
                          What went well today? 🌟
                        </Label>
                        <Textarea
                          id="wentWell"
                          placeholder="Share your wins, big or small..."
                          value={formData.wentWell}
                          onChange={(e) => setFormData({ ...formData, wentWell: e.target.value })}
                          className="mt-1 min-h-24"
                        />
                      </div>

                      {/* Challenges */}
                      <div>
                        <Label htmlFor="challenges" className="text-sm font-medium text-gray-700">
                          What challenges did I face? 🤔
                        </Label>
                        <Textarea
                          id="challenges"
                          placeholder="What was difficult? What would you do differently?"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          className="mt-1 min-h-24"
                        />
                      </div>

                      {/* Mood */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 block mb-2">
                          What am I feeling? 💭
                        </Label>
                        <div className="flex gap-4 items-start">
                          <EmojiPicker
                            selectedEmoji={formData.mood}
                            onEmojiSelect={(emoji) => setFormData({ ...formData, mood: emoji })}
                          />
                          <div className="flex-1">
                            <Textarea
                              placeholder="Tell us more about how you're feeling..."
                              value={formData.moodNote}
                              onChange={(e) => setFormData({ ...formData, moodNote: e.target.value })}
                              className="min-h-20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Insights */}
                      <div>
                        <Label htmlFor="insights" className="text-sm font-medium text-gray-700">
                          Any new ideas or insights? 💡
                        </Label>
                        <Textarea
                          id="insights"
                          placeholder="What did you learn? Any new perspectives or ideas?"
                          value={formData.insights}
                          onChange={(e) => setFormData({ ...formData, insights: e.target.value })}
                          className="mt-1 min-h-24"
                        />
                      </div>

                      {/* Save Button */}
                      <div className="flex gap-3">
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 flex-1">
                          📖 {editingEntry ? 'Update' : 'Save'} My Reflection
                        </Button>
                        {editingEntry && (
                          <Button variant="outline" onClick={resetForm}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Past Entries */}
              {reflections.length > 0 && (
                <Card className="shadow-soft">
                  <Collapsible open={isPastEntriesOpen} onOpenChange={setIsPastEntriesOpen}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-primary">
                            📚 Past Reflections ({reflections.length})
                          </CardTitle>
                          <ChevronDown className={`h-5 w-5 transition-transform ${isPastEntriesOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          {reflections.map((reflection) => (
                            <ReflectionEntry
                              key={reflection.id}
                              reflection={reflection}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )}

              {reflections.length === 0 && !isFormOpen && (
                <Card className="shadow-soft">
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">📖</div>
                    <h3 className="text-xl font-semibold mb-2">Start Your Reflection Journey</h3>
                    <p className="text-gray-600 mb-4 text-center">
                      Your reflection history will appear here once you save your first entry.
                    </p>
                    <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90">
                      ✨ Write Your First Reflection
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TAReflectionLog;
