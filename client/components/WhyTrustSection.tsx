'use client';

import React, { useState } from 'react';
import { Play, Building2, Rocket, Headphones, X, CheckCircle, ChevronRight, Phone } from 'lucide-react';

interface WhyTrustSectionProps {
  onGetSupport: () => void;
  phone: string;
}

export const WhyTrustSection: React.FC<WhyTrustSectionProps> = ({ onGetSupport, phone }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="bg-[#0b1329] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-2xl group min-h-[380px] lg:min-h-[460px] flex items-center justify-center">
            <img
              src="/assets/images/hero_scrap_facility_1793892530533.jpg"
              alt="Industrial Scrap Metal Processing Yard"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-transparent" />

            <button
              onClick={() => setVideoModalOpen(true)}
              className="relative z-10 w-20 h-20 rounded-full bg-orange-600/90 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-600/40 hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
              aria-label="Watch certified weighing and  process"
            >
              <Play className="w-8 h-8 fill-white ml-1 text-white group-hover/btn:scale-110 transition-transform" />
              <span className="absolute -bottom-8 text-xs font-semibold tracking-wider uppercase text-white/90 drop-shadow">
                Watch Yard Tour
              </span>
            </button>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-10">
              Why Trust Our Services
            </h2>

            <div className="relative space-y-8 pl-4">
              <div className="absolute top-6 bottom-6 left-[2.45rem] w-0.5 border-l-2 border-dashed border-slate-700" />

              <div className="relative flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-600/20 z-10 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                    Certified Fair Scale Payouts
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                    NTEP-calibrated digital truck scales and instant handheld XRF spectrometer assays
                    ensure every pound of scrap is graded accurately with zero hidden deductions.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-600/20 z-10 group-hover:scale-105 transition-transform">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                    Fast 24-Hour Container Dispatch
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                    Dedicated roll-off fleet offering 10 to 40-yard scrap dumpsters with prompt same-day
                    or next-morning swap service for fabrication and manufacturing plants.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-600/20 z-10 group-hover:scale-105 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                    Dedicated Account & EPA Compliance
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                    Direct access to experienced commercial account managers who handle manifest documentation,
                    material destruction certificates, and comprehensive environmental compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f05a22] text-white py-6 px-4 sm:px-6 lg:px-8 border-t border-orange-500 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Contact With Us For Customer Support
            </h3>
            <p className="text-sm text-orange-100 font-medium mt-0.5">
              We provide 24/7 hours commercial support and emergency container dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="hidden md:flex items-center gap-2 text-white font-semibold text-sm hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </a>

            <button
              onClick={onGetSupport}
              className="bg-[#0b1329] hover:bg-slate-900 active:bg-black text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>GET SUPPORT</span>
              <span className="font-extrabold text-orange-400 group-hover:translate-x-1 transition-transform">
                »
              </span>
            </button>
          </div>
        </div>
      </div>

      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden max-w-3xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Malik Facility: Weighing & Spectrometry Grading Process</span>
              </h4>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-6 border border-slate-800">
                <img
                  src="/assets/images/copper_wire_brass_1793892530421.jpg"
                  alt="Scrap Processing"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 max-w-lg space-y-3">
                  <div className="w-16 h-16 rounded-full bg-orange-600/90 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <h5 className="text-lg font-bold text-white">
                    Step-by-Step Metal Grading Simulation
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1. Truck enters certified NTEP digital weighbridge. <br />
                    2. Inspector conducts handheld XRF alloy verification. <br />
                    3. Materials unloaded with crane grapple or hydraulic tipper. <br />
                    4. Automated settlement voucher issued instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Certified by NCWM</span>
                <button
                  onClick={() => {
                    setVideoModalOpen(false);
                    onGetSupport();
                  }}
                  className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Yard Visit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

