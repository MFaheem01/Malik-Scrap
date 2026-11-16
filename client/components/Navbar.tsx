'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ArrowRight, Phone, MapPin, X } from 'lucide-react';
import { ContactInfo } from '../types';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface NavbarProps {
  contact: ContactInfo;
  onRequestQuote?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ contact, onRequestQuote, activeSection = 'home' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Scrap We Buy', href: '/services' },
    { name: 'Blog & Guides', href: '/blog' },
    { name: 'Location', href: '/#location' },
  ];

  const handleCtaClick = () => {

    setMobileOpen(false);
    if (onRequestQuote) {
      onRequestQuote();
    } else {
      const el = document.getElementById('about') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand with updated navbar-logo.jpeg */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative h-12 w-auto min-w-[130px] max-w-[220px] flex items-center">
              <Image
                src="/assets/images/navbar-logo.png"
                alt="Malik Scrap Metal Buyers"
                width={200}
                height={55}
                priority
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </div>
          </Link>

          {/* Desktop Nav Links (Visible on desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                (link.href === '/' && activeSection === 'home') ||
                (link.href.startsWith('/#') && activeSection === link.href.substring(2)) ||
                (link.href === '/services' && activeSection === 'services') ||
                (link.href === '/blog' && activeSection === 'blog');

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1.5 ${isActive ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action zone */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleCtaClick}
              className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Sell Your Scrap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile & Tablet hamburger button (Visible below lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="p-2.5 text-slate-700 hover:text-orange-600 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>

              <SheetContent side="left" className="w-[320px] sm:w-[360px] p-0 flex flex-col justify-between bg-white text-slate-900 border-r border-slate-200 shadow-2xl h-full">
                <div className="flex flex-col flex-1 overflow-y-auto bg-white">
                  {/* Sheet Header with updated navbar logo */}
                  <SheetHeader className="p-5 border-b border-slate-100 bg-slate-50/90 pr-12 text-left">
                    <SheetTitle>
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block"
                      >
                        <Image
                          src="/assets/images/navbar-logo.jpeg"
                          alt="Malik Scrap Metal Buyers"
                          width={180}
                          height={48}
                          className="h-10 w-auto object-contain"
                        />
                      </Link>
                    </SheetTitle>
                    <p className="text-xs text-slate-500 mt-1 font-normal">
                      Licensed Industrial Scrap Metal Merchant
                    </p>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="py-4 px-3 space-y-1.5 bg-white">
                    {navLinks.map((link) => {
                      const isActive =
                        (link.href === '/' && activeSection === 'home') ||
                        (link.href.startsWith('/#') && activeSection === link.href.substring(2)) ||
                        (link.href === '/services' && activeSection === 'services') ||
                        (link.href === '/blog' && activeSection === 'blog');

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm transition-all ${isActive
                            ? 'bg-orange-50 text-orange-600 font-bold border-l-4 border-orange-600 pl-3'
                            : 'text-slate-800 hover:text-orange-600 hover:bg-slate-50 font-medium'
                            }`}
                        >
                          <span>{link.name}</span>
                          <ArrowRight className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-slate-400 opacity-60'}`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Footer in Mobile Sheet */}
                <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3 shrink-0">
                  <button
                    onClick={handleCtaClick}
                    className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold py-3 px-4 rounded-lg text-center flex items-center justify-center gap-2 shadow-sm text-sm cursor-pointer transition-all"
                  >
                    <span>Sell Your Scrap Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 space-y-2 text-xs text-slate-600">
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 font-medium text-slate-800 hover:text-orange-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{contact.phone}</span>
                    </a>
                    <div className="flex items-start gap-2 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{contact.address}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
