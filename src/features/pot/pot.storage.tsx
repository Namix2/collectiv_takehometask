import type { Pot } from './pot.types';

const POT_STORAGE_KEY = 'collctiv_group_pots';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getStoredPots(): Pot[] {
  if (!canUseStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(POT_STORAGE_KEY);

    if (!rawValue) return [];

    return JSON.parse(rawValue) as Pot[];
  } catch {
    return [];
  }
}

export function savePot(pot: Pot): void {
  if (!canUseStorage()) return;

  const existingPots = getStoredPots();
  const updatedPots = [...existingPots, pot];

  window.localStorage.setItem(POT_STORAGE_KEY, JSON.stringify(updatedPots));
}

export function getPotById(potId: string): Pot | null {
  const pots = getStoredPots();

  return pots.find((pot) => pot.id === potId) ?? null;
}