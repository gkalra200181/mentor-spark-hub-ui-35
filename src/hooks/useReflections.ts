
import { useState, useEffect } from 'react';
import { ReflectionData } from '@/types/reflection';

const STORAGE_KEY = 'ta_reflections';

export function useReflections() {
  const [reflections, setReflections] = useState<ReflectionData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setReflections(JSON.parse(stored));
    }
  }, []);

  const saveReflections = (newReflections: ReflectionData[]) => {
    setReflections(newReflections);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newReflections));
  };

  const addReflection = (reflection: Omit<ReflectionData, 'id' | 'createdAt'>) => {
    const newReflection: ReflectionData = {
      ...reflection,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    
    const updated = [newReflection, ...reflections];
    saveReflections(updated);
    return newReflection;
  };

  const updateReflection = (id: string, updates: Partial<ReflectionData>) => {
    const updated = reflections.map(r => 
      r.id === id ? { ...r, ...updates } : r
    );
    saveReflections(updated);
  };

  const deleteReflection = (id: string) => {
    const updated = reflections.filter(r => r.id !== id);
    saveReflections(updated);
  };

  const getStreak = () => {
    if (reflections.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const sortedReflections = [...reflections].sort((a, b) => b.createdAt - a.createdAt);
    
    for (let i = 0; i < sortedReflections.length; i++) {
      const reflectionDate = new Date(sortedReflections[i].date);
      const daysDiff = Math.floor((today.getTime() - reflectionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return {
    reflections,
    addReflection,
    updateReflection,
    deleteReflection,
    getStreak
  };
}
