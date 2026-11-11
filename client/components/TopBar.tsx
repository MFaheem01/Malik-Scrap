'use client';

import React from 'react';
import { Phone, Mail, Clock, Shield, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { ContactInfo } from '../types';

interface TopBarProps {
  contact: ContactInfo;
}

export const TopBar: React.FC<TopBarProps> = ({ contact }) => {
  return (
    <div className="bg-[#0b1329] text-slate-300 text-xs border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-y-2">
        {/* Contact info left */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-semibold">Need Any Help?</span>
            <a
              href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-200 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{contact.phone}</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-orange-500" />
              <span>{contact.email}</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <span className="text-slate-600">|</span>
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{contact.hoursWeekday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

