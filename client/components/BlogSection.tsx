'use client';

import React, { useState } from 'react';
import { Calendar, User, MessageSquare, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-bold text-orange-600 uppercase tracking-wider block mb-2">
            Industry Advice & Market Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Scrap Selling Guides & Market Insights
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Practical advice on metal segregation, live COMEX/LME market trends, roll-off scrap container
            management, and environmental compliance for industrial manufacturers and scrap sellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer group/link"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
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
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                  {selectedPost.category}
                </span>
                <h3 className="text-2xl font-bold text-white drop-shadow">
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
                <p className="whitespace-pre-line">{selectedPost.content}</p>
              </div>

              <div className="pt-4 flex justify-end border-t border-slate-100">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-sm cursor-pointer"
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
