// Lightweight runtime validators for a subset of models.
// These simple validators avoid external runtime dependencies and are intended
// as stop-gap checks until proper schema libraries (Zod) are added.

import { Post, PostAsset, Provider, MediaType, PostStatus } from '../types/models';

export function isString(x: unknown): x is string {
  return typeof x === 'string';
}

export function isProvider(x: unknown): x is Provider {
  return isString(x) && Object.values(Provider).includes(x as Provider);
}

export function isMediaType(x: unknown): x is MediaType {
  return isString(x) && Object.values(MediaType).includes(x as MediaType);
}

export function isPostAsset(x: unknown): x is PostAsset {
  if (!x || typeof x !== 'object') return false;
  const a = x as Partial<PostAsset>;
  return isString(a.url) && (isString(a.id) || typeof a.id === 'string') && isMediaType(a.type);
}

export function isPost(x: unknown): x is Post {
  if (!x || typeof x !== 'object') return false;
  const p = x as Partial<Post>;
  if (!isString(p.id) || !isString(p.title) || !isString(p.content)) return false;
  if (!p.createdAt || !isString(p.createdAt)) return false;
  if (p.network && !isProvider(p.network)) return false;
  if (p.status && !Object.values(PostStatus).includes(p.status as PostStatus)) return false;
  if (p.assets && Array.isArray(p.assets)) {
    if (!p.assets.every(isPostAsset)) return false;
  }
  return true;
}

export default { isPost, isPostAsset };
