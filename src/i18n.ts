import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { useTranslation as useReactI18next } from 'react-i18next'

const resources = {
  vi: {
    translation: {
      'app.title': 'Social Portal',
      'app.subtitle': 'Quản lý mạng xã hội',
      'header.searchPlaceholder': 'Tìm kiếm nội dung, tài khoản...',
      'theme.light': 'Chế độ Sáng',
      'theme.dark': 'Chế độ Tối',
      'lang.vi': 'Tiếng Việt',
      'lang.en': 'English',
      'login.signin': 'Sign in',
      'menu.dashboard': 'Dashboard',
      'menu.account': 'Tài khoản',
      'menu.content': 'Nội dung',
      'menu.report': 'Báo cáo',
      'menu.teamwork': 'Teamwork',
      'menu.tooltip': 'Chuyển đến {{label}}',
      'footer.brand': 'Social Portal',
      'footer.description': 'Nền tảng quản lý mạng xã hội toàn diện, giúp bạn tối ưu hóa hiệu quả marketing và tương tác với khách hàng.',
      'footer.quickLinks': 'Liên kết nhanh',
      'footer.support': 'Hỗ trợ',
      'footer.helpCenter': 'Trung tâm trợ giúp',
      'footer.contact': 'Liên hệ',
      'footer.terms': 'Điều khoản',
      'footer.privacy': 'Bảo mật',
    }
  },
  en: {
    translation: {
      'app.title': 'Social Portal',
      'app.subtitle': 'Social management',
      'header.searchPlaceholder': 'Search content, accounts...',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'lang.vi': 'Tiếng Việt',
      'lang.en': 'English',
      'login.signin': 'Sign in',
      'menu.dashboard': 'Dashboard',
      'menu.account': 'Account',
      'menu.content': 'Content',
      'menu.report': 'Report',
      'menu.teamwork': 'Teamwork',
      'menu.tooltip': 'Go to {{label}}',
      'footer.brand': 'Social Portal',
      'footer.description': 'Comprehensive social media management platform to optimize your marketing effectiveness and customer engagement.',
      'footer.quickLinks': 'Quick Links',
      'footer.support': 'Support',
      'footer.helpCenter': 'Help Center',
      'footer.contact': 'Contact',
      'footer.terms': 'Terms',
      'footer.privacy': 'Privacy',
    }
  }
}

const defaultLang = (() => {
  try { return localStorage.getItem('smw-locale') || 'vi' } catch { return 'vi' }
})()

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
})

// Re-export a named hook so parts of the app that import from "../i18n"
// using a named `useTranslation` will continue to work.
export function useTranslation() {
  return useReactI18next()
}

export default i18n
