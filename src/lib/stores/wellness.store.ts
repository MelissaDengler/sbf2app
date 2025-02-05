import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Activity, WellnessGoal, Achievement } from '@/types'

interface WellnessState {
  activities: Activity[]
  goals: WellnessGoal[]
  achievements: Achievement[]
  streaks: Record<string, number>
  stats: {
    daily: {
      steps: number
      calories: number
      water: number
      sleep: number
      meditation: number
    }
    weekly: {
      workouts: number
      avgSleep: number
      meditation: number
    }
  }
  addActivity: (activity: Activity) => void
  updateGoal: (goal: WellnessGoal) => void
  updateStreak: (type: string) => void
  resetDaily: () => void
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set) => ({
      activities: [],
      goals: [],
      achievements: [],
      streaks: {},
      stats: {
        daily: {
          steps: 0,
          calories: 0,
          water: 0,
          sleep: 0,
          meditation: 0,
        },
        weekly: {
          workouts: 0,
          avgSleep: 0,
          meditation: 0,
        },
      },
      addActivity: (activity) =>
        set((state) => ({
          activities: [activity, ...state.activities],
        })),
      updateGoal: (goal) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
        })),
      updateStreak: (type) =>
        set((state) => ({
          streaks: {
            ...state.streaks,
            [type]: (state.streaks[type] || 0) + 1,
          },
        })),
      resetDaily: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            daily: {
              steps: 0,
              calories: 0,
              water: 0,
              sleep: 0,
              meditation: 0,
            },
          },
        })),
    }),
    {
      name: 'wellness-storage',
    }
  )
) 