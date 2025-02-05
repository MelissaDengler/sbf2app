import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Globe, Shield } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast from "react-hot-toast"

export function Settings() {
  const user = useAuthStore((state) => state.user)

  const handleSettingChange = (section: string, setting: string, value: boolean | string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Updating setting...',
        success: `${setting} has been updated!`,
        error: 'Could not update setting.',
      }
    )
  }

  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      options: [
        { label: "Email Notifications", enabled: user?.preferences.emailNotifications.appointments },
        { label: "Push Notifications", enabled: user?.preferences.notifications },
        { label: "Appointment Reminders", enabled: true },
      ],
    },
    {
      title: "Appearance",
      icon: Moon,
      options: [
        { label: "Dark Mode", enabled: user?.preferences.darkMode },
        { label: "High Contrast", enabled: false },
      ],
    },
    {
      title: "Language & Region",
      icon: Globe,
      options: [
        { label: "Language", value: user?.preferences.language },
        { label: "Measurement Unit", value: user?.preferences.measurementUnit },
      ],
    },
    {
      title: "Privacy",
      icon: Shield,
      options: [
        { label: "Profile Visibility", enabled: true },
        { label: "Data Sharing", enabled: false },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-500">Manage your account preferences</p>
        </div>

        <div className="grid gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-pink-dark" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.options.map((option) => (
                      <div
                        key={option.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {option.label}
                        </span>
                        {'enabled' in option ? (
                          <Switch
                            checked={option.enabled}
                            onCheckedChange={(checked) => 
                              handleSettingChange(section.title, option.label, checked)
                            }
                          />
                        ) : (
                          <Select
                            value={option.value}
                            onValueChange={(value) =>
                              handleSettingChange(section.title, option.label, value)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={option.value} />
                            </SelectTrigger>
                            <SelectContent>
                              {option.label === "Language" ? (
                                <>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Spanish</SelectItem>
                                  <SelectItem value="fr">French</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="metric">Metric</SelectItem>
                                  <SelectItem value="imperial">Imperial</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
} 