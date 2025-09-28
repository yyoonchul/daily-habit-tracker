import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine } from '../types';

interface RoutineContextType {
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, 'id' | 'completed' | 'streak' | 'monthlySuccessRate'>) => void;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  toggleRoutine: (id: string) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const savedRoutines = await AsyncStorage.getItem('routines');
      if (savedRoutines) {
        setRoutines(JSON.parse(savedRoutines));
      }
    } catch (error) {
      console.error('Error loading routines:', error);
    }
  };

  const saveRoutines = async (newRoutines: Routine[]) => {
    try {
      await AsyncStorage.setItem('routines', JSON.stringify(newRoutines));
      setRoutines(newRoutines);
    } catch (error) {
      console.error('Error saving routines:', error);
    }
  };

  const addRoutine = (routineData: Omit<Routine, 'id' | 'completed' | 'streak' | 'monthlySuccessRate'>) => {
    const newRoutine: Routine = {
      ...routineData,
      id: Date.now().toString(),
      completed: false,
      streak: 0,
      monthlySuccessRate: 0,
    };
    
    const updatedRoutines = [...routines, newRoutine];
    saveRoutines(updatedRoutines);
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    const updatedRoutines = routines.map(routine =>
      routine.id === id ? { ...routine, ...updates } : routine
    );
    saveRoutines(updatedRoutines);
  };

  const deleteRoutine = (id: string) => {
    const updatedRoutines = routines.filter(routine => routine.id !== id);
    saveRoutines(updatedRoutines);
  };

  const toggleRoutine = (id: string) => {
    const updatedRoutines = routines.map(routine => {
      if (routine.id === id) {
        const newCompleted = !routine.completed;
        const newStreak = newCompleted ? routine.streak + 1 : Math.max(0, routine.streak - 1);
        
        return {
          ...routine,
          completed: newCompleted,
          streak: newStreak,
        };
      }
      return routine;
    });
    saveRoutines(updatedRoutines);
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        toggleRoutine,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = (): RoutineContextType => {
  const context = useContext(RoutineContext);
  if (context === undefined) {
    throw new Error('useRoutines must be used within a RoutineProvider');
  }
  return context;
};
