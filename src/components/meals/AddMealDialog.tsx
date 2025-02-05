import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Plus, X } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
]

export function AddMealDialog({ onAddMeal }: { onAddMeal: (meal: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    prepTime: '',
    date: new Date(),
  })
  const [ingredients, setIngredients] = useState<string[]>([''])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.type || ingredients[0].trim() === '') {
      toast.error('Please fill in all required fields')
      return
    }

    const newMeal = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      calories: parseInt(formData.calories) || 0,
      protein: parseInt(formData.protein) || 0,
      carbs: parseInt(formData.carbs) || 0,
      fat: parseInt(formData.fat) || 0,
      prepTime: parseInt(formData.prepTime) || 0,
    }

    onAddMeal(newMeal)
    setOpen(false)
    toast.success('Meal added successfully!')
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      prepTime: '',
      date: new Date(),
    })
    setIngredients([''])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Overnight Oats"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calories</label>
              <Input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                placeholder="e.g., 350"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Prep Time (mins)</label>
              <Input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                placeholder="e.g., 15"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Protein (g)</label>
              <Input
                type="number"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Carbs (g)</label>
              <Input
                type="number"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fat (g)</label>
              <Input
                type="number"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...ingredients]
                    newIngredients[index] = e.target.value
                    setIngredients(newIngredients)
                  }}
                  placeholder="e.g., Oats"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (ingredients.length === 1) return
                    setIngredients(ingredients.filter((_, i) => i !== index))
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIngredients([...ingredients, ''])}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
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
            Add Meal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 