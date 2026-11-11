'use client';

import React from 'react';
import { Factory, Phone, MapPin, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contact: ContactInfo;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contact, onRequestQuote }) => {
  const GOOGLE_MAPS_LINK = contact.googleMapsUrl || 'https://maps.app.goo.gl/4jdRcf7gbDx4L1Z59';

  return (
    <footer id="contact" className="bg-[#070d1e] text-slate-300 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-10 lg:gap-8">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20">
                <Factory className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight flex items-center">
                  <span className="text-orange-500">Malik</span>
                  <span className="ml-1 text-white">Scrap Buyers</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1">
                  Industrial Scrap Metal Purchasing
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Premier industrial scrap metal buyers. We purchase ferrous and non-ferrous scrap, certified weighbridge
              grading, commercial roll-off scrap container dispatch, and plant demolition salvage. Delivering top payouts
              and honest weights since 1984.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-1">
                Scrap Purchasing & Dispatch Hotline:
              </span>
              <a
                href={`tel:${contact.dispatchPhone.replace(/[^0-9+]/g, '')}`}
                className="text-base font-bold text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{contact.dispatchPhone}</span>
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {contact.emergencyHotline}
              </span>
            </div>

            {/* Location & Map Link */}
            <div className="pt-1">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{contact.address}, {contact.city}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">
                  About Our Company
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Scrap We Buy
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-orange-400 transition-colors">
                  Free Scrap Containers
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-orange-400 transition-colors">
                  Scrap Selling Guides
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-orange-400 transition-colors flex items-center gap-1 text-orange-400 font-medium">
                  <span>Yard Location & Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/admin" className="text-slate-500 hover:text-orange-400 transition-colors">
                  Admin Portal Login
                </a>
              </li>
            </ul>
          </div>

          {/* Metals Accepted (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Scrap Metals We Buy
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-400">
              <span className="hover:text-slate-200">· Bare Bright Copper</span>
              <span className="hover:text-slate-200">· Yellow & Red Brass</span>
              <span className="hover:text-slate-200">· Copper Pipes #1 / #2</span>
              <span className="hover:text-slate-200">· Aluminum Extrusions</span>
              <span className="hover:text-slate-200">· Stainless Steel 304/316</span>
              <span className="hover:text-slate-200">· HMS 1 & 2 Steel</span>
              <span className="hover:text-slate-200">· Catalytic Converters</span>
              <span className="hover:text-slate-200">· Industrial Lead Batteries</span>
              <span className="hover:text-slate-200">· Inconel & Monel Alloys</span>
              <span className="hover:text-slate-200">· Scrap Electric Motors</span>
            </div>

            <div className="pt-4">
              <button
                onClick={onRequestQuote}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request Free Scrap Valuation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {contact.companyName}. All rights reserved. Licensed Scrap Metal Merchant.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
              <span>EPA & Municipal Licensed</span>
            </span>
            <a href="/admin" className="hover:text-slate-300 transition-colors">
              Staff Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
