import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

// Use same test credentials as login
const TEST_EMAIL = "test@example.com"
const TEST_PASSWORD = "password123"

export function RegisterForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error: any) {
      // If user already exists, that's fine - just show a different message
      if (error.code === 'auth/email-already-in-use') {
        toast.success('Test account already exists! Please login.')
        navigate('/login')
      } else {
        toast.error(error.message || 'Failed to create account')
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTestAccount = () => {
    onSubmit({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          error={!!errors.email}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          error={!!errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">Create Test Account:</p>
        <code className="text-sm bg-gray-100 p-2 rounded block mt-2">
          Email: {TEST_EMAIL}<br />
          Password: {TEST_PASSWORD}
        </code>
        <Button
          type="button"
          variant="outline"
          className="mt-2 text-sm"
          onClick={handleCreateTestAccount}
        >
          Create Test Account
        </Button>
      </div>
    </form>
  )
}