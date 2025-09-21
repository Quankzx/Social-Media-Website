import { describe, it, expect } from 'vitest'

describe('Auth', () => {
  it('login happy path', async () => {
    const res = await fetch('https://api.example.com/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'user@example.com', password: 'password' }) })
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveProperty('accessToken')
  })
})
