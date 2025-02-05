import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Book, Calendar, Smile, Frown, Meh } from "lucide-react"
import { AddJournalDialog } from "@/components/journal/AddJournalDialog"
import { useState } from "react"
import { motion } from "framer-motion"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { BookOpen } from "lucide-react"

type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'terrible'

type JournalEntry = {
  id: string
  date: Date
  mood: MoodType
  gratitude: string[]
  notes: string
  activities: string[]
}

const moodIcons = {
  great: <Smile className="h-5 w-5 text-green-500" />,
  good: <Smile className="h-5 w-5 text-emerald-400" />,
  okay: <Meh className="h-5 w-5 text-yellow-400" />,
  bad: <Frown className="h-5 w-5 text-orange-400" />,
  terrible: <Frown className="h-5 w-5 text-red-400" />
}

export function Journal() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>("journal-entries", [])

  const addEntry = (entry: JournalEntry) => {
    setEntries([entry, ...entries])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Wellness Journal</h1>
            <p className="mt-1 text-gray-500">Record your thoughts and feelings</p>
          </motion.div>
          <AddJournalDialog onAddEntry={addEntry} />
        </div>

        <div className="grid gap-6">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {entry.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    {moodIcons[entry.mood]}
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="font-medium text-sm mb-2">Grateful for:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {entry.gratitude.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm mb-2">Notes:</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.notes}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {entry.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {entries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No entries yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start writing your wellness journey today
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
} 