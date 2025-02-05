import { useAuthStore } from "@/lib/stores/auth.store"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Settings, 
  Dumbbell, 
  Moon, 
  Utensils, 
  Trophy,
  BookOpen,
  Droplets,
  Menu,
  MoreHorizontal
} from "lucide-react"
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover"
import { UserMenu } from "@/components/user/UserMenu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Group navigation items by category
const navigationItems = {
  main: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
  ],
  tracking: [
    { name: 'Exercise', href: '/exercise', icon: Dumbbell },
    { name: 'Sleep', href: '/sleep', icon: Moon },
    { name: 'Nutrition', href: '/meals', icon: Utensils },
    { name: 'Water', href: '/water', icon: Droplets },
  ],
  other: [
    { name: 'Journal', href: '/journal', icon: BookOpen },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]
}

export function Navigation() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Main Nav Items */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-pink-dark">Wellness Platform</h1>
            
            {/* Desktop Navigation - Only show main items */}
            <div className="hidden md:flex ml-10 space-x-4">
              {navigationItems.main.map((item) => (
                <NavLink key={item.name} item={item} isActive={isActive(item.href)} />
              ))}
              
              {/* Tracking Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    Tracking
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {navigationItems.tracking.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link 
                        to={item.href}
                        className="flex items-center gap-2 px-2 py-1.5"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    More
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navigationItems.other.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link 
                        to={item.href}
                        className="flex items-center gap-2 px-2 py-1.5"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <NotificationsPopover />
            <UserMenu />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="py-2">
                  <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? 'text-pink-dark bg-pink-50'
                          : 'text-gray-600 hover:text-pink-dark hover:bg-pink-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Helper component for nav links
function NavLink({ item, isActive }: { item: { name: string; href: string; icon: any }; isActive: boolean }) {
  return (
    <Link
      to={item.href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'text-pink-dark bg-pink-50'
          : 'text-gray-600 hover:text-pink-dark hover:bg-pink-50'
      }`}
    >
      <item.icon className="h-4 w-4 mr-2" />
      {item.name}
    </Link>
  )
} 