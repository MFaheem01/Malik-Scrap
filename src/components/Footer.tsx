import React, { useState } from 'react';
import { Factory, Phone, Mail, MapPin, Clock, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contact, onOpenAdmin, onRequestQuote }) => {
  const [rateEmail, setRateEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (rateEmail.trim()) {
      setSubscribed(true);
      setRateEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#070d1e] text-slate-300 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand  Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20">
                <Factory className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight flex items-center">
                  Ferro<span className="text-orange-500">Max</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1">
                  Industrial Scrap
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Premier industrial scrap metal processing, certified weighbridge grading, commercial roll-off container
              dispatch, and demolition salvage. Delivering maximum  yields and sustainable circular solutions
              since 1984.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-1">
                Emergency Dispatch Hotline:
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
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Links
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
                  Services
                </a>
              </li>
              <li>
                <a href="#prices" className="hover:text-orange-400 transition-colors">
                  Today's Scrap Rates
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-orange-400 transition-colors">
                  Latest Blog  Insights
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-orange-400 transition-colors">
                  Yard Location  Scales
                </a>
              </li>
            </ul>
          </div>

          {/* Metals Accepted (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Accepted Materials
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-400">
              <span className="hover:text-slate-200">· Bare Bright Copper</span>
              <span className="hover:text-slate-200">· Yellow  Red Brass</span>
              <span className="hover:text-slate-200">· Copper Pipes #1/#2</span>
              <span className="hover:text-slate-200">· Aluminum Extrusion</span>
              <span className="hover:text-slate-200">· Stainless 304/316</span>
              <span className="hover:text-slate-200">· HMS 1  2 Steel</span>
              <span className="hover:text-slate-200">· Catalytic Converters</span>
              <span className="hover:text-slate-200">· Car Batteries  Lead</span>
              <span className="hover:text-slate-200">· High-Temp Alloys</span>
              <span className="hover:text-slate-200">· Electric Motors</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-2 px-3 rounded text-center transition-colors cursor-pointer"
              >
                Request Custom Material Valuation
              </button>
            </div>
          </div>

          {/* Rate Alert Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Daily Scrap Rate Alerts
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get notified of major copper and steel price jumps directly in your inbox every morning.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Subscribed! You will receive tomorrow's morning scrap report.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="commercial@company.com"
                  value={rateEmail}
                  onChange={(e) => setRateEmail(e.target.value)}
                  required
                  className="w-full bg-[#050914] text-white text-xs px-3.5 py-2.5 rounded border border-slate-800 focus:outline-none focus:border-orange-500 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-orange-600 text-white font-semibold text-xs py-2.5 px-3 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe to Rate Updates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Scale: {contact.hoursWeekday}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright  Admin Portal */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {contact.companyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Terms  Compliance
            </a>
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
