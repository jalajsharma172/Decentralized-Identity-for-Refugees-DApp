import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Sun, Moon, Home, User, FileText, Info, HelpCircle, Book, Shield, Settings } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';



export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Register', href: '/register', icon: FileText },
    { name: 'About', href: '/about', icon: Info },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Documentation', href: '/docs', icon: Book },
    { name: 'Admin', href: '/admin', icon: Settings },
  ];

  // { name: 'Contact', href: '/contact', icon: Mail },
  // { name: 'Terms', href: '/terms', icon: Shield },
  // 
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Icon */}
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">RefugeeDID</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className=" md:flex md:items-center md:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300">
                © 2024 RefugeeDID. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Terms
                </Link>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}