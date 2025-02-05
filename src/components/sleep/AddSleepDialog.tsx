import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Moon } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"

const moods = [
  { value: 'refreshed', label: 'Refreshed' },
  { value: 'tired', label: 'Tired' },
  { value: 'groggy', label: 'Groggy' },
  { value: 'energetic', label: 'Energetic' },
]

export function AddSleepDialog({ onAddSleep }: { onAddSleep: (record: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    bedTime: '',
    wakeTime: '',
    quality: '',
    mood: '',
    notes: '',
    date: new Date(),
  })

  const calculateDuration = (bedTime: string, wakeTime: string) => {
    const [bedHour, bedMinute] = bedTime.split(':').map(Number)
    const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number)
    
    let duration = wakeHour - bedHour
    if (duration < 0) duration += 24
    
    const minuteDiff = wakeMinute - bedMinute
    duration += minuteDiff / 60

    return Number(duration.toFixed(1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.bedTime || !formData.wakeTime || !formData.quality) {
      toast.error('Please fill in all required fields')
      return
    }

    const duration = calculateDuration(formData.bedTime, formData.wakeTime)

    const newRecord = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      duration,
      quality: parseInt(formData.quality),
    }

    onAddSleep(newRecord)
    setOpen(false)
    toast.success('Sleep record added successfully!')
    
    // Reset form
    setFormData({
      bedTime: '',
      wakeTime: '',
      quality: '',
      mood: '',
      notes: '',
      date: new Date(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Sleep Record
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sleep Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bed Time</label>
              <Input
                type="time"
                value={formData.bedTime}
                onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wake Time</label>
              <Input
                type="time"
                value={formData.wakeTime}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sleep Quality</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  variant={formData.quality === String(rating) ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, quality: String(rating) })}
                  className="flex-1"
                >
                  <Moon className={`h-4 w-4 ${
                    formData.quality === String(rating) ? 'text-white' : 'text-gray-500'
                  }`} />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">How do you feel?</label>
            <Select
              value={formData.mood}
              onValueChange={(value) => setFormData({ ...formData, mood: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value}>
                    {mood.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any sleep disturbances or dreams?"
              className="h-20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => date && setFormData({ ...formData, date })}
              className="rounded-md border"
            />
          </div>

          <Button type="submit" className="w-full bg-pink-dark hover:bg-pink-600">
            Save Sleep Record
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 