'use client';

import React, { useState, useEffect } from 'react';
import {
  Hammer,
  Zap,
  Truck,
  Wrench,
  Car,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Check,
  Pause,
  Play,
  Layers,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSliderProps {
  services: ServiceItem[];
  onRequestService: (serviceTitle: string) => void;
}

export const ServicesSlider: React.FC<ServicesSliderProps> = ({
  services,
  onRequestService,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [progress, setProgress] = useState(0);

  const visibleCards = 4;
  const total = services.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const intervalTime = 3000;
    const stepTime = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += stepTime;
      setProgress(Math.min(100, (elapsed / intervalTime) * 100));

      if (elapsed >= intervalTime) {
        elapsed = 0;
        setProgress(0);
        setStartIndex((prev) => (prev + 1) % total);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isPaused, total, startIndex]);

  const handleNext = () => {
    setProgress(0);
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setProgress(0);
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Hammer':
        return <Hammer className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const displayedServices = [];
  for (let i = 0; i < visibleCards; i++) {
    const idx = (startIndex + i) % total;
    if (services[idx]) {
      displayedServices.push(services[idx]);
    }
  }

  return (
    <section
      id="services"
      className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider block mb-2">
              Scrap Purchasing Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Scrap Metals We Purchase
            </h2>
          </div>

          <div className="lg:max-w-xl">
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              We buy all categories of ferrous and non-ferrous metal scrap directly from manufacturing plants,
              machine shops, demolition contractors, and fabricators with certified weighing and instant payouts.
            </p>
            <div className="flex items-center justify-between sm:justify-start gap-6">
              <button
                onClick={() => onRequestService('All Scrap Purchasing Inquiry')}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Request Custom Scrap Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1 text-slate-600 hover:text-orange-600 cursor-pointer"
                  title={isPaused ? 'Resume auto-slider' : 'Pause auto-slider'}
                >
                  {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{isPaused ? 'Paused' : 'Auto 3s'}</span>
                </button>
                <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-75"
                    style={{ width: `${isPaused ? 0 : progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-16 right-0 hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              aria-label="Previous scrap slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              aria-label="Next scrap slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
            {displayedServices.map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                className="bg-white rounded-lg border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-600/20 group-hover:scale-110 transition-transform">
                      {renderIcon(service.icon)}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                    {service.shortDesc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Read More</span>
                      <span className="w-6 h-0.5 bg-orange-500 rounded group-hover:w-8 transition-all" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {service.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setProgress(0);
                  setStartIndex(i);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === startIndex ? 'w-8 bg-orange-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-bold text-white drop-shadow">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Material Valuation & Payout Details
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {selectedService.description || selectedService.shortDesc}
                </p>
              </div>

              {selectedService.highlight && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-orange-950 text-sm block">
                      Payout Guarantee
                    </span>
                    <span className="text-orange-900/80 text-xs leading-relaxed">
                      {selectedService.highlight}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onRequestService(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Purchase Quote for This Scrap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
