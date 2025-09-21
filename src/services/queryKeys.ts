export const queryKeys = {
  posts: (page = 1, pageSize = 20) => ['posts', { page, pageSize }] as const,
  post: (id: string) => ['post', id] as const,
  channels: () => ['channels'] as const,
  analytics: (range = '30d') => ['analytics', range] as const,
}

export default queryKeys
