import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Droplet, 
  Check, 
  X, 
  Leaf, 
  Apple, 
  Beef, 
  Fish, 
  Coffee 
} from "lucide-react"

const bloodTypeData = {
  "A": {
    beneficial: [
      "Vegetables: Broccoli, Spinach, Kale",
      "Fruits: Berries, Figs, Lemons",
      "Grains: Rice, Oats, Buckwheat",
      "Legumes: Lentils, Black beans",
      "Seafood: Ocean fish (limited)",
      "Oils: Olive oil, Flaxseed oil",
    ],
    avoid: [
      "Red meat",
      "Dairy products",
      "Wheat",
      "Kidney beans",
      "Lima beans",
      "Corn",
      "Nightshade vegetables",
    ],
    description: "Type A individuals typically thrive on a plant-based diet. Their digestive systems are adapted to efficiently process vegetables, fruits, and grains.",
    lifestyle: "Gentle exercise like yoga and tai chi work best. Stress management is crucial."
  },
  "B": {
    beneficial: [
      "Meat: Lamb, Rabbit, Venison",
      "Dairy: Yogurt, Cheese",
      "Vegetables: Green vegetables",
      "Eggs",
      "Fish: Salmon, Sardines",
      "Grains: Rice, Oats",
    ],
    avoid: [
      "Chicken",
      "Corn",
      "Lentils",
      "Peanuts",
      "Sesame seeds",
      "Tomatoes",
      "Wheat",
    ],
    description: "Type B individuals have highly tolerant digestive systems and can enjoy a varied diet including both plants and animals.",
    lifestyle: "Moderate exercise with both physical and mental balance is ideal."
  },
  "AB": {
    beneficial: [
      "Seafood",
      "Tofu",
      "Dairy",
      "Green vegetables",
      "Pineapple",
      "Rice",
      "Oats",
    ],
    avoid: [
      "Red meat",
      "Kidney beans",
      "Lima beans",
      "Seeds",
      "Corn",
      "Buckwheat",
    ],
    description: "Type AB combines characteristics of both A and B types. They typically have very adaptable digestive systems.",
    lifestyle: "Calming exercises combined with moderate physical activity work best."
  },
  "O": {
    beneficial: [
      "Red meat",
      "Fish",
      "Vegetables (most)",
      "Fruits (most)",
      "Eggs",
      "Nuts (except peanuts)",
    ],
    avoid: [
      "Wheat",
      "Corn",
      "Dairy products",
      "Caffeine",
      "Alcohol",
      "Legumes",
    ],
    description: "Type O is the oldest blood type and tends to do well with high-protein diets, similar to the hunter-gatherer diet.",
    lifestyle: "High-intensity exercise and physical activity are beneficial."
  }
}

export function BloodTypeGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Blood Type Diet Guide</h1>
          <p className="mt-1 text-gray-500">
            Learn about the optimal diet for your blood type
          </p>
        </div>

        <Tabs defaultValue="A" className="space-y-6">
          <TabsList className="bg-white p-1 flex space-x-2">
            {Object.keys(bloodTypeData).map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="flex items-center gap-2 data-[state=active]:bg-pink-50 data-[state=active]:text-pink-dark"
              >
                <Droplet className="h-4 w-4" />
                Type {type}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(bloodTypeData).map(([type, data]) => (
            <TabsContent key={type} value={type} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-pink-dark" />
                    Blood Type {type} Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{data.description}</p>
                  <p className="mt-2 text-gray-600">{data.lifestyle}</p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      Beneficial Foods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-2">
                        {data.beneficial.map((food, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="flex-shrink-0">
                              {food.toLowerCase().includes('meat') ? (
                                <Beef className="h-4 w-4 text-gray-400" />
                              ) : food.toLowerCase().includes('fish') ? (
                                <Fish className="h-4 w-4 text-gray-400" />
                              ) : food.toLowerCase().includes('vegetables') ? (
                                <Leaf className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Apple className="h-4 w-4 text-gray-400" />
                              )}
                            </span>
                            <span className="text-gray-600">{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <X className="h-5 w-5" />
                      Foods to Avoid
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-2">
                        {data.avoid.map((food, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="flex-shrink-0">
                              {food.toLowerCase().includes('meat') ? (
                                <Beef className="h-4 w-4 text-gray-400" />
                              ) : food.toLowerCase().includes('coffee') ? (
                                <Coffee className="h-4 w-4 text-gray-400" />
                              ) : food.toLowerCase().includes('vegetables') ? (
                                <Leaf className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Apple className="h-4 w-4 text-gray-400" />
                              )}
                            </span>
                            <span className="text-gray-600">{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
} 