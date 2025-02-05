import { useLocalStorage } from './useLocalStorage'
import { useState } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  requirement: number
  progress: number
  completed: boolean
  category: 'exercise' | 'sleep' | 'nutrition' | 'mindfulness' | 'general'
  icon: string
  unlockedAt?: Date
}

export function useAchievements() {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', [])
  const [notification, setNotification] = useState<{
    isVisible: boolean
    achievement?: Achievement
  }>({ isVisible: false })

  const updateProgress = (achievementId: string, newProgress: number) => {
    setAchievements(current => {
      return current.map(achievement => {
        if (achievement.id === achievementId) {
          const completed = newProgress >= achievement.requirement && !achievement.completed
          if (completed) {
            setNotification({
              isVisible: true,
              achievement: {
                ...achievement,
                completed: true,
                progress: newProgress,
                unlockedAt: new Date()
              }
            })
          }
          return {
            ...achievement,
            progress: newProgress,
            completed: completed ? true : achievement.completed,
            unlockedAt: completed ? new Date() : achievement.unlockedAt
          }
        }
        return achievement
      })
    })
  }

  const dismissNotification = () => {
    setNotification({ isVisible: false })
  }

  return {
    achievements,
    updateProgress,
    notification,
    dismissNotification
  }
} 