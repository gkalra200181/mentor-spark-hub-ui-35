
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const emotions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thoughtful' },
  { emoji: '😌', label: 'Peaceful' },
  { emoji: '🎉', label: 'Excited' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '💪', label: 'Motivated' },
  { emoji: '🤗', label: 'Grateful' }
];

interface EmojiPickerProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ selectedEmoji, onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 text-2xl"
      >
        {selectedEmoji || '😊'}
      </Button>
      
      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 p-4 bg-white shadow-lg z-10 min-w-[200px]">
          <div className="grid grid-cols-5 gap-2">
            {emotions.map((emotion) => (
              <Button
                key={emotion.emoji}
                type="button"
                variant="ghost"
                className="h-10 w-10 text-xl hover:bg-primary/10"
                onClick={() => {
                  onEmojiSelect(emotion.emoji);
                  setIsOpen(false);
                }}
              >
                {emotion.emoji}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
