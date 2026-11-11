import React from 'react';
import { MapPin, Navigation, Clock, Scale, Truck, Phone, CheckCircle, ExternalLink } from 'lucide-react';
import { ContactInfo } from '../types';

interface LocationSectionProps {
  contact: ContactInfo;
  onRequestDropoff: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ contact, onRequestDropoff }) => {
  return (
    <section id="location" className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-bold text-orange-500 uppercase tracking-wider block mb-2">
            Facility  Weighbridge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Visit Our Main  Yard
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Convenient heavy-haul access located off the industrial expressway. Equipped with dual 70-foot
            NTEP-certified digital truck platform scales for rapid entry and zero waiting.
          </p>
        </div>


      </div>
    </section>
  );
};
