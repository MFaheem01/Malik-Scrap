'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  ArrowRight,
  X,
  BookOpen,
  Phone,
  Sparkles,
  Scale,
  Search,
} from 'lucide-react';
import { TopBar } from '@/client/components/TopBar';
import { Navbar } from '@/client/components/Navbar';
import { Footer } from '@/client/components/Footer';
import { WhatsAppButton } from '@/client/components/WhatsAppButton';
import { fetchContactInfo, fetchBlogs } from '@/client/lib/api';
import { BlogPost, ContactInfo } from '@/client/types';
import { defaultContact, fallbackBlogs } from '@/client/lib/fallbackData';

export default function BlogPage() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    Promise.all([
      fetchContactInfo().catch(() => defaultContact),
      fetchBlogs().catch(() => fallbackBlogs),
    ]).then(([c, b]) => {
      if (c && c.companyName) setContact(c);
      if (b && b.length > 0) setBlogs(b);
    });
  }, []);

  const filteredBlogs = blogs.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.content && post.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
      {/* 1. Top Bar */}
      <TopBar contact={contact} />

      {/* 2. Main Navbar */}
      <Navbar contact={contact} activeSection="blog" />

      <main className="flex-1">
        {/* Hero Section — Layout matching Services page */}
        <section className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/70 via-slate-950/90 to-slate-900/95" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Scrap Metal Selling Guides &amp; Market Insights</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Scrap Industry Guides &amp; Metal Market News
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Expert articles on metal sorting, copper wire stripping, COMEX and LME market trends,
                demolition salvage, and environmental compliance for industrial sellers across Dubai and the UAE.
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

        {/* All Blogs Grid Section (Displayed in the exact same way as Services) */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Transparent Industry Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                All Scrap Selling Guides &amp; Articles
              </h2>
            </div>

            {/* Optional live search bar */}

          </div>

          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-lg font-bold text-slate-800">No articles found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No articles matched your search query. Try clearing the search bar.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Image container matching Services cards */}
                  <div className="h-56 w-full relative overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/blog-scrap-pricing-guide.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-orange-300 uppercase tracking-wider mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-400" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-orange-400" />
                          {post.author.split(',')[0]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white drop-shadow-xs leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content body matching Services cards */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="p-3 bg-orange-50 border border-orange-200/80 rounded-lg flex items-start gap-2.5 text-xs text-orange-900 font-medium">
                        <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          {post.author} provides practical metal recovery and segregation guidelines.
                        </span>
                      </div>
                    </div>

                    {/* Action button matching Services "Sell This Product" style */}
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="w-full bg-slate-900 hover:bg-orange-600 text-white font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group/btn"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Free Container & Weighbridge Banner matching Services page */}
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
                Request Free Scrap Bin
              </Link>
              <Link
                href="/#location"
                className="bg-orange-800/80 hover:bg-orange-900 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-lg border border-orange-500/50 transition-all text-center flex items-center justify-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>Visit Yard Weighbridge</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Sell Scrap CTA Section */}
        <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block">
              Turn Knowledge Into Immediate Liquidity
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Have Scrap Metal Ready to Sell?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              Get an instant valuation on your copper, steel, aluminum, brass, or industrial machinery scrap.
              Free containers and fast digital payout across Dubai and UAE.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/services"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-lg shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>View All Scrap Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#about"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-lg border border-slate-700 transition-all text-center"
              >
                Request Free Material Valuation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
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
                  Scrap Selling Guide
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white drop-shadow leading-snug">
                  {selectedPost.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-6 text-xs text-slate-500 pb-4 border-b border-slate-100 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>{selectedPost.author}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-4">
                {selectedPost.content ? (
                  selectedPost.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed text-sm">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {selectedPost.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/?product=Material%20Valuation#about"
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs px-5 py-3 rounded-lg shadow-md transition-all cursor-pointer"
                >
                  <span>Sell Scrap Mentioned in This Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Footer */}
      <Footer
        contact={contact}
        onRequestQuote={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 11. Floating WhatsApp Button */}
      <WhatsAppButton phone={contact.dispatchPhone || contact.phone} />
    </div>
  );
}
