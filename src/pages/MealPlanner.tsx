import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Utensils, Clock, Calendar } from "lucide-react"
import { AddMealDialog } from "@/components/meals/AddMealDialog"
import { useState } from "react"

type Meal = {
  id: string
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  prepTime: number
  date: Date
}

export function MealPlanner() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Overnight Oats',
      type: 'breakfast',
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 12,
      ingredients: ['Oats', 'Almond milk', 'Chia seeds', 'Berries', 'Honey'],
      prepTime: 10,
      date: new Date()
    },
    // Add more sample meals
  ])

  const groupedMeals = meals.reduce((acc, meal) => {
    const date = meal.date.toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(meal)
    return acc
  }, {} as Record<string, Meal[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
            <p className="mt-1 text-gray-500">Plan and track your meals for better nutrition</p>
          </div>
          <AddMealDialog onAddMeal={(meal) => setMeals([...meals, meal])} />
        </div>

        <div className="space-y-8">
          {Object.entries(groupedMeals).map(([date, dayMeals]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dayMeals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {meal.name}
                      </CardTitle>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 capitalize">
                        {meal.type}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Calories</p>
                            <p className="font-medium">{meal.calories}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Protein</p>
                            <p className="font-medium">{meal.protein}g</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Carbs</p>
                            <p className="font-medium">{meal.carbs}g</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Ingredients:</h3>
                          <div className="flex flex-wrap gap-2">
                            {meal.ingredients.map((ingredient, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{meal.prepTime} mins prep time</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 