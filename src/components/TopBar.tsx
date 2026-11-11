import React from 'react';
import { Phone, Mail, Clock, Shield, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { ContactInfo } from '../types';

interface TopBarProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ contact, onOpenAdmin, isAdminLoggedIn }) => {
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

        {/* Social and Admin right */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-400 hidden sm:inline">Follow Us</span>
            <div className="flex items-center gap-2">
              <a
                href={contact.social?.facebook || '#'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-400 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.social?.twitter || '#'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-400 transition-colors p-1"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.social?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-400 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.social?.youtube || '#'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-400 transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <span className="text-slate-700">|</span>

        </div>
      </div>
    </div>
  );
};
