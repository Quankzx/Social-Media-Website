import api from './api';

export type SocialNetwork = 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram';

export interface PublishResult {
  success: boolean;
  platformId?: string; // id returned by platform
  error?: string;
}

export interface Insight {
  likes: number;
  comments: number;
  shares?: number;
  reach?: number;
  impressions?: number;
  timestamp: string;
}

// Simple abstraction for REST vs GraphQL calls
const callPlatform = async (path: string, method = 'get', data?: any, useGraphql = false) => {
  if (useGraphql) {
    // Placeholder GraphQL call: platforms like Facebook support Graph API or GraphQL endpoints
    return api.post('/graphql', { query: path, variables: data });
  }
  switch (method.toLowerCase()) {
    case 'get':
      return api.get(path, { params: data });
    case 'post':
      return api.post(path, data);
    case 'put':
      return api.put(path, data);
    case 'delete':
      return api.delete(path);
    default:
      return api.request({ url: path, method, data });
  }
};

const socialApi = {
  // Publish a post to a given network. For now this calls a mocked backend endpoint which would
  // integrate with platform SDKs / APIs. Returns platform-level id or error.
  publishPost: async (network: SocialNetwork, payload: any): Promise<PublishResult> => {
    try {
      // In real integration, this would call our backend which holds platform credentials and tokens.
      const res = await callPlatform(`/platform/${network.toLowerCase()}/publish`, 'post', payload);
      return {
        success: true,
        platformId: res?.data?.id || `${network.toLowerCase()}_${Date.now()}`,
      };
    } catch (err: any) {
      return { success: false, error: err?.response?.data?.message || err.message || 'Unknown error' };
    }
  },

  // Fetch comments for a platform post
  fetchComments: async (network: SocialNetwork, platformId: string) => {
    try {
      const res = await callPlatform(`/platform/${network.toLowerCase()}/posts/${platformId}/comments`, 'get');
      return res.data || [];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchComments error', err);
      return [];
    }
  },

  // Fetch insights (likes/comments/shares/reach) for a post over time
  fetchInsights: async (network: SocialNetwork, platformId: string, since?: string, until?: string): Promise<Insight[]> => {
    try {
      const res = await callPlatform(`/platform/${network.toLowerCase()}/posts/${platformId}/insights`, 'get', { since, until });
      return res.data || [];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchInsights error', err);
      return [];
    }
  },

  // Sync post status between our system and platform (polling or webhook-driven)
  syncPostStatus: async (network: SocialNetwork, platformId: string) => {
    try {
      const res = await callPlatform(`/platform/${network.toLowerCase()}/posts/${platformId}/status`, 'get');
      return res.data || { status: 'unknown' };
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('syncPostStatus error', err);
      return { status: 'error', error: err?.message || String(err) };
    }
  },
};

export default socialApi;
