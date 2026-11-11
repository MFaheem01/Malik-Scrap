'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitConsultation } from '../lib/api';

interface AboutSectionProps {
  onLearnMoreServices: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMoreServices }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'mission' | 'support'>('history');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Sell Scrap Metal - Valuation & Offer Request');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !email.trim()) {
      setFormError('Please provide your name and email address.');
      return;
    }

    setSubmitting(true);
    try {
      await submitConsultation({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setFormError('Failed to submit consultation. Please try again or call dispatch.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="about" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
              {(['history', 'mission', 'support'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-sm font-semibold rounded capitalize transition-colors cursor-pointer ${activeTab === tab
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-[#0b1329] text-white hover:bg-slate-800'
                    }`}
                >
                  {tab === 'history' ? 'Our Background' : tab === 'mission' ? 'Why Sell To Us' : 'Pickup & Logistics'}
                </button>
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Trusted Scrap Metal Buyers Since 1984
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-base min-h-[190px]">
              {activeTab === 'history' && (
                <>
                  <p>
                    Established over four decades ago, Malik Scrap Metal Buyers has grown into one of the region's
                    largest licensed industrial scrap purchasing operations. We purchase surplus steel, production
                    offcuts, copper cables, brass components, and machinery from manufacturers, fabricators, and demolition
                    contractors.
                  </p>
                  <p>
                    With honest digital weighbridge weighing, rapid roll-off bin placement, and instant settlement,
                    we buy over 150,000 metric tons of ferrous and non-ferrous scrap annually with direct mill pricing.
                  </p>
                </>
              )}

              {activeTab === 'mission' && (
                <>
                  <p>
                    Our purchasing model is built on transparency: zero hidden deductions, calibrated certified truck
                    scales, and handheld XRF alloy testing so you get paid the exact market value for every kilogram of
                    metal.
                  </p>
                  <p>
                    Whether you have 500 kg of copper tubing or 500 tons of demolition I-beams, we provide instant
                    settlement via certified bank transfer, company check, or cash on delivery.
                  </p>
                </>
              )}

              {activeTab === 'support' && (
                <>
                  <p>
                    We provide machine shops, CNC plants, fabrication yards, and construction sites with complimentary
                    heavy-duty roll-off scrap dumpsters. When your container is ready, our dispatch team swaps it within
                    24 hours.
                  </p>
                  <p>
                    For larger plant clearing or structural dismantling, our licensed heavy rigging and torch-cutting
                    teams handle full on-site loading and transport, leaving your yard clean and compliant.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 my-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-orange-600 tabular-nums">5+</span>
                <span className="text-xs text-slate-500 font-medium">Years Buying Scrap</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">150K+</span>
                <span className="text-xs text-slate-500 font-medium">Tons Bought Annually</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">100%</span>
                <span className="text-xs text-slate-500 font-medium">Certified Digital Scales</span>
              </div>
            </div>

            <div>
              <button
                onClick={onLearnMoreServices}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-6 py-3 rounded shadow-md shadow-orange-600/20 transition-all cursor-pointer group"
              >
                <span>View All Metals We Buy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0b1329] rounded-lg shadow-2xl overflow-hidden border border-slate-800 relative">
              <div className="bg-orange-600 py-3.5 px-6 text-center relative">
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                  Sell Your Scrap — Instant Quote
                </h3>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-orange-600" />
              </div>

              <div className="p-6 sm:p-8 pt-7">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Scrap Offer Received!</h4>
                    <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you. Our scrap appraisal and logistics team will evaluate your material and contact you promptly with top pricing and pickup arrangements.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                    >
                      Submit Another Scrap Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        placeholder="Your Name / Company Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Scrap Type (e.g. Copper Wire, Steel Beams, Brass, Demolition)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        placeholder="Estimated Quantity (kg/tons), Location & Pickup Requirements"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-8 py-3 rounded transition-all shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Calculating Quote...</span>
                        ) : (
                          <>
                            <span>Request Scrap Purchase Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
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
