import { ServiceItem, BlogPost, ScrapPrice, ContactInfo, ConsultationLead } from '../types';

const BASE = '';

/** Read the stored JWT token from localStorage (client-side only) */
function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('malik_admin_token') || localStorage.getItem('Malik_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ---- Contact ----
export async function fetchContactInfo(): Promise<ContactInfo> {
  const res = await fetch(`${BASE}/api/contact`);
  if (!res.ok) throw new Error('Failed to load contact info');
  return res.json();
}

export async function updateContactInfo(data: Partial<ContactInfo>): Promise<ContactInfo> {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update contact info');
  }
  const json = await res.json();
  return json.contact;
}

// ---- Services ----
export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${BASE}/api/services`);
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const res = await fetch(`${BASE}/api/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create service');
  }
  return res.json();
}

export async function updateService(id: string, service: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`${BASE}/api/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update service');
  }
  return res.json();
}

export async function deleteService(id: string): Promise<boolean> {
  const res = await fetch(`${BASE}/api/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.ok;
}

// ---- Blogs ----
export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${BASE}/api/blogs`);
  if (!res.ok) throw new Error('Failed to load blog posts');
  return res.json();
}

export async function createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`${BASE}/api/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(blog),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create blog post');
  }
  return res.json();
}

export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`${BASE}/api/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(blog),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update blog post');
  }
  return res.json();
}

export async function deleteBlog(id: string): Promise<boolean> {
  const res = await fetch(`${BASE}/api/blogs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.ok;
}

// ---- Prices ----
export async function fetchPrices(): Promise<ScrapPrice[]> {
  const res = await fetch(`${BASE}/api/prices`);
  if (!res.ok) throw new Error('Failed to load scrap prices');
  return res.json();
}

export async function updatePrices(prices: ScrapPrice[]): Promise<ScrapPrice[]> {
  const res = await fetch(`${BASE}/api/prices`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(prices),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update scrap prices');
  }
  const json = await res.json();
  return json.prices;
}

// ---- Consultations ----
export async function submitConsultation(lead: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
}): Promise<ConsultationLead> {
  const res = await fetch(`${BASE}/api/consultations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error('Failed to submit consultation request');
  const json = await res.json();
  return json.lead;
}

export async function fetchConsultations(): Promise<ConsultationLead[]> {
  const res = await fetch(`${BASE}/api/consultations`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to load consultations');
  return res.json();
}

export async function updateConsultationStatus(id: string, status: string): Promise<boolean> {
  const res = await fetch(`${BASE}/api/consultations/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.ok;
}

// ---- Auth ----
export async function loginAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; username?: string; message?: string }> {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function updateAdminCredentials(
  currentPassword: string,
  newUsername?: string,
  newPassword?: string
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${BASE}/api/auth/update-credentials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newUsername, newPassword }),
  });
  return res.json();
}

// ---- UploadThing Image Upload ----
export async function uploadImage(file: File): Promise<{ success: boolean; url: string; name?: string; size?: number; message?: string }> {
  const token = localStorage.getItem('malik_admin_token') || localStorage.getItem('Malik_admin_token');
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE}/api/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Image upload failed');
  }
  return json;
}
