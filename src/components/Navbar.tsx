import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { ContactInfo } from '../types';

interface NavbarProps {
  contact: ContactInfo;
  onOpenSearch: () => void;
  onRequestQuote: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  contact,
  onOpenSearch,
  onRequestQuote,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Scrap We Buy', href: '#services' },
    { name: 'Prices', href: '#prices' },
    { name: 'Blog', href: '#blog' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand with updated navbar-logo.jpeg */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative h-12 w-auto min-w-[130px] max-w-[220px] flex items-center">
              <img
                src="/assets/images/navbar-logo.jpeg"
                alt="Malik Scrap Metal Buyers"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/navbar-logo.jpeg';
                }}
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1.5 ${
                  activeSection === link.href.substring(1)
                    ? 'text-orange-600'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action zone */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50/50 transition-colors cursor-pointer"
              aria-label="Search services and scrap rates"
              title="Search scrap metals & services"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onRequestQuote}
              className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-orange-600 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-orange-600 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu — high z-index and clear visibility */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-orange-600 bg-orange-50 font-bold'
                    : 'text-slate-800 hover:text-orange-600 hover:bg-orange-50/60'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-60" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold py-3 px-4 rounded-lg text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer text-sm"
            >
              <span>Request Scrap Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-slate-500 pt-1">
              Dispatch Hotline: <span className="font-semibold text-slate-700">{contact.phone}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
