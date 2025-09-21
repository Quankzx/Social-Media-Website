import React, { useEffect, useState } from 'react'
import api from './api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Post, Paged } from '../types/models'
import { queryKeys } from './queryKeys'

export function usePosts(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: queryKeys.posts(page, pageSize),
    queryFn: async () => {
      const res = await api.get<Paged<Post>>('/posts', { params: { page, pageSize } })
      return res.data
    },
    keepPreviousData: true,
  })
}

/**
 * Custom infinite loader implemented with page-based queries. Returns combined items,
 * loading state, and helpers to load more or reset.
 */
export function useInfinitePosts(opts?: { pageSize?: number; enabled?: boolean }) {
  const pageSize = opts?.pageSize ?? 20
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Post[]>([])

  const query = useQuery({
    queryKey: queryKeys.posts(page, pageSize),
    queryFn: async () => {
      const res = await api.get<Paged<Post>>('/posts', { params: { page, pageSize } })
      return res.data
    },
    enabled: opts?.enabled ?? true,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (!query.data) return
    const pageItems = (query.data as Paged<Post>).items || []
    if (page === 1) setItems(pageItems)
    else setItems((prev) => [...prev, ...pageItems])
  }, [query.data, page])

  const hasMore = (() => {
    const d = query.data as Paged<Post> | undefined
    if (!d) return false
    const maxPage = Math.max(1, Math.ceil(d.total / (d.pageSize || pageSize)))
    return d.page < maxPage
  })()

  const loadMore = () => {
    if (!hasMore) return
    setPage((p) => p + 1)
  }

  const reset = () => {
    setPage(1)
    setItems([])
  }

  return {
    items,
    page,
    hasMore,
    loadMore,
    reset,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  }
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: queryKeys.post(postId),
    queryFn: async () => {
      const res = await api.get<Post>(`/posts/${postId}`)
      return res.data
    },
    enabled: !!postId,
  })
}

export function useChannels() {
  return useQuery({
    queryKey: queryKeys.channels(),
    queryFn: async () => {
      const res = await api.get('/channels')
      return res.data
    },
  })
}

export function useAnalytics(range = '30d') {
  return useQuery({
    queryKey: queryKeys.analytics(range),
    queryFn: async () => {
      const res = await api.get(`/analytics?range=${encodeURIComponent(range)}`)
      return res.data
    },
  })
}

export function usePublishPost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<Post>) => {
      const res = await api.post<Post>('/posts/publish', payload)
      return res.data
    },
    onMutate: async (newPost: Partial<Post>) => {
      const key = queryKeys.posts()
      await qc.cancelQueries(key)
      const previous = qc.getQueryData(key)
      qc.setQueryData(key, (old: any) => {
        if (!old) return old
        return { ...old, items: [newPost, ...old.items] }
      })
      return { previous }
    },
    onError: (err: unknown, variables: Partial<Post> | undefined, context: any) => {
      const key = queryKeys.posts()
      qc.setQueryData(key, context?.previous)
    },
    onSettled: () => {
      const key = queryKeys.posts()
      qc.invalidateQueries(key)
    },
  })
}

/**
 * Simple network/fetching heuristic. The repo's QueryClient typings in this
 * workspace are limited and importing `useIsFetching` introduced type errors.
 * This placeholder returns `true` while offline and `false` otherwise. Replace
 * with the official `useIsFetching` from React Query when types are available.
 */
export function useIsFetching(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine)
  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])
  return !online
}

export default {
  usePosts,
  usePost,
  usePublishPost,
  useInfinitePosts,
  useIsFetching,
}
