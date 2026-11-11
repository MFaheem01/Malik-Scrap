'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, Factory } from 'lucide-react';
import { ContactInfo } from '../types';

interface NavbarProps {
  contact: ContactInfo;
  onRequestQuote: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ contact, onRequestQuote, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Scrap We Buy', href: '#services' },
    { name: 'Free Containers', href: '#delivery' },
    { name: 'Selling Guides', href: '#blog' },
    { name: 'Yard Location', href: '#location' },
    { name: 'Contact & Sell', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20 group-hover:bg-orange-700 transition-colors">
              <Factory className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 tracking-tight flex items-center">
                <span className="text-orange-600">Malik</span>
                <span className="ml-1 text-slate-800">Scrap</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 -mt-1">
                Industrial Scrap Buyers
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
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
            <button
              onClick={onRequestQuote}
              className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Sell Your Scrap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-orange-600 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-slate-800 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sell Your Scrap Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-slate-500 mt-1">
              Dispatch: <span className="font-semibold text-slate-700">{contact.phone}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
