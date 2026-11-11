'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '../../client/components/ui/button';
import { Input } from '../../client/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../client/components/ui/card';
import { loginAdmin } from '@/client/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('malik_admin_token') || localStorage.getItem('Malik_admin_token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-white shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="w-14 h-14 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 border border-orange-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            Malik Admin Portal
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Sign in to manage services, blog posts, scrap purchasing prices, contact details, and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Username
              </label>
              <Input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 font-semibold cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Malik Home
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
