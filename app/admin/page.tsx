'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../../client/components/ui/button';
import { Input } from '../../client/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../client/components/ui/card';
import { loginAdmin } from '@/client/lib/api';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTimeout = searchParams.get('timeout') === 'true';

  // Empty by default as requested
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If not timed out, check existing token
    if (!isTimeout) {
      const token = localStorage.getItem('malik_admin_token') || localStorage.getItem('Malik_admin_token');
      if (token) {
        router.push('/admin/dashboard');
      }
    }
  }, [router, isTimeout]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdmin(username, password);
      if (res.success && res.token) {
        localStorage.setItem('malik_admin_token', res.token);
        localStorage.setItem('Malik_admin_token', res.token);
        localStorage.setItem('malik_admin_user', res.username || username);
        // Track login time for session timeout
        localStorage.setItem('malik_session_start', Date.now().toString());
        router.push('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid username or password');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-white shadow-2xl">
      <CardHeader className="text-center space-y-3">
        <div className="flex justify-center mb-1">
          <Link href="/" className="inline-block">
            <Image
              src="/assets/images/Footer-logo.png"
              alt="Malik Scrap Metal Buyers"
              width={190}
              height={50}
              priority
              className="h-11 w-auto object-contain mx-auto filter drop-shadow"
            />
          </Link>
        </div>

        <div className="w-12 h-12 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center mx-auto border border-orange-500/30">
          <Shield className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold text-white tracking-tight">
          Malik Admin Portal
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Sign in to manage services, blog posts, scrap purchasing prices, contact details, and location
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isTimeout && (
          <div className="p-3 bg-amber-950/80 border border-amber-800 text-amber-200 text-xs rounded mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Your administrative session has timed out due to inactivity. Please sign in again.</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter admin username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter admin password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 font-semibold cursor-pointer transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Malik Home
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <Suspense fallback={<div className="text-white text-sm">Loading admin portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
