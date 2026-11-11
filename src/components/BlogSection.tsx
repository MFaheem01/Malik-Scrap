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
        {/* Section Header (Matches Screenshot 3) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Latest Blog
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Expert insights on global metal market fluctuations, scrap grading strategies, industrial container
            management, and environmental regulatory updates for fabricators.
          </p>
        </div>

        {/* Blog Post 3-Column Grid (Matches Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Blog Featured Image */}
              <div className="h-52 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                  {post.category}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Metadata Row (Exact match of Screenshot 3: Date, Admin, Comments) */}
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

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Learn More link with arrow (Matches Screenshot 3) */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Full Reader Modal */}
      {selectedPost(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
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
              {/* Meta bar */}
              <div className="flex items-center gap-6 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span>By <strong className="text-slate-800">{selectedPost.author}</strong></span>
                <span>Published: {selectedPost.date}</span>
                <span>{selectedPost.commentsCount} Comments</span>
              </div>

              {/* Full Content */}
              <div className="text-slate-700 leading-relaxed text-sm space-y-4">
                <p className="text-base font-medium text-slate-900 border-l-2 border-orange-500 pl-4 py-1 italic bg-orange-50/50">
                  {selectedPost.excerpt}
                </p>
                <p>{selectedPost.content}</p>
                <p>
                  Industrial  efficiency relies on clear operational workflows. When commercial facilities
                  segregate non-ferrous alloys from structural steel before container collection, their realized revenue
                  increases substantially. Malik provides custom container labeling, color-coded bins, and on-site
                  spectrometer analysis to eliminate guesswork.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end border-t border-slate-100">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs cursor-pointer transition-colors"
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
