'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

interface HeroSliderProps {
  onLearnMore: () => void;
  onContactUs: () => void;
  phone?: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onLearnMore,
  onContactUs,
  phone = '+971 50 436 3615',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/assets/images/copper_wire_brass_1793892530421.jpg',
      highlightBadge: 'Licensed Scrap Metal Merchant Since 1984',
      title: 'Highest Cash Rates Paid for Copper, Brass & High-Grade Alloys',
      subtitle:
        'Get certified handheld XRF spectrometer assays on-site. We purchase millberry copper wire, plumbing brass, insulated cables, and commercial chillers with instant payout.',
      buttonPrimaryText: 'Request Scrap Quote',
      buttonSecondaryText: 'Explore Purchasing Services',
    },
    {
      id: 2,
      image: '/assets/images/ferrous_steel_recycling_1793892530649.jpg',
      highlightBadge: 'Direct Secondary Mill Payouts — No Middlemen',
      title: 'Heavy Melting Steel, Rebar & High-Tonnage Demolition Scrap',
      subtitle:
        'Immediate purchase of HMS 1 & 2 steel, factory rebar offcuts, structural I-beams, and heavy industrial machinery with certified weighbridge receipts.',
      buttonPrimaryText: 'Schedule High-Tonnage Pickup',
      buttonSecondaryText: 'View Scrap Metal Prices',
    },
    {
      id: 3,
      image: '/assets/images/industrial_scrap_containers_1793892531220.jpg',
      highlightBadge: 'Free Roll-Off Containers Across Dubai & UAE',
      title: 'Complimentary Roll-Off Scrap Bin Placement & Site Logistics',
      subtitle:
        'We supply 10, 20, 30, and 40-yard scrap metal containers directly to your job site or workshop. Free delivery, scheduled pickup, and instant settlement.',
      buttonPrimaryText: 'Request Free Container Placement',
      buttonSecondaryText: 'Learn About Yard Weighbridge',
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const active = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-slate-950 text-white h-[620px] sm:h-[660px] lg:h-[700px] flex items-center justify-center select-none"
    >
      {/* Background slide images */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-7000 ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/85 via-slate-950/85 to-slate-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>
      ))}

      {/* Fixed 'Previous' Carousel Button — mathematically locked at vertical center */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-orange-600 active:bg-orange-700 text-white flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/15 transition-all cursor-pointer group"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Fixed 'Next' Carousel Button — mathematically locked at vertical center */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-orange-600 active:bg-orange-700 text-white flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/15 transition-all cursor-pointer group"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Main Hero Content — locked in place */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 text-center flex flex-col items-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-semibold mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>{active.highlightBadge}</span>
        </div>

        {/* Stable text block with consistent minimum height to prevent jitter */}
        <div className="min-h-[190px] sm:min-h-[220px] lg:min-h-[230px] flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight lg:leading-tight mb-4 drop-shadow-md">
            {active.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {active.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-8">
          <button
            onClick={onContactUs}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-8 py-4 rounded-lg shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>{active.buttonPrimaryText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onLearnMore}
            className="w-full sm:w-auto bg-[#0b1329] hover:bg-slate-900 border border-slate-700 text-white font-semibold text-sm px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>{active.buttonSecondaryText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-400" />
          </button>
        </div>

        {/* Dispatch Hotline info */}
        <div className="mt-7 flex items-center gap-2 text-xs text-slate-300">
          <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
          <span>
            Direct Scrap Purchasing &amp; Dispatch Hotline:{' '}
            <strong className="text-white font-semibold">{phone}</strong>
          </span>
        </div>
      </div>

      {/* Bottom slide indicator dots */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === currentSlide ? 'w-8 bg-orange-600' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
