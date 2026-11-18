'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const visibleCards = 4;
  const total = blogs.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const intervalTime = 3500;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const displayedBlogs = [];
  for (let i = 0; i < Math.min(visibleCards, total); i++) {
    const idx = (startIndex + i) % total;
    if (blogs[idx]) {
      displayedBlogs.push(blogs[idx]);
    }
  }

  return (
    <section
      id="blog"
      className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden select-none border-t border-slate-200/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header following exact Services section layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider block mb-2">
              Industry Advice &amp; Market Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Scrap Selling Guides &amp; Market Insights
            </h2>
          </div>

          <div className="lg:max-w-xl">

            <div className="flex items-center justify-between sm:justify-start gap-6">
              <Link
                href="/blog"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div className="relative">
          {/* Top-right Next/Prev Controls */}
          <div className="absolute -top-16 right-0 hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-xs flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              aria-label="Previous blog slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-xs flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              aria-label="Next blog slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 4-Card Grid matching ServicesSlider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
            {displayedBlogs.map((post, index) => (
              <article
                key={`${post.id}-${index}`}
                className="bg-white rounded-lg border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Header with Badge and Title Overlay */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                    {post.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider block">
                      {post.date}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-1">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <User className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{post.author.split(',')[0]}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors cursor-pointer group/link"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      href="/blog"
                      className="bg-slate-900 hover:bg-orange-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded transition-colors"
                    >
                      Full Article
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Blog Posts Link matching ServicesSlider bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm px-7 py-3.5 rounded-lg shadow-md shadow-orange-600/25 transition-all group"
            >
              <span>View All Blog Posts &amp; Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Reader Modal */}
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
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider block mb-1">
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
                  href="/services"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>Ready to sell scrap? View current prices</span>
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
    </section>
  );
};
