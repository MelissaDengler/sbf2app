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

export interface Activity {
  id: string
  type: 'exercise' | 'sleep' | 'meal' | 'water' | 'meditation'
  timestamp: Date
  duration?: number
  value: number
  notes?: string
  metrics?: Record<string, number>
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'exercise' | 'sleep' | 'nutrition' | 'mindfulness' | 'general'
  progress: number
  requirement: number
  completed: boolean
  unlockedAt?: Date
} 