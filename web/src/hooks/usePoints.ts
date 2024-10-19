import { create } from 'zustand'

interface PointsState {
  points: number
  setPoints: (points: number) => void
  addPoints: (amount: number) => void
  subtractPoints: (amount: number) => void
}

export const usePoints = create<PointsState>((set) => ({
  points: 0,
  setPoints: (points: number) => set({ points }),
  addPoints: (amount: number) =>
    set((state) => ({ points: state.points + amount })),
  subtractPoints: (amount: number) =>
    set((state) => ({ points: Math.max(0, state.points - amount) })),
}))
