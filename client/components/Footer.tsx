'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ExternalLink, ShieldCheck, ArrowRight, Mail } from 'lucide-react';
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
            <Link href="/" className="inline-block focus:outline-none">
              <div className="relative h-12 w-auto min-w-[130px] max-w-[210px] flex items-center">
                <Image
                  src="/assets/images/Footer-logo.png"
                  alt="Malik Scrap Metal Buyers"
                  width={200}
                  height={55}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Premier industrial scrap metal buyers. We purchase ferrous and non-ferrous scrap, certified weighbridge
              grading, commercial roll-off scrap container dispatch, and plant demolition salvage. Delivering top payouts
              and honest weights with fast digital settlement.
            </p>

            <div className="pt-2 space-y-2">
              <div>
                <span className="text-xs font-semibold text-white block mb-0.5">
                  Scrap Purchasing & Dispatch Hotline:
                </span>
                <a
                  href={`tel:${contact.dispatchPhone.replace(/[^0-9+]/g, '')}`}
                  className="text-base font-bold text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contact.dispatchPhone}</span>
                </a>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {contact.emergencyHotline}
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xs text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-orange-500" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </div>

            {/* Location & Map Link */}
            <div className="pt-1">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{contact.address}, {contact.city}</span>
                <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
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
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-orange-400 transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors text-orange-400 font-medium">
                  Scrap We Buy (All Services)
                </Link>
              </li>
              <li>
                <Link href="/#delivery" className="hover:text-orange-400 transition-colors">
                  Free Scrap Containers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors text-orange-400 font-medium">
                  Scrap Selling Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <span>Location & Map</span>
                </Link>
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
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Sell Your Scrap</span>
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
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              Staff Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
