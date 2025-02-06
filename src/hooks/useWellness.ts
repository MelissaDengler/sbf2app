import { mockActivities, mockStats } from "@/lib/mockData"
import { Activity } from '@/types'

interface WellnessStats {
  daily: {
    calories: number
    water: number
    sleep: number
    steps: number
    exercise: number
  }
  weekly: {
    calories: number
    water: number
    sleep: number
    steps: number
    exercise: number
  }
  monthly: {
    calories: number
    water: number
    sleep: number
    steps: number
    exercise: number
  }
}

interface WellnessHook {
  activities: Activity[]
  stats: WellnessStats
  addActivity: (activity: Activity) => void
}

export function useWellness(): WellnessHook {
  return {
    activities: mockActivities,
    stats: mockStats,
    addActivity: (activity: Activity) => {
      console.log('Adding activity:', activity)
    }
  }
} 