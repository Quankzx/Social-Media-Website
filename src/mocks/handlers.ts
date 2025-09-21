const API = 'https://api.example.com'

const fakeToken = 'fake-access-token'

import fixtures from './fixtures'
// Export a factory that builds MSW handlers when provided `rest` and `ctx` from msw
export function createHandlers(rest: any, ctx: any) {
  return [
    rest.post(`${API}/auth/login`, async (req: any, res: any, ctx2: any) => {
      const body = await req.json()
      const { email, password } = body
      if (email === 'user@example.com' && password === 'password') {
        return res(
          ctx2.status(200),
          ctx2.json({ accessToken: fakeToken, refreshToken: 'fake-refresh-token', user: { id: 'u1', email } })
        )
      }
      return res(ctx2.status(401), ctx2.json({ message: 'Invalid credentials' }))
    }),

    rest.post(`${API}/auth/register`, async (req: any, res: any, ctx2: any) => {
      const body = await req.json()
      if (!body.email) return res(ctx2.status(400), ctx2.json({ message: 'Email required' }))
      return res(ctx2.status(201), ctx2.json({ id: 'u-new', email: body.email }))
    }),

    rest.post(`${API}/auth/refresh`, async (_req: any, res: any, ctx2: any) => {
      return res(ctx2.status(200), ctx2.json({ accessToken: fakeToken }))
    }),

    rest.get(`${API}/posts`, (req: any, res: any, ctx2: any) => {
      const page = Number(req.url.searchParams.get('page') || '1')
      const pageSize = Number(req.url.searchParams.get('pageSize') || '10')
      const total = 42
      const start = (page - 1) * pageSize
      const items = Array.from({ length: Math.min(pageSize, total - start) }).map((_, i) => ({
        id: `post-${start + i + 1}`,
        title: `Mock post ${start + i + 1}`,
        body: 'This is mocked content',
        status: 'draft',
      }))
      return res(ctx2.status(200), ctx2.json({ items, page, pageSize, total }))
    }),
    // Channels list
    rest.get(`${API}/channels`, (_req: any, res: any, ctx2: any) => {
      return res(ctx2.status(200), ctx2.json({ items: fixtures.channels }))
    }),

    // Create post
    rest.post(`${API}/posts`, async (req: any, res: any, ctx2: any) => {
      const body = await req.json()
      const id = `post-${Math.floor(Math.random() * 100000)}`
      return res(ctx2.status(201), ctx2.json({ ...body, id }))
    }),

    // Update post
    rest.put(`${API}/posts/:id`, async (req: any, res: any, ctx2: any) => {
      const body = await req.json()
      const { id } = req.params
      return res(ctx2.status(200), ctx2.json({ ...body, id }))
    }),
    // Accounts
    rest.get(`${API}/accounts`, (_req: any, res: any, ctx2: any) => {
      return res(ctx2.status(200), ctx2.json({ items: [{ id: 'a1', name: 'Demo Account' }] }))
    }),

    // Media upload (fake presigned)
    rest.post(`${API}/media/upload`, async (req: any, res: any, ctx2: any) => {
      // Return a fake media id and URL
      return res(ctx2.status(201), ctx2.json({ id: `m-${Date.now()}`, url: 'https://example.com/media/mock.jpg' }))
    }),

    // Analytics snapshot
    rest.get(`${API}/analytics/summary`, (_req: any, res: any, ctx2: any) => {
      return res(
        ctx2.status(200),
        ctx2.json({ impressions: 12345, clicks: 678, engagements: 234 })
      )
    }),
  ]
}

export default createHandlers
