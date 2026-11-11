import React, { useState } from 'react';
import {
  Shield,
  Layers,
  BookOpen,
  Phone,
  Inbox,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Save,
  LogOut,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  X,
  FileText,
  DollarSign,
  KeyRound,
  RefreshCw,
  Archive,
} from 'lucide-react';
import { ServiceItem, BlogPost, ContactInfo, ScrapPrice, ConsultationLead } from '../types';
import {
  createService,
  updateService,
  deleteService,
  createBlog,
  updateBlog,
  deleteBlog,
  updateContactInfo,
  updatePrices,
  updateConsultationStatus,
  loginAdmin,
  updateAdminCredentials,
} from '../api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactInfo;
  services: ServiceItem[];
  blogs: BlogPost[];
  prices: ScrapPrice[];
  consultations: ConsultationLead[];
  onRefreshData: () => Promise<void>;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  contact,
  services,
  blogs,
  prices,
  consultations,
  onRefreshData,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'services' | 'blogs' | 'contact' | 'leads' | 'prices' | 'security' | 'export'
  >('overview');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Status banners
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ----------------- LOGIN HANDLER ----------------- //
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await loginAdmin(loginUsername, loginPassword);
      if (res.success) {
        setIsAdminLoggedIn(true);
        showToast('Logged in successfully!');
      } else {
        setLoginError(res.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setLoginError('Server connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin Portal');
  };

  // ----------------- SERVICES MANAGEMENT ----------------- //
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({
    title: '',
    category: 'Ferrous',
    shortDesc: '',
    description: '',
    icon: 'Hammer',
    image: '/src/assets/images/ferrous_steel__1793892530649.jpg',
    badge: 'Popular',
    highlight: '',
  });

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreatingService) {
        await createService(serviceFormData as any);
        showToast('Service added successfully');
      } else if (editingService) {
        await updateService(editingService.id, serviceFormData);
        showToast('Service updated successfully');
      }
      setIsCreatingService(false);
      setEditingService(null);
      await onRefreshData();
    } catch (err) {
      showToast('Error saving service');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      showToast('Service deleted');
      await onRefreshData();
    }
  };

  // ----------------- BLOG POSTS MANAGEMENT ----------------- //
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    category: 'Market Trends',
    image: '/src/assets/images/copper_wire_brass_1793892530421.jpg',
  });

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreatingBlog) {
        await createBlog(blogFormData);
        showToast('Blog post created successfully');
      } else if (editingBlog) {
        await updateBlog(editingBlog.id, blogFormData);
        showToast('Blog post updated successfully');
      }
      setIsCreatingBlog(false);
      setEditingBlog(null);
      await onRefreshData();
    } catch (err) {
      showToast('Error saving blog post');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id);
      showToast('Blog post deleted');
      await onRefreshData();
    }
  };

  // ----------------- CONTACT  LOCATION MANAGEMENT ----------------- //
  const [contactForm, setContactForm] = useState<ContactInfo>(contact);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactInfo(contactForm);
      showToast('Contact details and location updated successfully');
      await onRefreshData();
    } catch (err) {
      showToast('Error updating contact information');
    }
  };

  // ----------------- PRICES MANAGEMENT ----------------- //
  const [priceList, setPriceList] = useState<ScrapPrice[]>(prices);

  const handleSavePrices = async () => {
    try {
      await updatePrices(priceList);
      showToast('Scrap metal prices updated');
      await onRefreshData();
    } catch (err) {
      showToast('Error updating scrap prices');
    }
  };

  const handlePriceChange = (index: number, field: keyof ScrapPrice, value: string) => {
    const updated = [...priceList];
    updated[index] = { ...updated[index], [field]: value };
    setPriceList(updated);
  };

  // ----------------- SECURITY  PASSWORD ----------------- //
  const [currentPass, setCurrentPass] = useState('');
  const [newUsername, setNewUsername] = useState('admin');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securityError, setSecurityError] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');

    if (newPass  newPass !== confirmPass) {
      setSecurityError('New password and confirmation do not match');
      return;
    }

    try {
      const res = await updateAdminCredentials(currentPass, newUsername, newPass);
      if (res.success) {
        showToast('Admin credentials updated successfully!');
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setSecurityError(res.message || 'Failed to update credentials');
      }
    } catch (err: any) {
      setSecurityError('Failed to communicate with auth server');
    }
  };

  // ----------------- LEADS STATUS CHANGE ----------------- //
  const handleLeadStatusChange = async (id: string, status: string) => {
    await updateConsultationStatus(id, status);
    showToast(`Lead marked as ${status}`);
    await onRefreshData();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-orange-600 flex items-center justify-center text-white font-bold shadow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                <span>Malik Admin Control Center</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Backend API v1
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage services, industry articles, contact details, prices  customer leads
              </p>
            </div>
          </div>

        </div>

        {/* Toast alert */}
        {toastMessage(
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        {!isAdminLoggedIn ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex items-center justify-center flex-1 bg-slate-50">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xl max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Admin Authentication</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your credentials to access business management controls
                </p>
              </div>

              {loginError(
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="p-2.5 bg-slate-100 rounded text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Default Demo Credentials:</span>{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border text-slate-700">admin</code> /{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border text-slate-700">password123</code>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-3 rounded transition-colors shadow-md shadow-orange-600/20 cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'overview'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'services'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4" />
                    <span>Manage Services</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">
                    {services.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'blogs'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4" />
                    <span>Blog Posts</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">
                    {blogs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'contact'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact  Location</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'leads'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Inbox className="w-4 h-4" />
                    <span>Customer Inquiries</span>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-mono font-bold">
                    {consultations.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('prices')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'prices'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Scrap Prices Board</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'security'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Admin Password</span>
                </button>

                <button
                  onClick={() => setActiveTab('export')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${activeTab === 'export'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <Archive className="w-4 h-4" />
                  <span>ZIP Code Export</span>
                </button>
              </nav>

              <div className="pt-4 border-t border-slate-200 mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Tab View Area */}
            <main className="flex-1 p-6 overflow-y-auto">
              {/* 1. OVERVIEW */}
              {activeTab === 'overview'(
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">System Dashboard Overview</h3>
                    <p className="text-xs text-slate-500">
                      Real-time status of your business offerings, content, and inbound commercial inquiries.
                    </p>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                        <span>Active Services</span>
                        <Layers className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                        {services.length}
                      </div>
                      <span className="text-[11px] text-emerald-600 font-medium">Displayed in 3s Slider</span>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                        <span>Published Articles</span>
                        <BookOpen className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                        {blogs.length}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Industry Guides</span>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                        <span>Client Inquiries</span>
                        <Inbox className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-orange-600 tabular-nums">
                        {consultations.length}
                      </div>
                      <span className="text-[11px] text-orange-600 font-medium">Free Consultation Leads</span>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                        <span>Live Metal Rates</span>
                        <DollarSign className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                        {prices.length}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Benchmark Categories</span>
                    </div>
                  </div>

                  {/* Recent Leads Preview */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-900">
                        Recent Inbound Consultation  Pickup Requests
                      </h4>
                      <button
                        onClick={() => setActiveTab('leads')}
                        className="text-xs text-orange-600 font-semibold hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    {consultations.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4">No inquiries submitted yet.</p>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {consultations.slice(0, 3).map((lead) => (
                          <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900 text-xs">{lead.name}</span>
                                <span className="text-slate-400 text-xs">({lead.email})</span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1">{lead.subject} - {lead.message}</p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                              {lead.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. SERVICES TAB */}
              {activeTab === 'services'(
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Manage Services</h3>
                      <p className="text-xs text-slate-500">
                        Add, edit, or delete services showcased in the homepage 3-second swiper slider.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingService(true);
                        setEditingService(null);
                        setServiceFormData({
                          title: '',
                          category: 'Ferrous',
                          shortDesc: '',
                          description: '',
                          icon: 'Hammer',
                          image: '/src/assets/images/ferrous_steel__1793892530649.jpg',
                          badge: 'Popular',
                          highlight: '',
                        });
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  {/* Form Modal for Creating/Editing Service */}
                  {(isCreatingService || editingService)(
                    <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-md">
                      <div className="flex items-center justify-between mb-4 border-b pb-3">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isCreatingService ? 'Create New Service' : `Edit: ${editingService?.title}`}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingService(false);
                            setEditingService(null);
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.title}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                            required
                            placeholder="e.g. Copper Reclamation  "
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Category
                          </label>
                          <select
                            value={serviceFormData.category}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          >
                            <option value="Ferrous">Ferrous Metal</option>
                            <option value="Non-Ferrous">Non-Ferrous  Copper</option>
                            <option value="Commercial Logistics">Commercial Logistics  Containers</option>
                            <option value="Industrial Service">Industrial Demolition</option>
                            <option value="Automotive">Automotive  Catalytic</option>
                            <option value="Exotic Alloys">Exotic Alloys  E-Scrap</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Icon Graphic
                          </label>
                          <select
                            value={serviceFormData.icon}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          >
                            <option value="Hammer">Hammer (Heavy Steel)</option>
                            <option value="Zap">Zap (Copper / Wire)</option>
                            <option value="Truck">Truck (Roll-off Bin Fleet)</option>
                            <option value="Wrench">Wrench (Demolition  Dismantling)</option>
                            <option value="Car">Car (Auto Scrap)</option>
                            <option value="Cpu">Cpu (Specialty Alloys  E-Scrap)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Badge Tag (Optional)
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.badge || ''}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, badge: e.target.value })}
                            placeholder="e.g. Top Payout, 24h Dispatch"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Short Description (Shown on slider card)
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.shortDesc}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, shortDesc: e.target.value })}
                            required
                            placeholder="Brief 1-2 sentence description"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Metallurgy  Processing Details (Shown in Read More modal)
                          </label>
                          <textarea
                            rows={3}
                            value={serviceFormData.description}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                            placeholder="Full details on grading, scale tickets, minimum quantities, etc."
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500 resize-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Image Path or URL
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.image}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500 font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingService(false);
                              setEditingService(null);
                            }}
                            className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded flex items-center gap-1.5 shadow"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Service</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Services Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Badge</th>
                          <th className="py-3 px-4">Excerpt</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {services.map((srv) => (
                          <tr key={srv.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                              <img
                                src={srv.image}
                                alt={srv.title}
                                className="w-10 h-10 object-cover rounded border border-slate-200 shrink-0"
                              />
                              <span>{srv.title}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-600">{srv.category}</td>
                            <td className="py-3 px-4">
                              {srv.badge ? (
                                <span className="bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                                  {srv.badge}
                                </span>
                              ) : (
                                '-'
                              )}
                            </td>
                            <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                              {srv.shortDesc}
                            </td>
                            <td className="py-3 px-4 text-right space-x-1">
                              <button
                                onClick={() => {
                                  setEditingService(srv);
                                  setIsCreatingService(false);
                                  setServiceFormData(srv);
                                }}
                                className="p-1.5 text-slate-600 hover:text-orange-600 rounded hover:bg-slate-100"
                                title="Edit Service"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(srv.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                                title="Delete Service"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. BLOG POSTS TAB */}
              {activeTab === 'blogs'(
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Manage Blog Posts</h3>
                      <p className="text-xs text-slate-500">
                        Publish and edit scrap market analyses and educational guides for contractors.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCreatingBlog(true);
                        setEditingBlog(null);
                        setBlogFormData({
                          title: '',
                          excerpt: '',
                          content: '',
                          author: 'Admin',
                          category: 'Market Trends',
                          image: '/src/assets/images/copper_wire_brass_1793892530421.jpg',
                        });
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Blog Post</span>
                    </button>
                  </div>

                  {/* Blog Form */}
                  {(isCreatingBlog || editingBlog)(
                    <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-md">
                      <div className="flex items-center justify-between mb-4 border-b pb-3">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isCreatingBlog ? 'Write New Blog Article' : `Edit: ${editingBlog?.title}`}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingBlog(false);
                            setEditingBlog(null);
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveBlog} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Article Title
                          </label>
                          <input
                            type="text"
                            value={blogFormData.title}
                            onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                            required
                            placeholder="e.g. Copper Price Rally: What Manufacturing Shops Should Expect"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Author
                          </label>
                          <input
                            type="text"
                            value={blogFormData.author}
                            onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                            required
                            placeholder="e.g. Marcus Vance, Chief Metallurgist"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Category Tag
                          </label>
                          <input
                            type="text"
                            value={blogFormData.category}
                            onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                            required
                            placeholder="e.g. Market Trends, Operations,  Guide"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Excerpt (Brief summary for card)
                          </label>
                          <textarea
                            rows={2}
                            value={blogFormData.excerpt}
                            onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                            required
                            placeholder="1-2 sentences summarizing the article"
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500 resize-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Article Content
                          </label>
                          <textarea
                            rows={5}
                            value={blogFormData.content}
                            onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                            required
                            placeholder="Detailed article text..."
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Featured Image URL
                          </label>
                          <input
                            type="text"
                            value={blogFormData.image}
                            onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500 font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingBlog(false);
                              setEditingBlog(null);
                            }}
                            className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded flex items-center gap-1.5 shadow"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Article</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Blog Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Author</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {blogs.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                              <img
                                src={b.image}
                                alt={b.title}
                                className="w-10 h-10 object-cover rounded border border-slate-200 shrink-0"
                              />
                              <span className="line-clamp-1">{b.title}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-600">{b.author}</td>
                            <td className="py-3 px-4 text-slate-500">{b.date}</td>
                            <td className="py-3 px-4">
                              <span className="bg-orange-50 text-orange-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                                {b.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-1">
                              <button
                                onClick={() => {
                                  setEditingBlog(b);
                                  setIsCreatingBlog(false);
                                  setBlogFormData(b);
                                }}
                                className="p-1.5 text-slate-600 hover:text-orange-600 rounded hover:bg-slate-100"
                                title="Edit Article"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                                title="Delete Article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. CONTACT  LOCATION SETTINGS */}
              {activeTab === 'contact'(
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Contact Details  Yard Location Settings
                    </h3>
                    <p className="text-xs text-slate-500">
                      Update the business phone number, email address, physical yard address, and scale hours.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSaveContact}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Legal Name
                        </label>
                        <input
                          type="text"
                          value={contactForm.companyName}
                          onChange={(e) => setContactForm({ ...contactForm, companyName: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Tagline
                        </label>
                        <input
                          type="text"
                          value={contactForm.tagline}
                          onChange={(e) => setContactForm({ ...contactForm, tagline: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Primary Phone Number
                        </label>
                        <input
                          type="text"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Commercial Dispatch Hotline
                        </label>
                        <input
                          type="text"
                          value={contactForm.dispatchPhone}
                          onChange={(e) => setContactForm({ ...contactForm, dispatchPhone: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Primary Email Address
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Rate Quotes Email
                        </label>
                        <input
                          type="email"
                          value={contactForm.secondaryEmail}
                          onChange={(e) => setContactForm({ ...contactForm, secondaryEmail: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Physical Yard Street Address  Scale Entrance
                        </label>
                        <input
                          type="text"
                          value={contactForm.address}
                          onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={contactForm.city}
                          onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            State / Province
                          </label>
                          <input
                            type="text"
                            value={contactForm.state}
                            onChange={(e) => setContactForm({ ...contactForm, state: e.target.value })}
                            required
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Zip / Postal Code
                          </label>
                          <input
                            type="text"
                            value={contactForm.zip}
                            onChange={(e) => setContactForm({ ...contactForm, zip: e.target.value })}
                            required
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Weekday Receiving Hours
                        </label>
                        <input
                          type="text"
                          value={contactForm.hoursWeekday}
                          onChange={(e) => setContactForm({ ...contactForm, hoursWeekday: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Saturday Receiving Hours
                        </label>
                        <input
                          type="text"
                          value={contactForm.hoursSaturday}
                          onChange={(e) => setContactForm({ ...contactForm, hoursSaturday: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Emergency Dispatch Notice
                        </label>
                        <input
                          type="text"
                          value={contactForm.emergencyHotline}
                          onChange={(e) => setContactForm({ ...contactForm, emergencyHotline: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end">
                      <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Contact  Location Updates</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 5. LEADS  CONSULTATIONS */}
              {activeTab === 'leads'(
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Customer Pickup  Consultation Inquiries
                    </h3>
                    <p className="text-xs text-slate-500">
                      Submissions received through the homepage 'Free Consultation / Request Scrap Pickup' form.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {consultations.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        No customer inquiries received yet.
                      </div>
                    ) : (
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Subject</th>
                            <th className="py-3 px-4">Message / Est. Tonnage</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Update Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {consultations.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/80">
                              <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{lead.date}</td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-slate-900 block">{lead.name}</span>
                                <a href={`mailto:${lead.email}`} className="text-orange-600 hover:underline block text-[11px]">
                                  {lead.email}
                                </a>
                                {lead.phone(
                                  <a href={`tel:${lead.phone}`} className="text-slate-500 block text-[11px]">
                                    {lead.phone}
                                  </a>
                                )}
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-800">{lead.subject}</td>
                              <td className="py-3 px-4 text-slate-600 max-w-sm">{lead.message || '-'}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${lead.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : lead.status === 'Scheduled'
                                      ? 'bg-blue-100 text-blue-800'
                                      : lead.status === 'In Progress'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-orange-100 text-orange-800'
                                    }`}
                                >
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                                  className="text-[11px] p-1 border rounded bg-white text-slate-700"
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Scheduled">Scheduled</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* 6. SCRAP PRICES BOARD */}
              {activeTab === 'prices'(
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Manage Scrap Metal Rates</h3>
                      <p className="text-xs text-slate-500">
                        Adjust per-pound or per-ton rates displayed on the live ticker and interactive calculator.
                      </p>
                    </div>
                    <button
                      onClick={handleSavePrices}
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Rates</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Metal Grade</th>
                          <th className="py-3 px-4">Price Value</th>
                          <th className="py-3 px-4">Unit</th>
                          <th className="py-3 px-4">Trend</th>
                          <th className="py-3 px-4">Day Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {priceList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">
                              <input
                                type="text"
                                value={item.metal}
                                onChange={(e) => handlePriceChange(idx, 'metal', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs"
                              />
                            </td>
                            <td className="py-2.5 px-4 font-bold">
                              <input
                                type="text"
                                value={item.price}
                                onChange={(e) => handlePriceChange(idx, 'price', e.target.value)}
                                className="w-24 px-2 py-1 border rounded text-xs font-mono font-bold"
                              />
                            </td>
                            <td className="py-2.5 px-4">
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) => handlePriceChange(idx, 'unit', e.target.value)}
                                className="w-20 px-2 py-1 border rounded text-xs"
                              />
                            </td>
                            <td className="py-2.5 px-4">
                              <select
                                value={item.trend}
                                onChange={(e) => handlePriceChange(idx, 'trend', e.target.value)}
                                className="px-2 py-1 border rounded text-xs"
                              >
                                <option value="up">Up (Green)</option>
                                <option value="stable">Stable (Gray)</option>
                                <option value="down">Down (Red)</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-4">
                              <input
                                type="text"
                                value={item.change}
                                onChange={(e) => handlePriceChange(idx, 'change', e.target.value)}
                                className="w-20 px-2 py-1 border rounded text-xs font-mono"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 7. SECURITY  PASSWORD (Explicit User Request) */}
              {activeTab === 'security'(
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Admin Security Credentials</h3>
                    <p className="text-xs text-slate-500">
                      Update your administrator username and dashboard login password.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-lg">
                    {securityError(
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{securityError}</span>
                      </div>
                    )}

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Current Password (Verification)
                        </label>
                        <input
                          type="password"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                          required
                          placeholder="Enter current password"
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Admin Username
                        </label>
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          required
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-2.5 rounded transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Update Credentials</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 8. EXPORT ZIP ARCHIVE (Explicit User Request) */}
              {activeTab === 'export'(
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Project Source Code  Files ZIP</h3>
                    <p className="text-xs text-slate-500">
                      Download the complete, self-contained project files in a ZIP archive for local deployment or backup.
                    </p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <Archive className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          Complete Codebase Package (ZIP)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Includes Vite + React frontend, Express API server, persistent database models, Shadcn components  Poppins styling.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
                      <p className="font-semibold text-slate-800">Archive Package Contents:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        <li><code>/server.ts</code> — Full-stack Express backend  API endpoints</li>
                        <li><code>/src/*</code> — React components, Swiper slider, Admin Portal, Types  CSS</li>
                        <li><code>/data/db.json</code> — Persistent JSON database with sample services  blogs</li>
                        <li><code>package.json</code>, <code>tsconfig.json</code>, <code>vite.config.ts</code></li>
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href="/api/download-zip"
                        download="Malik-scrap-metal-project.zip"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-3 px-6 rounded-lg transition-colors shadow-md shadow-orange-600/20 flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Complete Project ZIP</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
