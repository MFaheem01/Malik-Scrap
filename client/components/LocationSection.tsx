'use client';

import React from 'react';
import { MapPin, Navigation, Clock, Scale, Truck, Phone, CheckCircle, ExternalLink } from 'lucide-react';
import { ContactInfo } from '../types';

interface LocationSectionProps {
  contact: ContactInfo;
  onRequestDropoff: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ contact, onRequestDropoff }) => {
  const GOOGLE_MAPS_LINK = contact.googleMapsUrl || 'https://maps.app.goo.gl/4jdRcf7gbDx4L1Z59';
  const yardAddress = contact.address || 'Dubai Industrial City, Phase 2, Dubai, United Arab Emirates';

  return (
    <section id="location" className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-orange-500 uppercase tracking-wider block mb-2">
            Central Scrap Receiving Yard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Visit Our Certified Weighbridge Facility
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conveniently situated in Dubai Industrial City with dedicated heavy-haul access for flatbeds,
            trailers, and roll-off containers. Bring your scrap metal directly to our yard for instant weighing and payout.
          </p>
        </div>

        {/* Interactive Map Preview Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Map Preview Iframe */}
          <div className="lg:col-span-7 h-80 sm:h-96 lg:h-auto min-h-[340px] relative bg-slate-800">
            <iframe
              title="Malik Scrap Yard Google Map Preview"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(yardAddress)}&output=embed`}
              className="w-full h-full filter saturate-125 contrast-105"
            />
            <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Map Preview</span>
            </div>
          </div>

          {/* Location Information Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Yard Address</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed font-medium">
                    {yardAddress}
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Heavy Truck & Trailer Gate #3</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Certified Truck Scales</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    100-ton NTEP calibrated digital weighbridge with automated printed weight tickets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Receiving Hours</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {contact.hoursWeekday || 'Monday – Friday: 24/7 Receiving'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {contact.hoursSaturday || 'Saturday & Sunday: 24/7 Weighbridge Open'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Scrap Dispatch Line</h4>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Map Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={onRequestDropoff}
                className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Truck className="w-4 h-4 text-orange-400" />
                <span>Book Drop-off</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
