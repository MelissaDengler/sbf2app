import { ExerciseSession, WorkoutTemplate } from './exercise'

export interface ExerciseCardProps {
  exercise: ExerciseSession
  onEdit?: (exercise: ExerciseSession) => void
  onDelete?: (id: string) => void
}

export interface WorkoutBuilderProps {
  template?: WorkoutTemplate
  onSave: (workout: WorkoutTemplate) => void
  onCancel: () => void
}

export interface ProgressChartProps {
  data: ExerciseSession[]
  metric: 'calories' | 'duration' | 'distance'
  timeframe: 'week' | 'month' | 'year'
}

export interface StatCardProps {
  title: string
  value: number | string
  description?: string
  trend?: number
  icon?: React.ComponentType
  progress?: number
} 