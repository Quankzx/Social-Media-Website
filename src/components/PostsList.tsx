import React from 'react'
import { useInfinitePosts } from '../services/hooks'
import { Post } from '../types/models'

export default function PostsList(): JSX.Element {
  const { items = [], isLoading, isFetching, loadMore, hasMore } = useInfinitePosts({ pageSize: 10 })

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="h-24 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  return (
    <section aria-labelledby="posts-list" className="space-y-3 p-4">
      <h3 id="posts-list" className="sr-only">
        Posts
      </h3>
      {items.length === 0 && <div>No posts found.</div>}
      {items.map((p: Post) => (
        <article key={String(p.id)} className="p-3 border rounded" aria-label={p.title || 'Post'}>
          <div className="font-semibold">{p.title || 'Untitled'}</div>
          {p.description && <div className="text-sm text-muted">{p.description}</div>}
          <div className="text-xs text-muted mt-2">{p.network || ''} • {p.status}</div>
        </article>
      ))}

      <div className="pt-2">
        {hasMore ? (
          <button
            className="btn"
            onClick={() => loadMore()}
            disabled={isFetching}
            aria-busy={isFetching}
            aria-label="Load more posts"
          >
            {isFetching ? 'Loading…' : 'Load more'}
          </button>
        ) : (
          <div className="text-sm text-muted">No more posts</div>
        )}
      </div>
    </section>
  )
}
