import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"

const workoutTypes = [
  { value: 'strength', label: 'Strength Training' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' },
]

export function AddWorkoutDialog({ onAddWorkout }: { onAddWorkout: (workout: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    duration: '',
    caloriesBurned: '',
    sets: '',
    reps: '',
    weight: '',
    distance: '',
    notes: '',
    date: new Date(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.type || !formData.duration) {
      toast.error('Please fill in all required fields')
      return
    }

    const newWorkout = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      duration: parseInt(formData.duration),
      caloriesBurned: parseInt(formData.caloriesBurned) || 0,
      sets: formData.sets ? parseInt(formData.sets) : undefined,
      reps: formData.reps ? parseInt(formData.reps) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      distance: formData.distance ? parseFloat(formData.distance) : undefined,
    }

    onAddWorkout(newWorkout)
    setOpen(false)
    toast.success('Workout added successfully!')
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      duration: '',
      caloriesBurned: '',
      sets: '',
      reps: '',
      weight: '',
      distance: '',
      notes: '',
      date: new Date(),
    })
  }

  const showStrengthFields = formData.type === 'strength'
  const showCardioFields = formData.type === 'cardio'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Workout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log New Workout</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workout Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Morning Run"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (mins)</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Calories Burned</label>
              <Input
                type="number"
                value={formData.caloriesBurned}
                onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
              />
            </div>
          </div>

          {showStrengthFields && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sets</label>
                <Input
                  type="number"
                  value={formData.sets}
                  onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reps</label>
                <Input
                  type="number"
                  value={formData.reps}
                  onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
            </div>
          )}

          {showCardioFields && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance (km)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="How did it go?"
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
            Save Workout
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 