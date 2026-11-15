'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/blog');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-sm">
      Redirecting to scrap selling blog...
    </div>
  );
}
