import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Award, ShieldCheck, AlertCircle } from 'lucide-react';
import { submitConsultation } from '../api';

interface AboutSectionProps {
  onLearnMoreServices: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMoreServices }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'mission' | 'support'>('history');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Scrap Metal Consultation  Rate Quote');
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
    } catch (err: any) {
      setFormError('Failed to submit consultation. Please try again or call dispatch.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="about" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Tabs + About Text (Exact layout from Screenshot 1) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tab Pill Buttons (Matches Screenshot 1: Orange active tab, Dark Navy inactive tabs) */}
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2.5 text-sm font-semibold rounded transition-colors cursor-pointer ${activeTab === 'history'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#0b1329] text-white hover:bg-slate-800'
                  }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-2.5 text-sm font-semibold rounded transition-colors cursor-pointer ${activeTab === 'mission'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#0b1329] text-white hover:bg-slate-800'
                  }`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-6 py-2.5 text-sm font-semibold rounded transition-colors cursor-pointer ${activeTab === 'support'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#0b1329] text-white hover:bg-slate-800'
                  }`}
              >
                Support
              </button>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              About Our Company
            </h2>

            {/* Dynamic Content based on active tab */}
            <div className="space-y-4 text-slate-600 leading-relaxed text-base min-h-[190px]">
              {activeTab === 'history'(
                <>
                  <p>
                    Established in 1984, Malik Industries emerged as a powerhouse in the industrial scrap
                    metal reclamation and processing sector. With a commitment to honest digital scale weights,
                    rapid roll-off logistics, and cutting-edge sorting technologies, Malik expanded its
                    operations across the Midwest and beyond.
                  </p>
                  <p>
                    With a rich heritage of over 40 years, our company has evolved from a local metal yard to an
                    acknowledged industry leader, processing over 150,000 metric tons annually. We partner directly
                    with global foundries, domestic steel mills, and precision manufacturers, revolutionizing
                    circular supply chains while championing sustainable scrap diversion.
                  </p>
                </>
              )}

              {activeTab === 'mission'(
                <>
                  <p>
                    Our mission is to lead the circular economy by converting industrial manufacturing waste
                    into high-purity recycled secondary raw materials, drastically reducing greenhouse emissions
                    and virgin ore mining.
                  </p>
                  <p>
                    We guarantee zero hidden fees, verified NTEP weight grading, and transparent market assays.
                    Every pound of scrap recycled through our facilities directly contributes to cleaner air,
                    conserved natural energy, and a resilient industrial future.
                  </p>
                </>
              )}

              {activeTab === 'support'(
                <>
                  <p>
                    We assign dedicated industrial scrap accounts specialists to machine shops, fabrication
                    plants, demolition contractors, and utility companies. From 24-hour container roll-off swaps
                    to on-site scrap shearing, our team operates around the clock.
                  </p>
                  <p>
                    You receive instant itemized settlement sheets, electronic wire transfers or certified checks,
                    and complete hazardous material depollution documentation for full EPA and OSHA audit compliance.
                  </p>
                </>
              )}
            </div>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 my-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-orange-600 tabular-nums">5+</span>
                <span className="text-xs text-slate-500 font-medium">Years in Industry</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">150K+</span>
                <span className="text-xs text-slate-500 font-medium">Tons Recycled / Yr</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">100%</span>
                <span className="text-xs text-slate-500 font-medium">NTEP Certified Scales</span>
              </div>
            </div>

            {/* Read More button (Matches Screenshot 1) */}
            <div>
              <button
                onClick={onLearnMoreServices}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-6 py-3 rounded shadow-md shadow-orange-600/20 transition-all cursor-pointer group"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Free Consultation Card (Exact match of Screenshot 1) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b1329] rounded-lg shadow-2xl overflow-hidden border border-slate-800 relative">
              {/* Header Badge (Matches Screenshot 1 Orange Header with arrow notch) */}
              <div className="bg-orange-600 py-3.5 px-6 text-center relative">
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                  Free Consultation
                </h3>
                {/* Arrow notch pointer */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-orange-600" />
              </div>

              {/* Consultation Form Body */}
              <div className="p-6 sm:p-8 pt-7">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Consultation Request Received!</h4>
                    <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you. Our industrial scrap dispatch team will review your requirements and contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError(
                      <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone No"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject (e.g. Copper Wire, Roll-off Bin, Demolition)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#070d1e] text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3 rounded border border-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        placeholder="Message  Estimated Scrap Tonnage / Type"
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
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Submit Now</span>
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
