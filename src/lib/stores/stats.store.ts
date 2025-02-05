import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StatsState {
  dailyStats: {
    steps: number
    calories: number
    water: number
    sleep: number
    meditation: number
    workouts: number
  }
  updateStat: (key: keyof StatsState['dailyStats'], value: number) => void
  resetDaily: () => void
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      dailyStats: {
        steps: 0,
        calories: 0,
        water: 0,
        sleep: 0,
        meditation: 0,
        workouts: 0,
      },
      updateStat: (key, value) =>
        set((state) => ({
          dailyStats: {
            ...state.dailyStats,
            [key]: value,
          },
        })),
      resetDaily: () =>
        set({
          dailyStats: {
            steps: 0,
            calories: 0,
            water: 0,
            sleep: 0,
            meditation: 0,
            workouts: 0,
          },
        }),
    }),
    {
      name: 'wellness-stats',
    }
  )
) 