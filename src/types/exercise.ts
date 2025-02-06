export type ExerciseType = 'cardio' | 'strength' | 'hiit' | 'yoga' | 'swimming' | 'cycling' | 'running' | 'walking'

export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body'

export type Intensity = 'low' | 'moderate' | 'high'

export interface ExerciseSet {
  id: string
  reps?: number
  weight?: number
  duration?: number
  distance?: number
  intensity?: Intensity
}

export interface WorkoutTemplate {
  id: string
  name: string
  description: string
  type: ExerciseType
  targetMuscleGroups: MuscleGroup[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedDuration: number
  exercises: {
    name: string
    sets: number
    repsPerSet?: number
    weightRange?: {
      min: number
      max: number
    }
    restBetweenSets?: number
  }[]
}

export interface ExerciseSession extends Activity {
  type: 'exercise'
  metrics: ExerciseMetrics & {
    sets?: ExerciseSet[]
    heartRate?: {
      avg: number
      max: number
    }
    distance?: number
    pace?: number
  }
} 