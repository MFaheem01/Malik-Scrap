import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall } from 'lucide-react';

interface HeroSliderProps {
  onLearnMore: () => void;
  onContactUs: () => void;
  phone: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onLearnMore, onContactUs, phone }) => {
  const slides = [
    {
      id: 1,
      title: 'We Provide All Industrial  Scrap Metal Solutions',
      subtitle:
        'Certified high-capacity shredding, NTEP-calibrated truck scales, and top-dollar electronic payouts for commercial and industrial metal scrap.',
      image: '/src/assets/images/hero_scrap_facility_1793892530533.jpg',
      highlightBadge: 'ISO 9001  EPA Certified Metal Reclamation',
      buttonPrimaryText: 'Learn More',
      buttonSecondaryText: 'Contact Us',
    },
    {
      id: 2,
      title: 'Commercial Roll-Off Containers  Scrap Bin Dispatch',
      subtitle:
        '10 to 40-yard heavy-duty steel scrap dumpsters delivered to your fabrication, machining, or demolition site with 24-hour turnaround.',
      image: '/src/assets/images/industrial_scrap_containers_1793892531220.jpg',
      highlightBadge: '24-Hour Logistics  Prompt Container Swap',
      buttonPrimaryText: 'Order Roll-Off Bin',
      buttonSecondaryText: 'View Metal Rates',
    },
    {
      id: 3,
      title: 'Top Dollar Paid for Non-Ferrous Copper  Brass',
      subtitle:
        'Precision handheld XRF alloy spectrometers ensure maximum certified value on bare bright wire, copper pipes, yellow brass, and titanium.',
      image: '/src/assets/images/copper_wire_brass_1793892530421.jpg',
      highlightBadge: 'Instant Cash, Check or Same-Day Wire Payout',
      buttonPrimaryText: 'Check Metal Rates',
      buttonSecondaryText: 'Schedule Drop-off',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance hero slide every 7 seconds
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
      {/* Background Image Carousel with overlay */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-7000 ease-linear"
          />
          {/* Industrial Warm Gradient Overlay matching Screenshot 4 */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/80 via-slate-950/85 to-slate-900/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>
      ))}

      {/* Edge Pinned Previous  Next Tabs (Exact structural reference from Screenshot 4) */}
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

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        {/* Subtle trust badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-400 text-xs font-semibold mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span>{active.highlightBadge}</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight sm:leading-tight lg:leading-tight mb-6 drop-shadow-md">
          {active.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {active.subtitle}
        </p>

        {/* Action Buttons (Matches Screenshot 4: Orange Learn More + Navy Contact Us) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onLearnMore}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-8 py-4 rounded-lg shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>{active.buttonPrimaryText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-auto bg-[#0b1329] hover:bg-slate-900 border border-slate-700 text-white font-semibold text-sm px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>{active.buttonSecondaryText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-400" />
          </button>
        </div>

        {/* Quick Phone Callout */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-300">
          <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
          <span>Instant Industrial Dispatch Hotline: <strong className="text-white font-semibold">{phone}</strong></span>
        </div>

        {/* Slide Indicators for mobile/desktop */}
        <div className="flex items-center gap-2.5 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
