import React from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../services/auth'
import { useAppStore } from '../store'

type Props = {
  children: React.ReactElement
}

export default function ProtectedRoute({ children }: Props) {
  // Prefer application-level user state when available (persisted during development)
  const user = useAppStore((s) => s.user)
  // Fallback to token check if store has no user
  const token = authService.getAccessToken()

  // In development, allow access to make it easier to iterate with mocked backends.
  if (process.env.NODE_ENV === 'development') {
    return children
  }

  // In production: require either a known user in the store or a valid token
  if (!user && !token) {
    return <Navigate to="/login" replace />
  }
  return children
}
