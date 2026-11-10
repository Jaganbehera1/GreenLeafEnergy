import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import KSELogo from '../../images/GreenLeaf.jpeg';
import { useLanguage } from '../../contexts/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/learning', label: 'Learning' },
    { to: '/franchise', label: 'Franchise' },
    { to: '/gallery', label: t('nav_projects') },
    { to: '/quotation', label: t('nav_quotation') || 'Quotation' },
    { to: '/contact', label: t('nav_contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 shadow-lg fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo / Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={KSELogo} 
                  alt="Green Leaf Energy" 
                  className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border-2 border-white/80 shadow-lg group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-300 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="block text-sm md:text-xl font-extrabold text-white tracking-wide drop-shadow-md">
                  Green Leaf Energy
                </span>
                <p className="text-[8px] md:text-[10px] text-green-50 leading-none hidden sm:block">
                  {t('nav_powering_tomorrow') || 'Solar Energy Company'}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${
                  isActive(link.to)
                    ? 'text-lime-100 border-b-2 border-lime-100 font-semibold'
                    : 'text-white hover:text-lime-100 hover:border-b-2 hover:border-lime-100/80'
                } transition-all duration-300 font-medium pb-1 text-sm lg:text-base`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger menu button - mobile only */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-emerald-800 to-green-900 border-t-2 border-lime-300/60 shadow-lg animate-slideDown">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(link.to)
                    ? 'bg-gradient-to-r from-lime-400 to-green-600 text-white font-bold'
                    : 'text-white hover:bg-white/10 hover:text-lime-100'
                } block px-4 py-3 rounded-lg font-medium transition-all duration-300`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}