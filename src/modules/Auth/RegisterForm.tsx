import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import authService from '../../services/auth'
import { useNavigate } from 'react-router-dom'

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) })
type FormData = z.infer<typeof schema>

export default function RegisterForm() {
  const nav = useNavigate()
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      await authService.register({ name: data.name, email: data.email, password: data.password })
      nav('/')
    } catch (err: any) {
      setError(err?.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">Register</h2>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <label className="block mb-2">
        <div className="text-sm">Full name</div>
        <input {...register('name')} className="input" type="text" />
        {formState.errors.name && <div className="text-xs text-red-600">{String(formState.errors.name.message)}</div>}
      </label>
      <label className="block mb-2">
        <div className="text-sm">Email</div>
        <input {...register('email')} className="input" type="email" />
        {formState.errors.email && <div className="text-xs text-red-600">{String(formState.errors.email.message)}</div>}
      </label>
      <label className="block mb-2">
        <div className="text-sm">Password</div>
        <input {...register('password')} className="input" type="password" />
        {formState.errors.password && <div className="text-xs text-red-600">{String(formState.errors.password.message)}</div>}
      </label>
      <div className="mt-3">
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      </div>
    </form>
  )
}
