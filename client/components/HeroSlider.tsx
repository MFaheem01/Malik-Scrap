'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, PhoneCall, ShieldCheck } from 'lucide-react';

interface HeroSliderProps {
  onLearnMore: () => void;
  onContactUs: () => void;
  phone: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onLearnMore, onContactUs, phone }) => {
  const slides = [
    {
      id: 1,
      title: 'We Buy All Types of Industrial & Commercial Scrap Metal',
      subtitle:
        'Turn your factory cutoffs, surplus inventory, and demolition steel into instant revenue. Certified digital weighbridge weighing, top daily rates, and immediate same-day wire or cash settlement.',
      image: '/assets/images/hero_scrap_facility_1793892530533.jpg',
      highlightBadge: 'Licensed Metal Scrap Buyers | Top Payouts Paid',
      buttonPrimaryText: 'Sell Scrap Today',
      buttonSecondaryText: 'Check Buying Rates',
    },
    {
      id: 2,
      title: 'Free Roll-Off Scrap Bin Placement for Factories & Job Sites',
      subtitle:
        'We deliver 10 to 40-yard heavy-gauge steel scrap dumpsters directly to your workshop, manufacturing plant, or demolition site at zero cost. You load the metal—we collect, weigh, buy, and pay.',
      image: '/assets/images/industrial_scrap_containers_1793892531220.jpg',
      highlightBadge: 'Zero Bin Rental Fees | 24-Hour Container Swap',
      buttonPrimaryText: 'Order Scrap Bin',
      buttonSecondaryText: 'View Container Sizes',
    },
    {
      id: 3,
      title: 'Highest Cash Rates Paid for Copper, Brass & High-Grade Alloys',
      subtitle:
        'Instant handheld XRF spectrographic grading guarantees maximum certified valuation on Bare Bright wire, Millberry copper, brass fixtures, aluminum extrusions, and stainless steel.',
      image: '/assets/images/copper_wire_brass_1793892530421.jpg',
      highlightBadge: 'Immediate Payment | Handheld XRF Alloy Assay',
      buttonPrimaryText: 'Get a Scrap Quote',
      buttonSecondaryText: 'Schedule Drop-Off',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section id="home" className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
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

      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold tracking-widest uppercase px-2.5 py-7 items-center justify-center shadow-lg transition-all cursor-pointer rounded-r-md group [writing-mode:vertical-rl] rotate-180"
        aria-label="Previous Slide"
      >
        <span className="flex items-center gap-1.5 group-hover:-translate-y-1 transition-transform">
          <ChevronRight className="w-4 h-4 rotate-90" />
          Previous
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold tracking-widest uppercase px-2.5 py-7 items-center justify-center shadow-lg transition-all cursor-pointer rounded-l-md group [writing-mode:vertical-rl]"
        aria-label="Next Slide"
      >
        <span className="flex items-center gap-1.5 group-hover:translate-y-1 transition-transform">
          <ChevronRight className="w-4 h-4 -rotate-90" />
          Next
        </span>
      </button>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-semibold mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>{active.highlightBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight sm:leading-tight lg:leading-tight mb-6 drop-shadow-md">
          {active.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {active.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-300">
          <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
          <span>Direct Scrap Purchasing & Dispatch Hotline: <strong className="text-white font-semibold">{phone}</strong></span>
        </div>

        <div className="flex items-center gap-2.5 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
