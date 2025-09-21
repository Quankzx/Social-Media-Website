import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from './services/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAppStore } from './store';
// Start MSW in development for local API mocks
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser')
    .then((m) => {
      if (m && typeof m.startMockWorker === 'function') {
        return m.startMockWorker()
      }
      if (m && typeof m.default === 'function') {
        return m.default()
      }
      return null
    })
    .catch(() => {
      // msw not installed: skip
    })
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = createQueryClient();

// Initialize theme and locale from persisted store/localStorage before render
try {
  // Try to read persisted zustand store object (smw-store) for theme/locale
  const raw = localStorage.getItem('smw-store')
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      const theme = parsed?.state?.theme || parsed?.theme
      const locale = parsed?.state?.locale || parsed?.locale
      if (theme === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      if (locale) document.documentElement.lang = locale
    } catch (e) {
      // ignore parse errors
    }
  } else {
    const theme = localStorage.getItem('smw-theme')
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    const locale = localStorage.getItem('smw-locale')
    if (locale) document.documentElement.lang = locale
  }
} catch (e) {
  // ignore
}

// Auto-show skeleton for 3 seconds on app load
useAppStore.getState().setAppLoading(true);
setTimeout(() => {
  useAppStore.getState().setAppLoading(false);
}, 3000);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
