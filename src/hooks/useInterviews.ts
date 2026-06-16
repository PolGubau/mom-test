import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Entrevista } from '../types';

const STORAGE_KEY = 'mom-test-entrevistas';
const META_GOAL = 10;

function loadFromStorage(): Entrevista[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(data: Entrevista[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useInterviews() {
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>(() => loadFromStorage());

  // Sync to localStorage on every change
  useEffect(() => {
    saveToStorage(entrevistas);
  }, [entrevistas]);

  const addEntrevista = useCallback((data: Omit<Entrevista, 'id' | 'creadoEn'>) => {
    const nueva: Entrevista = {
      ...data,
      id: uuidv4(),
      creadoEn: new Date().toISOString(),
    };
    setEntrevistas(prev => [nueva, ...prev]);
    return nueva.id;
  }, []);

  const updateEntrevista = useCallback((id: string, data: Partial<Entrevista>) => {
    setEntrevistas(prev =>
      prev.map(e => (e.id === id ? { ...e, ...data } : e))
    );
  }, []);

  const deleteEntrevista = useCallback((id: string) => {
    setEntrevistas(prev => prev.filter(e => e.id !== id));
  }, []);

  const toggleCompletada = useCallback((id: string) => {
    setEntrevistas(prev =>
      prev.map(e => (e.id === id ? { ...e, completada: !e.completada } : e))
    );
  }, []);

  const completadas = entrevistas.filter(e => e.completada).length;
  const progreso = Math.min((completadas / META_GOAL) * 100, 100);

  return {
    entrevistas,
    completadas,
    total: entrevistas.length,
    meta: META_GOAL,
    progreso,
    addEntrevista,
    updateEntrevista,
    deleteEntrevista,
    toggleCompletada,
  };
}
