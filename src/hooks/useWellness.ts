import { useWellnessStore } from '@/lib/stores/wellness.store'
import { Activity, WellnessGoal } from '@/types'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useWellness() {
  const { activities, goals, stats, addActivity, updateGoal, updateStreak } = useWellnessStore()

  // Check goals when activities are added
  useEffect(() => {
    goals.forEach((goal) => {
      const relevantActivities = activities.filter(
        (a) => a.type === goal.category && 
        new Date(a.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      )
      
      const currentValue = relevantActivities.reduce((sum, activity) => sum + activity.value, 0)
      
      if (currentValue >= goal.target && !goal.completed) {
        updateGoal({ ...goal, completed: true })
        toast.success(`Goal achieved: ${goal.title}!`)
      }
    })
  }, [activities])

  // Calculate streaks
  const checkStreak = (type: string) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const hasActivityToday = activities.some(
      (a) => a.type === type && isSameDay(new Date(a.timestamp), today)
    )
    const hadActivityYesterday = activities.some(
      (a) => a.type === type && isSameDay(new Date(a.timestamp), yesterday)
    )

    if (hasActivityToday) {
      if (hadActivityYesterday) {
        updateStreak(type)
      }
    }
  }

  return {
    activities,
    goals,
    stats,
    addActivity,
    updateGoal,
    checkStreak,
  }
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
} 