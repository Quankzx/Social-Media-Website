import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from '../i18n';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('footer.brand')}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            {t('footer.description')}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2">
            <li><a href="#dashboard" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('menu.dashboard')}</a></li>
            <li><a href="#account" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('menu.account')}</a></li>
            <li><a href="#content" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('menu.content')}</a></li>
            <li><a href="#report" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('menu.report')}</a></li>
          </ul>
        </div>
        
        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('footer.support')}</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('footer.helpCenter')}</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('footer.contact')}</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('footer.terms')}</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">{t('footer.privacy')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; 2025 Social Portal. Tất cả quyền được bảo lưu.
        </p>
        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm mt-2 sm:mt-0">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>in Vietnam</span>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
