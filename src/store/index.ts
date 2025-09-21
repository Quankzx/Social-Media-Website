// Demo cấu trúc store với Zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Broadcast channel key for multi-tab logout/hydration
const BC_KEY = 'smw_broadcast'

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  network: 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram';
  status: 'Đã đăng' | 'Lên lịch' | 'Nháp' | 'Đang xử lý' | 'Lỗi';
  platformId?: string; // id of the post on the platform
  mediaUrls?: string[];
  tags?: string[]; // for YouTube, Instagram
  music?: string; // for TikTok
  description?: string; // for YouTube
  hashtags?: string[]; // for Instagram, TikTok
}

interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

type Role = 'Admin' | 'Editor' | 'Creator' | 'Viewer';

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  read?: boolean;
  timestamp: string;
}

interface AppState {
  // auth
  user: any | null
  setUser: (user: any | null) => void
  // ui
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  notification: string | null
  setNotification: (msg: string | null) => void
  // locale
  locale: string
  setLocale: (l: string) => void
  // posts normalized
  postsById: Record<string, Post>
  postsOrder: string[]
  // legacy arrays kept for compatibility
  posts: Post[]
  addPost: (post: Omit<Post, 'id'>) => void
  updatePost: (id: string, post: Partial<Post>) => void
  deletePost: (id: string) => void
  // media normalized
  mediaById: Record<string, Media>
  mediaOrder: string[]
  // legacy array
  media: Media[]
  addMedia: (media: Omit<Media, 'id'>) => void
  deleteMedia: (id: string) => void
  // RBAC & members
  members: Member[]
  addMember: (member: Omit<Member, 'id'>) => void
  updateMemberRole: (id: string, role: Role) => void
  removeMember: (id: string) => void
  // Notifications
  notifications: NotificationItem[]
  pushNotification: (item: Omit<NotificationItem, 'id' | 'timestamp'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  // Reset / per-slice reset
  reset: () => void
  resetAuth: () => void
  // demo loading flag
  isAppLoading: boolean
  setAppLoading: (v: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    devtools((set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      notification: null,
      setNotification: (msg) => set({ notification: msg }),
      // locale
      locale: 'vi',
      setLocale: (l: string) => set({ locale: l }),

      // posts initial fixtures normalized
      postsById: {
        '1': { id: '1', title: 'Bài Facebook 1', content: 'Nội dung bài 1', date: '2025-09-22', network: 'Facebook', status: 'Đã đăng', tags: ['social', 'media'], platformId: 'fb_1001' },
        '2': { id: '2', title: 'Video TikTok', content: 'Nội dung video', date: '2025-09-23', network: 'TikTok', status: 'Lên lịch', music: 'Nhạc nền vui', hashtags: ['tiktok', 'viral'], platformId: 'tt_2002' },
        '3': { id: '3', title: 'Shorts YouTube', content: 'Nội dung shorts', date: '2025-09-24', network: 'YouTube', status: 'Nháp', description: 'Mô tả chi tiết', tags: ['youtube', 'shorts'] },
        '4': { id: '4', title: 'Ảnh Instagram', content: 'Nội dung ảnh', date: '2025-09-25', network: 'Instagram', status: 'Đã đăng', hashtags: ['instagram', 'photo'], platformId: 'ig_4004' },
      },
      postsOrder: ['1', '2', '3', '4'],
      // legacy array for compatibility
      posts: [
        { id: '1', title: 'Bài Facebook 1', content: 'Nội dung bài 1', date: '2025-09-22', network: 'Facebook', status: 'Đã đăng', tags: ['social', 'media'], platformId: 'fb_1001' },
        { id: '2', title: 'Video TikTok', content: 'Nội dung video', date: '2025-09-23', network: 'TikTok', status: 'Lên lịch', music: 'Nhạc nền vui', hashtags: ['tiktok', 'viral'], platformId: 'tt_2002' },
        { id: '3', title: 'Shorts YouTube', content: 'Nội dung shorts', date: '2025-09-24', network: 'YouTube', status: 'Nháp', description: 'Mô tả chi tiết', tags: ['youtube', 'shorts'] },
        { id: '4', title: 'Ảnh Instagram', content: 'Nội dung ảnh', date: '2025-09-25', network: 'Instagram', status: 'Đã đăng', hashtags: ['instagram', 'photo'], platformId: 'ig_4004' },
      ],

      addPost: (post) => set((state) => {
        const id = Date.now().toString()
        const newById = { ...state.postsById, [id]: { ...post, id } }
        const newOrder = [...state.postsOrder, id]
        const newPosts = [...state.posts, { ...post, id }]
        return { postsById: newById, postsOrder: newOrder, posts: newPosts }
      }),
      updatePost: (id, updates) => set((state) => {
        const updated = { ...state.postsById[id], ...updates }
  return { postsById: { ...state.postsById, [id]: updated }, posts: state.posts.map((p: Post) => p.id === id ? { ...p, ...updates } : p) }
      }),
      deletePost: (id) => set((state) => {
        const { [id]: _removed, ...byId } = state.postsById
  return { postsById: byId, postsOrder: state.postsOrder.filter(x => x !== id), posts: state.posts.filter((p: Post) => p.id !== id) }
      }),

      // media
      mediaById: {
        '1': { id: '1', type: 'image', url: 'https://picsum.photos/seed/1/200', name: 'image1.jpg' },
        '2': { id: '2', type: 'image', url: 'https://picsum.photos/seed/2/200', name: 'image2.jpg' },
        '3': { id: '3', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'video.mp4' },
        '4': { id: '4', type: 'image', url: 'https://picsum.photos/seed/3/200', name: 'image3.jpg' },
      },
      mediaOrder: ['1', '2', '3', '4'],
      // legacy array for compatibility
      media: [
        { id: '1', type: 'image', url: 'https://picsum.photos/seed/1/200', name: 'image1.jpg' },
        { id: '2', type: 'image', url: 'https://picsum.photos/seed/2/200', name: 'image2.jpg' },
        { id: '3', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'video.mp4' },
        { id: '4', type: 'image', url: 'https://picsum.photos/seed/3/200', name: 'image3.jpg' },
      ],
      addMedia: (media) => set((state) => {
        const id = Date.now().toString()
        const newById = { ...state.mediaById, [id]: { ...media, id } }
        const newOrder = [...state.mediaOrder, id]
        const newMedia = [...state.media, { ...media, id }]
        return { mediaById: newById, mediaOrder: newOrder, media: newMedia }
      }),
      deleteMedia: (id) => set((state) => {
        const { [id]: _removed, ...byId } = state.mediaById
  return { mediaById: byId, mediaOrder: state.mediaOrder.filter(x => x !== id), media: state.media.filter((m: Media) => m.id !== id) }
      }),

      // members & RBAC
      members: [
        { id: 'm1', name: 'Alice Admin', email: 'alice@example.com', role: 'Admin' },
        { id: 'm2', name: 'Eddie Editor', email: 'eddie@example.com', role: 'Editor' },
        { id: 'm3', name: 'Carla Creator', email: 'carla@example.com', role: 'Creator' },
        { id: 'm4', name: 'Vera Viewer', email: 'vera@example.com', role: 'Viewer' },
      ],
      addMember: (member) => set((state) => ({ members: [...state.members, { ...member, id: Date.now().toString() }] })),
      updateMemberRole: (id, role) => set((state) => ({ members: state.members.map(m => m.id === id ? { ...m, role } : m) })),
      removeMember: (id) => set((state) => ({ members: state.members.filter(m => m.id !== id) })),

      // notifications
      notifications: [],
      pushNotification: (item) => set((state) => ({ notifications: [{ ...item, id: Date.now().toString(), timestamp: new Date().toISOString(), read: false }, ...state.notifications] })),
      markNotificationRead: (id) => set((state) => ({ notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
      clearNotifications: () => set({ notifications: [] }),

      reset: () => {
        // broadcast reset to other tabs
        try { window?.localStorage?.setItem(BC_KEY, JSON.stringify({ type: 'reset', at: Date.now() })) } catch (e) { /* noop */ }
        set({
          user: null,
          theme: 'light',
          notification: null,
          postsById: {},
          postsOrder: [],
          posts: [],
          mediaById: {},
          mediaOrder: [],
          media: [],
          members: [],
          notifications: [],
          isAppLoading: false,
          locale: 'vi',
        })
      },
      resetAuth: () => set({ user: null }),

      // global loading flag
      isAppLoading: false,
      setAppLoading: (v: boolean) => set({ isAppLoading: v }),
    }), { name: 'smw-devtools' }),
    { name: 'smw-store', partialize: (state) => ({ user: state.user, theme: state.theme, locale: (state as any).locale }) }
  )
);

// Multi-tab listener: listen for broadcast key changes and act accordingly (basic)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === BC_KEY && e.newValue) {
      try {
        const payload = JSON.parse(e.newValue)
        if (payload?.type === 'reset') {
          useAppStore.getState().reset()
        }
      } catch (err) {
        // ignore
      }
    }
  })
}
