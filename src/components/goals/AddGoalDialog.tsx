import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"

const categories = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'sleep', label: 'Sleep' },
]

export function AddGoalDialog({ onAddGoal }: { onAddGoal: (goal: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    target: '',
    unit: '',
    deadline: new Date(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.target || !formData.unit) {
      toast.error('Please fill in all fields')
      return
    }

    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      current: 0,
      createdAt: new Date(),
    }

    onAddGoal(newGoal)
    setOpen(false)
    toast.success('Goal added successfully!')
    setFormData({
      title: '',
      category: '',
      target: '',
      unit: '',
      deadline: new Date(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Goal Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Daily Steps"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target</label>
              <Input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                placeholder="e.g., 10000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Input
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., steps"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deadline</label>
            <Calendar
              mode="single"
              selected={formData.deadline}
              onSelect={(date) => date && setFormData({ ...formData, deadline: date })}
              className="rounded-md border"
            />
          </div>

          <Button type="submit" className="w-full bg-pink-dark hover:bg-pink-600">
            Create Goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 