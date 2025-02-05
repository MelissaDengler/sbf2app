import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@/types"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

interface ExerciseCalendarProps {
  activities: Activity[]
}

export function ExerciseCalendar({ activities }: ExerciseCalendarProps) {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const getActivityForDay = (day: number) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.timestamp)
      return activityDate.getDate() === day &&
             activityDate.getMonth() === today.getMonth() &&
             activityDate.getFullYear() === today.getFullYear()
    })
  }

  const getIntensityClass = (activities: Activity[]) => {
    if (!activities.length) return "bg-gray-100"
    const totalCalories = activities.reduce((sum, a) => sum + (a.metrics?.calories || 0), 0)
    if (totalCalories > 500) return "bg-pink-500"
    if (totalCalories > 300) return "bg-pink-400"
    if (totalCalories > 100) return "bg-pink-300"
    return "bg-pink-200"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Activity Calendar</CardTitle>
          <Calendar className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayActivities = getActivityForDay(day)
            const isToday = day === today.getDate()

            return (
              <motion.div
                key={day}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="relative aspect-square"
              >
                <div
                  className={`
                    absolute inset-1 rounded-md flex items-center justify-center
                    ${getIntensityClass(dayActivities)}
                    ${isToday ? 'ring-2 ring-pink-500' : ''}
                  `}
                >
                  <span className={`text-xs ${dayActivities.length ? 'text-white' : 'text-gray-700'}`}>
                    {day}
                  </span>
                  {dayActivities.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-200" />
            <span className="text-gray-500">Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-300" />
            <span className="text-gray-500">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-400" />
            <span className="text-gray-500">Intense</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-500" />
            <span className="text-gray-500">Very Intense</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 