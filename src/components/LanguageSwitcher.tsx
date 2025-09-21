import React from 'react'
import { useAppStore } from '../store'
import i18n from '../i18n'

const SUPPORTED = ['vi', 'en'] as const

const LanguageSwitcher: React.FC = () => {
  const locale = useAppStore((s) => (s as any).locale) || (() => {
    try { return localStorage.getItem('smw-locale') || 'vi' } catch { return 'vi' }
  })()
  const setLocaleStore = useAppStore((s) => (s as any).setLocale as ((l: string) => void) | undefined)

  const setLocale = (l: string) => {
    try { localStorage.setItem('smw-locale', l) } catch (e) { }
    if (setLocaleStore) setLocaleStore(l)
    try { i18n.changeLanguage(l) } catch (e) { /* ignore if i18n not ready */ }
    try { document.documentElement.lang = l } catch (e) { /* noop */ }
  }

  return (
    <div className="flex items-center">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="px-2 py-1 rounded border bg-white text-sm"
        aria-label="Select language"
      >
        {SUPPORTED.map((s) => (
          <option key={s} value={s}>{s === 'vi' ? 'Tiếng Việt' : 'English'}</option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
