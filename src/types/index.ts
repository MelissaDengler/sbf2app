import { ExerciseSession } from './exercise'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

export interface WellnessGoal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  category: 'exercise' | 'sleep' | 'nutrition' | 'mindfulness' | 'water'
  deadline?: Date
  completed: boolean
}

export type ActivityType = "exercise" | "sleep" | "water" | "meditation" | "meal"

export interface Activity {
  id: string
  type: ActivityType
  timestamp: Date
  duration?: number
  value: number
  notes?: string
  metrics?: ExerciseMetrics
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: 'trophy' | 'medal' | 'star' | 'award'
  category: 'exercise' | 'sleep' | 'nutrition' | 'mindfulness' | 'general'
  progress: number
  requirement: number
  completed: boolean
  unlockedAt?: Date
}

export interface ExerciseMetrics {
  exerciseType: string
  duration: number
  calories: number
  [key: string]: any
}

// Type guard for ExerciseSession
export function isExerciseSession(activity: Activity): activity is ExerciseSession {
  return activity.type === 'exercise'
} 