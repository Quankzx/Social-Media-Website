import { describe, it, expect } from 'vitest'

describe('Posts', () => {
  it('fetches posts list', async () => {
    const res = await fetch('https://api.example.com/posts?page=1&pageSize=5')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveProperty('items')
    expect(Array.isArray(data.items)).toBe(true)
  })
})
