import type { QueryClient } from '@tanstack/react-query';

// Small helpers to centralize invalidation and cache operations.
export const invalidatePosts = (qc: QueryClient) => {
  qc.invalidateQueries(['posts']);
};

export const invalidatePost = (qc: QueryClient, postId: string | number) => {
  qc.invalidateQueries(['posts', String(postId)]);
};

export const resetAllQueries = (qc: QueryClient) => {
  qc.resetQueries();
};
