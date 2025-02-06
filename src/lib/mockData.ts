import { Activity, WellnessStats } from "@/types"

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "exercise",
    timestamp: new Date("2024-02-20T10:00:00"),
    duration: 45,
    value: 300,
    notes: "Morning cardio session",
    metrics: {
      exerciseType: "cardio",
      duration: 45,
      calories: 300
    }
  },
  {
    id: "2",
    type: "exercise",
    timestamp: new Date("2024-02-19T16:00:00"),
    duration: 60,
    value: 400,
    notes: "Strength training",
    metrics: {
      exerciseType: "strength",
      duration: 60,
      calories: 400
    }
  },
  // Add more mock activities...
]

export const mockStats: WellnessStats = {
  daily: {
    calories: 2500,
    water: 2000,
    sleep: 7.5,
    steps: 8000,
    exercise: 45
  },
  weekly: {
    calories: 17500,
    water: 14000,
    sleep: 52.5,
    steps: 56000,
    exercise: 315
  },
  monthly: {
    calories: 75000,
    water: 60000,
    sleep: 225,
    steps: 240000,
    exercise: 1350
  }
} 