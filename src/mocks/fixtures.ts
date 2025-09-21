export const user = { id: 'u1', email: 'user@example.com', name: 'Demo User' }

export const posts = Array.from({ length: 12 }).map((_, i) => ({
  id: `post-${i + 1}`,
  title: `Seed post ${i + 1}`,
  body: 'Seeded content',
  status: 'draft',
}))

export const channels = [
  { id: 'ch-1', name: 'Facebook Page', provider: 'facebook' },
  { id: 'ch-2', name: 'Twitter', provider: 'twitter' },
]

export default { user, posts, channels }
