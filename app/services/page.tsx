'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  Scale,
  Sparkles,
  HelpCircle,
  Calendar,
  User,
  MessageSquare,
  X,
  BookOpen,
} from 'lucide-react';
import { TopBar } from '@/client/components/TopBar';
import { Navbar } from '@/client/components/Navbar';
import { Footer } from '@/client/components/Footer';
import { WhatsAppButton } from '@/client/components/WhatsAppButton';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/client/components/ui/accordion';
import { fetchContactInfo, fetchServices, fetchBlogs } from '@/client/lib/api';
import { ServiceItem, BlogPost, ContactInfo } from '@/client/types';

import {
  defaultContact,
  fallbackServices,
  fallbackBlogs,
} from '@/client/lib/fallbackData';

const faqs = [
  {
    id: 'faq-1',
    question: 'How do you calculate the price for my scrap metal?',
    answer:
      'Our purchasing rates are linked directly to daily London Metal Exchange (LME) and COMEX spot markets, ensuring you receive the highest live market value. For non-ferrous metals like copper, brass, and alloys, we use calibrated handheld XRF spectrometers on-site to verify purity down to 0.01%, eliminating guesswork and protecting you from unfair tare deductions.',
  },
  {
    id: 'faq-2',
    question: 'Do you provide free scrap containers and on-site collection?',
    answer:
      'Yes! We provide complimentary 10, 20, 30, and 40-yard heavy-duty roll-off scrap bins directly to manufacturing facilities, fabrication workshops, construction projects, and demolition jobs across Dubai and the UAE. There are zero rental or delivery charges. When your container is full, simply call our dispatch line for a guaranteed 24-hour swap or pickup.',
  },
  {
    id: 'faq-3',
    question: 'What documentation or licenses are required to sell scrap metal in the UAE?',
    answer:
      'As a fully licensed and compliant scrap merchant, commercial sellers must provide a valid UAE Trade License copy and an authorized representative ID (Emirates ID or passport). For demolition or plant clearance scrap, a municipal NOC or clearance permit is typically included. We handle all environmental waste transfer manifests in full alignment with Dubai Municipality requirements.',
  },
  {
    id: 'faq-4',
    question: 'How quickly will I receive payment after my scrap is weighed?',
    answer:
      'We believe in immediate liquidity for our sellers. As soon as your scrap passes our certified electronic weighbridge and the printed scale ticket is issued, payment is executed immediately via instant bank wire transfer, corporate cheque, or cash settlement based on your preference.',
  },
  {
    id: 'faq-5',
    question: 'What is the minimum quantity of scrap metal you purchase?',
    answer:
      'We accommodate both small workshop batches and large multi-ton commercial consignments. For non-ferrous metals such as copper wire or brass valves, we accept quantities starting from 50 kg for direct yard drop-offs. For on-site container placement and flatbed dispatch, we typically require 1 to 2 metric tons minimum.',
  },
  {
    id: 'faq-6',
    question: 'Can I drop off scrap metal directly at your Dubai yard?',
    answer:
      'Absolutely. Our central scrap receiving yard in Dubai Industrial City (Phase 2) features a certified 100-ton digital weighbridge with dedicated multi-lane truck access. Sellers and contractors are welcome 24 hours a day, 7 days a week for immediate weighing and settlement.',
  },
  {
    id: 'faq-7',
    question: 'Do you buy contaminated, insulated, or mixed metal scrap?',
    answer:
      'Yes, we purchase insulated electrical cables, transformers, dirty aluminum castings, automotive engines with oil pans, and mixed demolition steel. We evaluate the recoverable metal percentage using standard recovery assays and make a fair, transparent offer so you don’t have to waste labor stripping or cleaning materials yourself.',
  },
  {
    id: 'faq-8',
    question: 'How do you handle hazardous materials such as industrial batteries?',
    answer:
      'We are EPA-approved and municipal-certified for hazardous lead-acid battery recycling. We provide acid-resistant spill containers and hazardous transport manifests for industrial telecom UPS batteries, forklift traction cells, and automotive batteries, ensuring 99% closed-loop lead and acid recovery.',
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    Promise.all([
      fetchContactInfo().catch(() => defaultContact),
      fetchServices().catch(() => fallbackServices),
      fetchBlogs().catch(() => []),
    ]).then(([c, s, b]) => {
      if (c) setContact(c);
      if (s && s.length > 0) setServices(s);
      if (b && b.length > 0) setBlogs(b);
    });
  }, []);

  // When user clicks "Sell This Product", redirect to homepage contact form
  const handleSellProduct = (serviceTitle: string) => {
    router.push(`/?product=${encodeURIComponent(serviceTitle)}#about`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
      {/* 1. Top Bar */}
      <TopBar contact={contact} />

      {/* 2. Main Navbar */}
      <Navbar contact={contact} activeSection="services" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/70 via-slate-950/90 to-slate-900/95" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Certified Industrial &amp; Commercial Scrap Metal Buyers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Scrap Metals We Purchase at Top Cash Rates
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                We purchase all volumes of ferrous and non-ferrous scrap metal across Dubai and the UAE.
                Benefit from certified digital weighbridge scale grading, instant XRF purity assay testing,
                free roll-off scrap container placement, and prompt payment settlement.
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center sm:text-left space-y-3 shrink-0 shadow-xl w-full sm:w-auto">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Immediate Dispatch Hotline
              </span>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className="text-xl sm:text-2xl font-black text-orange-500 hover:text-orange-400 transition-colors flex items-center justify-center sm:justify-start gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>{contact.phone}</span>
              </a>
              <span className="text-xs text-slate-400 block">
                24/7 Weighbridge &amp; Roll-Off Placement
              </span>
            </div>
          </div>
        </section>

        {/* All Services Grid Section (Without category filter buttons) */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Transparent Purchasing Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                All Scrap Purchasing Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Browse all materials we purchase. Click &ldquo;Sell This Product&rdquo; on any item to get an instant valuation offer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-56 w-full relative overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/service-copper-wire.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {service.badge && (
                    <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                      {service.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-semibold text-orange-300 uppercase tracking-wider block">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-white drop-shadow-xs leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description || service.shortDesc}
                    </p>

                    {service.highlight && (
                      <div className="p-3 bg-orange-50 border border-orange-200/80 rounded-lg flex items-start gap-2.5 text-xs text-orange-900 font-medium">
                        <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span>{service.highlight}</span>
                      </div>
                    )}
                  </div>

                  {/* "Sell This Product" redirects to homepage contact form */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleSellProduct(service.title)}
                      className="w-full bg-slate-900 hover:bg-orange-600 text-white font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group/btn"
                    >
                      <span>Sell This Product</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Container & Weighbridge Banner */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
                Turnkey Scrap Removal
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Need a Roll-Off Scrap Container at Your Facility?
              </h3>
              <p className="text-sm text-orange-100 max-w-xl">
                We supply 10, 20, 30, and 40-yard scrap bins free of charge with scheduled collection or on-call swaps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/?product=Free%20Container%20Placement#about"
                className="bg-white text-orange-600 hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-lg transition-all cursor-pointer text-center"
              >
                Send message
              </Link>
              <Link
                href="/#location"
                className="bg-orange-800/80 hover:bg-orange-900 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-lg border border-orange-500/50 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Visit Our Scrap Yard</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-orange-600" />
              <span>Got Questions? We Have Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about scrap metal grading, certified weighbridge payouts,
              free container placement, and municipal compliance in the UAE.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-slate-900 font-bold text-base hover:text-orange-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* BLOG POSTS SECTION ON SERVICES PAGE */}
        {blogs.length > 0 && (
          <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                    Knowledge &amp; Market Insights
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Scrap Selling Guides &amp; Industry Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
                >
                  <span>Explore All Blog Guides</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.slice(0, 6).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                  >
                    <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/blog-scrap-pricing-guide.jpg';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-orange-500" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-orange-500" />
                            <span>{post.author.split(',')[0]}</span>
                          </div>
                        </div>

                        <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer group/read"
                        >
                          <span>Read Full Guide</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/read:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Reader Modal for Blogs */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/blog-scrap-pricing-guide.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow">
                  {selectedPost.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span>{selectedPost.author}</span>
                </div>
              </div>

              <div className="text-slate-700 leading-relaxed text-sm space-y-4">
                <p className="font-semibold text-slate-900 text-base">{selectedPost.excerpt}</p>
                <div className="whitespace-pre-line leading-relaxed">{selectedPost.content}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <Link
                  href="/#about"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>Ready to sell scrap? Submit details for instant valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-xs cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        contact={contact}
        onRequestQuote={() => router.push('/#about')}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton phone={contact.dispatchPhone || contact.phone} />
    </div>
  );
}
