// Minimal auth helpers: token storage and refresh flow.
// For simplicity this uses localStorage. In production prefer httpOnly cookies.

const ACCESS_KEY = 'auth_access_token';
const REFRESH_KEY = 'auth_refresh_token';

const authService = {
  getAccessToken(): string | null {
    try { return localStorage.getItem(ACCESS_KEY); } catch { return null; }
  },
  getRefreshToken(): string | null {
    try { return localStorage.getItem(REFRESH_KEY); } catch { return null; }
  },
  setTokens(access: string, refresh?: string) {
    try {
      localStorage.setItem(ACCESS_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    } catch (e) { /* noop */ }
  },
  clearTokens() {
    try {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    } catch (e) { /* noop */ }
  },
  async login(email: string, password: string) {
    const resp = await fetch('https://api.example.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!resp.ok) throw new Error('Login failed')
    const data = await resp.json()
    this.setTokens(data.accessToken, data.refreshToken)
    return data
  },
  async register(payload: { name: string; email: string; password: string }) {
    const resp = await fetch('https://api.example.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!resp.ok) throw new Error('Register failed')
    const data = await resp.json()
    this.setTokens(data.accessToken, data.refreshToken)
    return data
  },
  async refreshToken(): Promise<string> {
    const refresh = this.getRefreshToken();
    if (!refresh) throw new Error('No refresh token');

    // Use native fetch to avoid circular axios import
    const resp = await fetch('https://api.example.com/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    if (!resp.ok) throw new Error('Refresh failed');
    const data = await resp.json();
    const newAccess = data.accessToken;
    const newRefresh = data.refreshToken || refresh;
    this.setTokens(newAccess, newRefresh);
    return newAccess;
  }
};

export default authService;
