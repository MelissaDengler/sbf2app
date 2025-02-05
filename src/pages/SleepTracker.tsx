import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Moon, Sun, Clock, Bed } from "lucide-react"
import { AddSleepDialog } from "@/components/sleep/AddSleepDialog"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

type SleepRecord = {
  id: string
  date: Date
  bedTime: string
  wakeTime: string
  duration: number
  quality: 1 | 2 | 3 | 4 | 5
  notes?: string
  mood?: 'refreshed' | 'tired' | 'groggy' | 'energetic'
}

export function SleepTracker() {
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([
    {
      id: '1',
      date: new Date(),
      bedTime: '22:30',
      wakeTime: '06:30',
      duration: 8,
      quality: 4,
      mood: 'refreshed',
      notes: 'Slept well, minimal disruptions'
    }
  ])

  // Calculate weekly average
  const thisWeek = sleepRecords.filter(record => {
    const now = new Date()
    const recordDate = new Date(record.date)
    return recordDate >= new Date(now.setDate(now.getDate() - 7))
  })

  const weeklyStats = {
    averageDuration: thisWeek.reduce((acc, curr) => acc + curr.duration, 0) / thisWeek.length || 0,
    averageQuality: thisWeek.reduce((acc, curr) => acc + curr.quality, 0) / thisWeek.length || 0,
    totalRecords: thisWeek.length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sleep Tracker</h1>
            <p className="mt-1 text-gray-500">Monitor your sleep patterns and quality</p>
          </div>
          <AddSleepDialog onAddSleep={(record) => setSleepRecords([record, ...sleepRecords])} />
        </div>

        {/* Weekly Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Sleep Duration</CardTitle>
              <Clock className="h-4 w-4 text-pink-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.averageDuration.toFixed(1)}h</div>
              <Progress 
                value={(weeklyStats.averageDuration / 9) * 100} 
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
              <Moon className="h-4 w-4 text-pink-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.averageQuality.toFixed(1)}/5</div>
              <Progress 
                value={(weeklyStats.averageQuality / 5) * 100} 
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tracked Nights</CardTitle>
              <Bed className="h-4 w-4 text-pink-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.totalRecords}</div>
              <Progress 
                value={(weeklyStats.totalRecords / 7) * 100} 
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sleep Records */}
        <div className="space-y-6">
          {sleepRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-pink-dark" />
                  <CardTitle className="text-sm font-medium">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardTitle>
                </div>
                {record.mood && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 capitalize">
                    {record.mood}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bed Time</p>
                    <p className="font-medium">{record.bedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wake Time</p>
                    <p className="font-medium">{record.wakeTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{record.duration}h</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quality</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Moon
                          key={i}
                          className={`h-4 w-4 ${
                            i < record.quality ? 'text-pink-dark' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {record.notes && (
                  <p className="mt-4 text-sm text-gray-600">{record.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
} 