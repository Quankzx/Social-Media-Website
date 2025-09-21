// Core domain models and enums used across the frontend
// No runtime dependencies here — purely TypeScript types so it's safe to add without installing packages.

/** Utility: branded id for type-safety */
export type Branded<T, B> = T & { __brand?: B };

export type PostId = Branded<string, 'PostId'>;
export type MediaId = Branded<string, 'MediaId'>;
export type MemberId = Branded<string, 'MemberId'>;

export enum PostStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Processing = 'Processing',
  Published = 'Published',
  Failed = 'Failed',
}

export enum Provider {
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  Instagram = 'Instagram',
}

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

export enum Role {
  Admin = 'Admin',
  Editor = 'Editor',
  Creator = 'Creator',
  Viewer = 'Viewer',
}

export interface PostAsset {
  id: MediaId | string;
  type: MediaType;
  url: string;
  name?: string;
  width?: number;
  height?: number;
  sizeBytes?: number;
  durationSeconds?: number; // for videos
}

export interface Post {
  id: PostId | string;
  title: string;
  content: string;
  description?: string;
  network: Provider;
  status: PostStatus;
  scheduledAt?: string; // ISO timestamp
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
  assets?: PostAsset[];
  tags?: string[];
  hashtags?: string[];
  platformId?: string; // id on provider (Facebook post id, etc.)
  authorId?: MemberId | string;
}

export interface ChannelAccount {
  id: string;
  provider: Provider;
  displayName: string;
  connected: boolean;
  connectedAt?: string;
  meta?: Record<string, unknown>;
}

export interface Member {
  id: MemberId | string;
  name: string;
  email?: string;
  role: Role;
  avatarUrl?: string;
  active?: boolean;
}

export interface AnalyticsSnapshot {
  date: string; // yyyy-mm-dd or ISO
  provider?: Provider;
  impressions?: number;
  reach?: number;
  clicks?: number;
  likes?: number;
  shares?: number;
  comments?: number;
  followers?: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// API DTOs (frontend-facing shapes)
export interface PublishPostRequest {
  title: string;
  content: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  tags?: string[];
  hashtags?: string[];
  description?: string;
}

export interface PublishPostResponse {
  success: boolean;
  platformId?: string;
  error?: string;
}

export interface CommentsFetchParams {
  platformId: string;
  provider: Provider;
  cursor?: string;
  limit?: number;
}

// Note: Zod schemas and runtime validators are recommended (see project TODOs),
// but are intentionally not added here to avoid introducing a new runtime dependency.
// Add Zod schemas in a future pass (e.g. src/schemas/*.ts) once zod is an allowed dependency.

export type ISODateString = string;

// small helper types for results
export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

export {}; 
