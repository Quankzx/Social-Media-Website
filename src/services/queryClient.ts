// Lazy factory for TanStack Query's QueryClient.
// We avoid importing 'react-query' directly here so the repo doesn't break until deps are added.

import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () => {
  return new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60, retry: 1 } } })
}

export default createQueryClient
