'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Layers,
  BookOpen,
  Phone,
  Inbox,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  KeyRound,
  ExternalLink,
  MapPin,
  Upload,
  Coins,
  Copy,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Navigation,
} from 'lucide-react';
import { Button } from '../../../client/components/ui/button';
import { Input } from '../../../client/components/ui/input';
import { Textarea } from '../../../client/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../client/components/ui/card';
import { Badge } from '../../../client/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../client/components/ui/table';
import {
  fetchContactInfo,
  updateContactInfo,
  fetchServices,
  createService,
  updateService,
  deleteService,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchPrices,
  updatePrices,
  fetchConsultations,
  updateConsultationStatus,
  updateAdminCredentials,
  uploadImage,
} from '@/client/lib/api';
import { ServiceItem, BlogPost, ContactInfo, ConsultationLead, ScrapPrice } from '@/client/types';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'prices' | 'blogs' | 'media' | 'contact' | 'leads' | 'security'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [prices, setPrices] = useState<ScrapPrice[]>([]);
  const [consultations, setConsultations] = useState<ConsultationLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = useCallback(async () => {
    try {
      const [c, s, b, p, leads] = await Promise.all([
        fetchContactInfo().catch(() => null),
        fetchServices().catch(() => []),
        fetchBlogs().catch(() => []),
        fetchPrices().catch(() => []),
        fetchConsultations().catch(() => []),
      ]);
      if (c) setContact(c);
      setServices(s);
      setBlogs(b);
      setPrices(p);
      setConsultations(leads);
    } catch {
      showToast('Error loading backend data from MongoDB');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('malik_admin_token') || localStorage.getItem('Malik_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadAllData();
  }, [router, loadAllData]);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out of the admin panel?')) {
      localStorage.removeItem('malik_admin_token');
      localStorage.removeItem('Malik_admin_token');
      localStorage.removeItem('malik_admin_user');
      router.push('/admin');
    }
  };

  // --- Services Management ---
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [serviceUploading, setServiceUploading] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    title: '',
    category: 'Ferrous Scrap',
    shortDesc: '',
    description: '',
    icon: 'Hammer',
    image: '/assets/images/ferrous_steel_re.jpg',
    badge: 'We Buy',
    highlight: '',
  });

  const handleServiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setServiceUploading(true);
    try {
      const res = await uploadImage(file);
      if (res.url) {
        setServiceForm((prev) => ({ ...prev, image: res.url }));
        showToast('Image uploaded successfully via UploadThing!');
      }
    } catch (err: any) {
      showToast(err.message || 'Image upload failed');
    } finally {
      setServiceUploading(false);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreatingService) {
        await createService(serviceForm as Omit<ServiceItem, 'id'>);
        showToast('Scrap purchase service added');
      } else if (editingService) {
        await updateService(editingService.id, serviceForm);
        showToast('Scrap purchase service updated');
      }
      setIsCreatingService(false);
      setEditingService(null);
      await loadAllData();
    } catch {
      showToast('Error saving service');
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      await deleteService(id);
      showToast('Service removed from database');
      await loadAllData();
    }
  };

  // --- Blogs Management ---
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogUploading, setBlogUploading] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Malik Scrap Appraiser',
    category: 'Selling Guide',
    image: '/assets/images/copper_wire_brass_1793892530421.jpg',
  });

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBlogUploading(true);
    try {
      const res = await uploadImage(file);
      if (res.url) {
        setBlogForm((prev) => ({ ...prev, image: res.url }));
        showToast('Blog image uploaded via UploadThing!');
      }
    } catch (err: any) {
      showToast(err.message || 'Image upload failed');
    } finally {
      setBlogUploading(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreatingBlog) {
        await createBlog(blogForm);
        showToast('Scrap selling guide published');
      } else if (editingBlog) {
        await updateBlog(editingBlog.id, blogForm);
        showToast('Article updated');
      }
      setIsCreatingBlog(false);
      setEditingBlog(null);
      await loadAllData();
    } catch {
      showToast('Error saving blog article');
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      await deleteBlog(id);
      showToast('Article deleted');
      await loadAllData();
    }
  };

  // --- Prices Management ---
  const [pricesList, setPricesList] = useState<ScrapPrice[]>([]);
  const [isSavingPrices, setIsSavingPrices] = useState(false);

  useEffect(() => {
    if (prices) setPricesList(prices);
  }, [prices]);

  const handlePriceChange = (index: number, field: keyof ScrapPrice, value: string) => {
    const updated = [...pricesList];
    updated[index] = { ...updated[index], [field]: value };
    setPricesList(updated);
  };

  const handleAddPriceRow = () => {
    setPricesList([
      ...pricesList,
      { metal: 'New Metal Item', price: '0.00 AED', unit: 'per kg', trend: 'stable', change: '0.00' },
    ]);
  };

  const handleRemovePriceRow = (index: number) => {
    setPricesList(pricesList.filter((_, i) => i !== index));
  };

  const handleSavePrices = async () => {
    setIsSavingPrices(true);
    try {
      await updatePrices(pricesList);
      showToast('Scrap purchasing rates updated in MongoDB!');
      await loadAllData();
    } catch {
      showToast('Failed to update scrap prices');
    } finally {
      setIsSavingPrices(false);
    }
  };

  // --- Contact & Location Settings ---
  const [contactFormData, setContactFormData] = useState<Partial<ContactInfo>>({});

  useEffect(() => {
    if (contact) setContactFormData(contact);
  }, [contact]);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactInfo(contactFormData);
      showToast('Contact and location details saved to MongoDB');
      await loadAllData();
    } catch {
      showToast('Failed to update contact info');
    }
  };

  // --- UploadThing Media Hub ---
  const [uploadedMediaList, setUploadedMediaList] = useState<Array<{ url: string; name: string }>>([
    { url: '/assets/images/copper_wire_brass_1793892530421.jpg', name: 'copper_wire_brass.jpg' },
    { url: '/assets/images/ferrous_steel_re.jpg', name: 'ferrous_steel_re.jpg' },
    { url: '/assets/images/industrial_scrap_containers_1793892531220.jpg', name: 'industrial_containers.jpg' },
    { url: '/assets/images/hero_scrap_facility_1793892530533.jpg', name: 'hero_scrap_facility.jpg' },
  ]);
  const [isMediaUploading, setIsMediaUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleMediaHubUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsMediaUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const res = await uploadImage(files[i]);
        if (res.url) {
          setUploadedMediaList((prev) => [{ url: res.url, name: res.name || files[i].name }, ...prev]);
        }
      }
      showToast('UploadThing image upload complete!');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed');
    } finally {
      setIsMediaUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToast('Image URL copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // --- Security / Password ---
  const [currentPass, setCurrentPass] = useState('');
  const [newUsername, setNewUsername] = useState('admin');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [secError, setSecError] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecError('');

    if (newPass && newPass !== confirmPass) {
      setSecError('New passwords do not match');
      return;
    }

    try {
      const res = await updateAdminCredentials(currentPass, newUsername, newPass);
      if (res.success) {
        showToast('Admin credentials updated successfully in MongoDB');
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setSecError(res.message || 'Failed to update credentials');
      }
    } catch {
      setSecError('Server connection error');
    }
  };

  // --- Lead status update ---
  const handleLeadStatusChange = async (id: string, status: string) => {
    await updateConsultationStatus(id, status);
    showToast(`Inquiry status updated to ${status}`);
    await loadAllData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-semibold text-sm">Connecting to MongoDB & Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      {/* Top Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">Malik Scrap Metal Buyers</h1>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MongoDB Atlas Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Admin Portal: Manage Scrap Purchasing Services, Buying Rates, Location & Inquiries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadAllData()}
            title="Refresh database records"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View customer-facing website in new tab"
            className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 bg-orange-950/60 border border-orange-800/80 px-3.5 py-2 rounded transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs cursor-pointer"
            title="Securely sign out of administrative session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="cursor-pointer text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav with descriptive icons & badges */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1.5 shrink-0">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'overview' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'services' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>Scrap We Buy</span>
            </div>
            <Badge variant={activeTab === 'services' ? 'secondary' : 'outline'}>{services.length}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'prices' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Coins className="w-4 h-4" />
              <span>Buying Rates</span>
            </div>
            <Badge variant="orange">{pricesList.length}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'media' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Upload className="w-4 h-4" />
              <span>UploadThing Media</span>
            </div>
            <Badge variant="secondary">CDN</Badge>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'blogs' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Scrap Selling Guides</span>
            </div>
            <Badge variant={activeTab === 'blogs' ? 'secondary' : 'outline'}>{blogs.length}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'contact' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Yard Map & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
              activeTab === 'leads' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Scrap Offers & Leads</span>
            </div>
            <Badge variant="orange">{consultations.length}</Badge>
          </button>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer text-left transition-all ${
                activeTab === 'security' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Admin Credentials</span>
            </button>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">System Dashboard Overview</h2>
                <p className="text-xs text-slate-500">
                  Real-time status of scrap purchasing services, live metal rates, and seller inquiries
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-slate-500">Scrap We Buy</CardTitle>
                    <Layers className="w-4 h-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">{services.length}</div>
                    <p className="text-[11px] text-emerald-600 font-medium">Active categories on homepage</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-slate-500">Buying Rates</CardTitle>
                    <Coins className="w-4 h-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">{pricesList.length}</div>
                    <p className="text-[11px] text-slate-500 font-medium">Daily metal purchase rates</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-slate-500">Seller Inquiries</CardTitle>
                    <Inbox className="w-4 h-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{consultations.length}</div>
                    <p className="text-[11px] text-orange-600 font-medium">Total scrap quote requests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-slate-500">Database Storage</CardTitle>
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold text-slate-900">MongoDB Atlas</div>
                    <p className="text-[11px] text-emerald-600 font-medium">Cloud Collections Synchronized</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Quick Management Actions</CardTitle>
                  <CardDescription className="text-xs">Direct shortcuts for frequent operations</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Button
                    onClick={() => {
                      setActiveTab('services');
                      setIsCreatingService(true);
                    }}
                    className="flex flex-col items-center justify-center h-20 text-xs gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Scrap Category</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab('prices')}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 text-xs gap-1.5 cursor-pointer"
                  >
                    <Coins className="w-4 h-4 text-orange-600" />
                    <span>Update Buying Rates</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab('media')}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 text-xs gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-orange-600" />
                    <span>UploadThing Uploader</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab('contact')}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 text-xs gap-1.5 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>Yard Map Preview</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Inquiries Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Recent Customer Scrap Offers</CardTitle>
                  <CardDescription className="text-xs">Latest submissions from potential scrap sellers</CardDescription>
                </CardHeader>
                <CardContent>
                  {consultations.length === 0 ? (
                    <p className="text-xs text-slate-400">No seller inquiries yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {consultations.slice(0, 4).map((c) => (
                        <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-semibold text-xs text-slate-900">{c.name} — <span className="text-orange-600">{c.email}</span> ({c.phone || 'No phone'})</div>
                            <div className="text-xs text-slate-600 mt-0.5">{c.subject}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-xl">{c.message}</div>
                          </div>
                          <Badge variant="orange">{c.status}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: SERVICES (SCRAP WE BUY) */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Scrap Metal Categories We Purchase</h2>
                  <p className="text-xs text-slate-500">Add, edit, or remove metal scrap items purchased by Malik</p>
                </div>
                <Button
                  onClick={() => {
                    setIsCreatingService(true);
                    setEditingService(null);
                    setServiceForm({
                      title: '',
                      category: 'Ferrous Scrap',
                      shortDesc: '',
                      description: '',
                      icon: 'Hammer',
                      image: '/assets/images/ferrous_steel_re.jpg',
                      badge: 'We Buy',
                      highlight: '',
                    });
                  }}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Scrap Service</span>
                </Button>
              </div>

              {/* Form Modal/Card */}
              {(isCreatingService || editingService) && (
                <Card className="border-orange-300 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-3 bg-orange-50/50 rounded-t-lg">
                    <div>
                      <CardTitle className="text-sm font-bold text-slate-900">
                        {isCreatingService ? 'Add New Scrap Purchasing Service' : `Edit: ${editingService?.title}`}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Enter material details, payout highlights, and upload photos via UploadThing
                      </CardDescription>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingService(false);
                        setEditingService(null);
                      }}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Cancel and close form"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <form onSubmit={handleSaveService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Service Title (e.g. We Buy Copper Wire & Tubing)
                        </label>
                        <Input
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          required
                          placeholder="e.g. We Buy Industrial HMS Steel"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Category Name
                        </label>
                        <Input
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                          required
                          placeholder="e.g. Ferrous Scrap, Non-Ferrous, Industrial Dismantling"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Badge Label
                        </label>
                        <Input
                          value={serviceForm.badge || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                          placeholder="e.g. Highest Payout, Free Bin, Immediate Cash"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Price Highlight / Payout Guarantee
                        </label>
                        <Input
                          value={serviceForm.highlight || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, highlight: e.target.value })}
                          placeholder="e.g. Top cash payout per ton with free transport"
                        />
                      </div>

                      {/* UploadThing Image Uploader */}
                      <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Scrap Photo (Powered by UploadThing)</span>
                          <span className="text-[11px] font-normal text-slate-500">Upload new image or keep existing</span>
                        </label>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleServiceImageUpload}
                            disabled={serviceUploading}
                            className="bg-white text-xs file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                          />
                          {serviceUploading && (
                            <span className="text-xs text-orange-600 font-semibold animate-pulse flex items-center gap-1">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to UploadThing...
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Current Image URL:</span>
                          <Input
                            value={serviceForm.image || ''}
                            onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                            className="text-xs bg-white h-8"
                            placeholder="https://..."
                          />
                          {serviceForm.image && (
                            <img
                              src={serviceForm.image}
                              alt="preview"
                              className="w-10 h-10 object-cover rounded border border-slate-300 shrink-0"
                            />
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Short Description (shows in service cards)
                        </label>
                        <Input
                          value={serviceForm.shortDesc}
                          onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                          required
                          placeholder="Brief 1-2 sentence description of metals accepted"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Full Description & Payout Details
                        </label>
                        <Textarea
                          rows={3}
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          placeholder="Detailed overview of grading, weighing, pickup logistics, and payment terms"
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreatingService(false);
                            setEditingService(null);
                          }}
                          className="cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                          <Save className="w-4 h-4 mr-1.5" />
                          <span>Save Service to MongoDB</span>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Table of active services */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Preview</TableHead>
                      <TableHead>Service Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-12 h-10 object-cover rounded border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-xs text-slate-900">{s.title}</div>
                          <div className="text-[11px] text-slate-500 max-w-md truncate">{s.shortDesc}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{s.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {s.badge ? <Badge variant="orange">{s.badge}</Badge> : '-'}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingService(s);
                              setIsCreatingService(false);
                              setServiceForm(s);
                            }}
                            className="text-xs cursor-pointer"
                            title="Edit this scrap purchasing service"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                            onClick={() => handleDeleteService(s.id, s.title)}
                            title="Delete this scrap service permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* TAB 3: SCRAP BUYING PRICES */}
          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Current Scrap Purchasing Rates</h2>
                  <p className="text-xs text-slate-500">
                    Live daily prices Malik Scrap pays to sellers (AED per kg or ton)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAddPriceRow}
                    className="flex items-center gap-1.5 cursor-pointer text-xs"
                    title="Add a new metal row to price list"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Metal Item</span>
                  </Button>
                  <Button
                    onClick={handleSavePrices}
                    disabled={isSavingPrices}
                    className="flex items-center gap-1.5 cursor-pointer text-xs"
                    title="Save all price modifications to MongoDB"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingPrices ? 'Saving...' : 'Save All Prices'}</span>
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Metal Type / Grade</TableHead>
                      <TableHead>Buying Price</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Market Trend</TableHead>
                      <TableHead>Daily Change</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricesList.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Input
                            value={row.metal}
                            onChange={(e) => handlePriceChange(idx, 'metal', e.target.value)}
                            className="text-xs font-semibold"
                            placeholder="e.g. Bare Bright Copper Wire"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={row.price}
                            onChange={(e) => handlePriceChange(idx, 'price', e.target.value)}
                            className="text-xs text-orange-600 font-bold"
                            placeholder="e.g. 34.50 AED"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={row.unit}
                            onChange={(e) => handlePriceChange(idx, 'unit', e.target.value)}
                            className="text-xs"
                            placeholder="per kg or per ton"
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            value={row.trend}
                            onChange={(e) => handlePriceChange(idx, 'trend', e.target.value as any)}
                            className="text-xs p-1.5 border border-slate-300 rounded bg-white"
                          >
                            <option value="up">Trending Up (▲)</option>
                            <option value="stable">Stable (—)</option>
                            <option value="down">Trending Down (▼)</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={row.change}
                            onChange={(e) => handlePriceChange(idx, 'change', e.target.value)}
                            className="text-xs"
                            placeholder="+0.50"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 cursor-pointer text-xs"
                            onClick={() => handleRemovePriceRow(idx)}
                            title="Remove this metal item from the table"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                  <span>Changes apply across all live price displays on the website upon clicking Save.</span>
                  <Button onClick={handleSavePrices} disabled={isSavingPrices} size="sm" className="cursor-pointer">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    <span>Save All Prices</span>
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 4: UPLOADTHING MEDIA HUB */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">UploadThing Image Media Center</h2>
                <p className="text-xs text-slate-500">
                  Upload high-resolution scrap photos directly to UploadThing CDN and copy image URLs for services and blogs
                </p>
              </div>

              {/* Upload Box */}
              <Card className="border-2 border-dashed border-orange-300 bg-orange-50/20">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-full flex items-center justify-center mx-auto border border-orange-200">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Upload Images to UploadThing CDN</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Select JPG, PNG, WEBP files up to 8MB. Images are hosted securely on UploadThing high-speed edge servers.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{isMediaUploading ? 'Uploading to UploadThing...' : 'Browse & Upload Images'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMediaHubUpload}
                        disabled={isMediaUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {isMediaUploading && (
                    <div className="text-xs text-orange-600 font-semibold animate-pulse flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Contacting UploadThing API...</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Uploaded Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Uploaded Media Gallery</CardTitle>
                  <CardDescription className="text-xs">
                    Click "Copy URL" to copy any image link for services, hero sliders, or blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedMediaList.map((m, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                        <div className="h-36 bg-slate-100 overflow-hidden relative group">
                          <img
                            src={m.url}
                            alt={m.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="text-xs font-semibold text-slate-800 truncate" title={m.name}>
                            {m.name}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(m.url)}
                            className="w-full flex items-center justify-center gap-1.5 text-xs bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-700 py-1.5 px-2 rounded font-medium transition-colors cursor-pointer"
                          >
                            {copiedUrl === m.url ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Image URL</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 5: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Scrap Selling Guides & Market Insights</h2>
                  <p className="text-xs text-slate-500">Publish guides helping factories and contractors sell their scrap for higher returns</p>
                </div>
                <Button
                  onClick={() => {
                    setIsCreatingBlog(true);
                    setEditingBlog(null);
                    setBlogForm({
                      title: '',
                      excerpt: '',
                      content: '',
                      author: 'Malik Scrap Appraiser',
                      category: 'Selling Guide',
                      image: '/assets/images/copper_wire_brass_1793892530421.jpg',
                    });
                  }}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Guide</span>
                </Button>
              </div>

              {(isCreatingBlog || editingBlog) && (
                <Card className="border-orange-300 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-3 bg-orange-50/50 rounded-t-lg">
                    <div>
                      <CardTitle className="text-sm font-bold">
                        {isCreatingBlog ? 'Create New Scrap Selling Guide' : `Edit: ${editingBlog?.title}`}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Rich content optimized for scrap metal search rankings
                      </CardDescription>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingBlog(false);
                        setEditingBlog(null);
                      }}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Cancel writing"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <form onSubmit={handleSaveBlog} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Article Headline</label>
                        <Input
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          required
                          placeholder="e.g. 5 Mistakes Machine Shops Make When Selling Copper Scrap"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Author Name / Title</label>
                        <Input
                          value={blogForm.author}
                          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                        <Input
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                          required
                        />
                      </div>

                      {/* Image Upload for Blog */}
                      <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Featured Article Image (UploadThing)</span>
                          <span className="text-[11px] font-normal text-slate-500">Pick image file to upload</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleBlogImageUpload}
                            disabled={blogUploading}
                            className="bg-white text-xs file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                          />
                          {blogUploading && (
                            <span className="text-xs text-orange-600 font-semibold animate-pulse flex items-center gap-1">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to UploadThing...
                            </span>
                          )}
                        </div>
                        <Input
                          value={blogForm.image || ''}
                          onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                          className="text-xs bg-white mt-1"
                          placeholder="Image URL"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Short Summary / Excerpt</label>
                        <Textarea
                          rows={2}
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          required
                          placeholder="Brief 1-2 sentence preview"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Full Article Body</label>
                        <Textarea
                          rows={5}
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          required
                          placeholder="Comprehensive guide content"
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreatingBlog(false);
                            setEditingBlog(null);
                          }}
                          className="cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                          <Save className="w-4 h-4 mr-1.5" />
                          <span>Publish Article to MongoDB</span>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Preview</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell>
                          <img
                            src={b.image}
                            alt={b.title}
                            className="w-12 h-10 object-cover rounded border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/images/copper_wire_brass_1793892530421.jpg';
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-semibold text-xs text-slate-900">{b.title}</TableCell>
                        <TableCell className="text-xs">{b.author}</TableCell>
                        <TableCell className="text-xs text-slate-500">{b.date}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingBlog(b);
                              setIsCreatingBlog(false);
                              setBlogForm(b);
                            }}
                            className="text-xs cursor-pointer"
                            title="Edit article"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                            onClick={() => handleDeleteBlog(b.id, b.title)}
                            title="Delete article"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* TAB 6: CONTACT & YARD LOCATION (WITH LIVE MAP PREVIEW) */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Yard Location, Dispatch Hotlines & Live Map Preview</h2>
                <p className="text-xs text-slate-500">
                  Manage the receiving yard address, phone numbers, and verify the interactive Google Map preview in real-time
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form fields */}
                <div className="lg:col-span-7">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-bold">Contact & Facility Details</CardTitle>
                      <CardDescription className="text-xs">
                        Displayed in website header, footer, and consultation forms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSaveContact} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Company Trading Name</label>
                          <Input
                            value={contactFormData.companyName || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, companyName: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Marketing Tagline</label>
                          <Input
                            value={contactFormData.tagline || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, tagline: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Buying Phone</label>
                          <Input
                            value={contactFormData.phone || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Emergency Dispatch Hotline</label>
                          <Input
                            value={contactFormData.dispatchPhone || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, dispatchPhone: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Email</label>
                          <Input
                            type="email"
                            value={contactFormData.email || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Quotes Email</label>
                          <Input
                            type="email"
                            value={contactFormData.secondaryEmail || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, secondaryEmail: e.target.value })}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Google Maps Direct URL</label>
                          <Input
                            value={contactFormData.googleMapsUrl || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, googleMapsUrl: e.target.value })}
                            placeholder="https://maps.app.goo.gl/..."
                          />
                          <p className="text-[11px] text-slate-500 mt-1">
                            Paste your Google Maps pin or short-link. The live preview updates automatically on the right.
                          </p>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Physical Yard Address</label>
                          <Input
                            value={contactFormData.address || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, address: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                          <Input
                            value={contactFormData.city || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, city: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Country / State</label>
                          <Input
                            value={contactFormData.country || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, country: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Weekday Operating Hours</label>
                          <Input
                            value={contactFormData.hoursWeekday || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, hoursWeekday: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Weekend Operating Hours</label>
                          <Input
                            value={contactFormData.hoursSaturday || ''}
                            onChange={(e) => setContactFormData({ ...contactFormData, hoursSaturday: e.target.value })}
                          />
                        </div>

                        <div className="sm:col-span-2 flex justify-end pt-3 border-t border-slate-100">
                          <Button type="submit" className="cursor-pointer">
                            <Save className="w-4 h-4 mr-1.5" />
                            <span>Save Contact & Location to MongoDB</span>
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Map Preview Box (Requirement: "ensure that a map preview is displayed for any map links") */}
                <div className="lg:col-span-5 space-y-4">
                  <Card className="border-orange-200 overflow-hidden shadow-md">
                    <CardHeader className="bg-slate-900 text-white pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-orange-400" />
                          <CardTitle className="text-sm font-bold text-white">Live Map Preview</CardTitle>
                        </div>
                        <Badge variant="orange">Customer View</Badge>
                      </div>
                      <CardDescription className="text-[11px] text-slate-400">
                        Interactive map preview rendered on website for customers & heavy haul trucks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-72 bg-slate-200 relative">
                        <iframe
                          title="Yard Map Preview"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            contactFormData.address || 'Dubai Industrial City, Dubai, UAE'
                          )}&output=embed`}
                        />
                      </div>
                      <div className="p-4 bg-white border-t border-slate-200 space-y-2">
                        <div className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                          <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                          <span>{contactFormData.address || 'Dubai Industrial City, Phase 2, Dubai, UAE'}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] text-slate-500">NTEP Certified Scales On-Site</span>
                          {contactFormData.googleMapsUrl && (
                            <a
                              href={contactFormData.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                            >
                              <span>Test Link in Google Maps</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LEADS / INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Scrap Seller Pickup & Quote Inquiries</h2>
                <p className="text-xs text-slate-500">
                  Submissions from commercial clients and machine shops requesting scrap purchase or container placement
                </p>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Seller Contact</TableHead>
                      <TableHead>Subject / Scrap Type</TableHead>
                      <TableHead>Tonnage & Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Update Workflow</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-400">
                          No inquiries received yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      consultations.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="text-xs text-slate-500 whitespace-nowrap">{lead.date}</TableCell>
                          <TableCell>
                            <div className="font-semibold text-xs text-slate-900">{lead.name}</div>
                            <div className="text-[11px] text-orange-600">{lead.email}</div>
                            {lead.phone && <div className="text-[11px] text-slate-600">{lead.phone}</div>}
                          </TableCell>
                          <TableCell className="text-xs font-semibold text-slate-800">{lead.subject}</TableCell>
                          <TableCell className="text-xs text-slate-600 max-w-xs">{lead.message || '-'}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                lead.status === 'Completed'
                                  ? 'secondary'
                                  : lead.status === 'Scheduled'
                                  ? 'orange'
                                  : 'destructive'
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                              className="text-xs p-1.5 border border-slate-300 rounded bg-white font-medium cursor-pointer"
                            >
                              <option value="New">New Offer</option>
                              <option value="In Progress">In Progress (Pricing)</option>
                              <option value="Scheduled">Scheduled Pickup</option>
                              <option value="Completed">Purchased & Paid</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* TAB 8: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Admin Security Credentials</h2>
                <p className="text-xs text-slate-500">
                  Update administrative username and secure password with bcrypt encryption in MongoDB
                </p>
              </div>

              <Card className="max-w-md">
                <CardContent className="pt-6">
                  {secError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded mb-4">
                      {secError}
                    </div>
                  )}

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Current Password</label>
                      <Input
                        type="password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        required
                        placeholder="Current password for verification"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">New Admin Username</label>
                      <Input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        New Password (minimum 8 characters)
                      </label>
                      <Input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="New strong password"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm New Password</label>
                      <Input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Repeat new password"
                      />
                    </div>

                    <Button type="submit" className="w-full cursor-pointer">
                      <Save className="w-4 h-4 mr-1.5" />
                      <span>Update Credentials in MongoDB</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
