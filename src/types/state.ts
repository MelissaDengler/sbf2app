import { Activity, User, WellnessGoal } from './index'
import { ExerciseSession, WorkoutTemplate } from './exercise'

export interface WellnessState {
  user: User | null
  activities: Activity[]
  goals: WellnessGoal[]
  workoutTemplates: WorkoutTemplate[]
  exerciseHistory: ExerciseSession[]
  stats: {
    daily: Record<string, number>
    weekly: Record<string, number>
    monthly: Record<string, number>
  }
}

export type WellnessAction =
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'UPDATE_GOAL'; payload: WellnessGoal }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_WORKOUT_TEMPLATE'; payload: WorkoutTemplate }
  | { type: 'UPDATE_STATS'; payload: Partial<WellnessState['stats']> } 