
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { ReflectionData } from '@/types/reflection';

interface ReflectionEntryProps {
  reflection: ReflectionData;
  onEdit: (reflection: ReflectionData) => void;
  onDelete: (id: string) => void;
}

export default function ReflectionEntry({ reflection, onEdit, onDelete }: ReflectionEntryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPreview = () => {
    if (reflection.wentWell) {
      return reflection.wentWell.substring(0, 50) + (reflection.wentWell.length > 50 ? '...' : '');
    }
    return 'No content';
  };

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{reflection.mood || '😊'}</span>
                <div>
                  <CardTitle className="text-lg">{formatDate(reflection.date)}</CardTitle>
                  <p className="text-sm text-gray-600">{getPreview()}</p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {reflection.wentWell && (
                <div>
                  <h4 className="font-medium text-green-700 mb-2">What went well today?</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{reflection.wentWell}</p>
                </div>
              )}
              
              {reflection.challenges && (
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">What challenges did I face?</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{reflection.challenges}</p>
                </div>
              )}
              
              {reflection.moodNote && (
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">How I'm feeling</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{reflection.moodNote}</p>
                </div>
              )}
              
              {reflection.insights && (
                <div>
                  <h4 className="font-medium text-purple-700 mb-2">New ideas or insights</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{reflection.insights}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(reflection)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  🗒️ Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(reflection.id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  🗑️ Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
