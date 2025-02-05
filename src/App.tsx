import { Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { Dashboard } from '@/pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from '@/lib/stores/auth.store'
import { Settings } from "@/pages/Settings"
import { Profile } from "@/pages/Profile"
import { Appointments } from "@/pages/Appointments"
import { BloodTypeGuide } from "@/pages/BloodTypeGuide"
import { WellnessGoals } from "@/pages/WellnessGoals"
import { ExerciseTracker } from "@/pages/ExerciseTracker"
import { SleepTracker } from "@/pages/SleepTracker"
import { MealPlanner } from "@/pages/MealPlanner"
import { Achievements } from "@/pages/Achievements"
import { Journal } from "@/pages/Journal"
import { WaterTracker } from "@/pages/WaterTracker"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/blood-type-guide" element={<BloodTypeGuide />} />
          <Route path="/wellness-goals" element={
            <ProtectedRoute>
              <WellnessGoals />
            </ProtectedRoute>
          } />
          <Route path="/exercise" element={
            <ProtectedRoute>
              <ExerciseTracker />
            </ProtectedRoute>
          } />
          <Route path="/sleep" element={
            <ProtectedRoute>
              <SleepTracker />
            </ProtectedRoute>
          } />
          <Route path="/meals" element={
            <ProtectedRoute>
              <MealPlanner />
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } />
          <Route path="/journal" element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          } />
          <Route path="/water" element={
            <ProtectedRoute>
              <WaterTracker />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
      </div>
    </QueryClientProvider>
  )
}

export default App