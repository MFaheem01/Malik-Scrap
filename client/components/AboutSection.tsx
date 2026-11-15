'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Scale,
  Truck,
  Coins,
  Zap,
} from 'lucide-react';
import { submitConsultation } from '../lib/api';

interface AboutSectionProps {
  onLearnMoreServices?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMoreServices }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Sell Scrap Metal - Valuation & Offer Request');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Check URL query parameter or hash on mount to pre-fill subject if navigated from services
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const querySubject = params.get('product') || params.get('service') || params.get('subject');
      if (querySubject) {
        setSubject(`Sell Scrap: ${querySubject}`);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim()) {
      setFormError('Please provide your name and phone number.');
      return;
    }

    setSubmitting(true);
    try {
      await submitConsultation({
        name: name.trim(),
        email: email.trim() || 'purchase@malikscrap.com',
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim() || 'Inquiry submitted from homepage contact form.',
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setFormError('Failed to submit consultation. Please try again or call our dispatch hotline.');
    } finally {
      setSubmitting(false);
    }
  };

  const keyStrengths = [
    {
      icon: <Coins className="w-5 h-5 text-orange-600 shrink-0" />,
      title: 'Top Market Cash Payouts',
      description: 'Indexed to daily LME/COMEX rates with zero middleman deductions and same-day payment.',
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-600 shrink-0" />,
      title: 'XRF Spectrometer Assay',
      description: 'Instant handheld elemental grading verifying purity down to 0.01% on-site.',
    },
    {
      icon: <Truck className="w-5 h-5 text-orange-600 shrink-0" />,
      title: 'Free Scrap Bin Placement',
      description: '10 to 40-yard roll-off containers delivered with guaranteed 24-hour container swaps.',
    },
    {
      icon: <Scale className="w-5 h-5 text-orange-600 shrink-0" />,
      title: '100-Ton Weighbridge',
      description: 'Certified digital electronic truck scales with printed receipts and honest tare weights.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-24 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Solid Unified Company Overview (replaces tab sliders) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">


            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                UAE Leading Industrial &amp; Commercial Scrap Metal Buyers
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                For over four decades, Malik Scrap Metal Buyers has been the trusted asset recovery partner for
                machine shops, fabrication yards, construction contractors, and manufacturing plants across Dubai and the UAE.
                We purchase surplus steel, production cutoffs, copper wire, brass valves, aluminum extrusions, and heavy plant machinery
                with transparent certified weighbridge tickets and instant cash or bank wire settlement.
              </p>
            </div>

            {/* Single Solid Well-Designed Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {keyStrengths.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-orange-50/40 hover:border-orange-300 transition-all flex items-start gap-3 shadow-2xs"
                >
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 py-5 border-y border-slate-100 my-2">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 tabular-nums">40+</span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Years in Business</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">150K+</span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Scrap Metals Bought</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">100%</span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Guaranteed Payouts</span>
              </div>
            </div>

            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md shadow-orange-600/20 transition-all cursor-pointer group"
              >
                <span>View All Metals We Purchase</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Contact / Quote Form */}
          <div id="contact-form" className="lg:col-span-5 scroll-mt-28">
            <div className="bg-[#0b1329] rounded-2xl shadow-2xl overflow-hidden border border-slate-800 relative">
              <div className="bg-orange-600 py-4 px-6 text-center relative">
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                  Contact Us for Pickup
                </h3>
              </div>

              <div className="p-6 sm:p-8 pt-7">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Scrap Offer Received!</h4>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you. Our scrap appraisal and logistics team will evaluate your material and contact you promptly with top pricing and pickup arrangements.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Your Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Phone / WhatsApp <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter Your Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">Email</label>
                        <input
                          type="email"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Material Category</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Details &amp; Quantity</label>
                      <textarea
                        rows={3}
                        placeholder="Enter Material Details & Quantity"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-lg shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Sending Scrap Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit message</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
