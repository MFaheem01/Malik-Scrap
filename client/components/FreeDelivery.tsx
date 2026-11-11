'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, MapPin, Box } from 'lucide-react';

interface FreeDeliveryProps {
  onGetQuote: () => void;
}

export const FreeDelivery: React.FC<FreeDeliveryProps> = ({ onGetQuote }) => {
  const containerSizes = [
    {
      size: '10-Yard Container',
      capacity: 'Up to 4 Tons',
      bestFor: 'Machine shops, small fabrication, renovation debris',
      dimensions: "12' L x 8' W x 4' H",
      turnaround: '24-hour turnaround',
    },
    {
      size: '20-Yard Container',
      capacity: 'Up to 8 Tons',
      bestFor: 'Medium manufacturing, structural steel drop, stamping scrap',
      dimensions: "22' L x 8' W x 4.5' H",
      turnaround: 'Same-day swap available',
      popular: true,
    },
    {
      size: '30-Yard Container',
      capacity: 'Up to 12 Tons',
      bestFor: 'Heavy industrial plants, demolition scrap, auto wrecking',
      dimensions: "22' L x 8' W x 6' H",
      turnaround: 'Scheduled rotation',
    },
    {
      size: '40-Yard High-Cube',
      capacity: 'Up to 16 Tons',
      bestFor: 'High-volume steel processors, large demolition sites',
      dimensions: "22' L x 8' W x 8' H",
      turnaround: 'Dedicated dispatch',
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Free Delivery & Drop-off',
      description: 'Zero drop fees for industrial and commercial accounts producing qualifying scrap volumes.',
    },
    {
      icon: Clock,
      title: '24-Hour Dispatch Turnaround',
      description: 'Need an empty container fast? Call or submit online — our fleet arrives within 24 hours.',
    },
    {
      icon: ShieldCheck,
      title: 'NTEP-Certified Scale Tickets',
      description: 'Transparent net weight tickets issued with each swap, verified on calibrated platform scales.',
    },
    {
      icon: Box,
      title: 'Multiple Heavy-Duty Sizes',
      description: 'From 10 to 40 yards, reinforced steel containers built to handle heavy ferrous and non-ferrous loads.',
    },
  ];

  return (
    <section id="delivery" className="py-20 lg:py-24 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-bold text-orange-600 uppercase tracking-wider block mb-2">
            Commercial Logistics & Bin Dispatch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Free Scrap Container Delivery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We deliver heavy-duty roll-off scrap containers directly to your job site, manufacturing plant,
            or fabrication shop at zero upfront cost for qualifying industrial accounts.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-orange-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

