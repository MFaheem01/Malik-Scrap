import { ServiceItem, BlogPost, ScrapPrice, ContactInfo, ConsultationLead } from './types';

export async function fetchContactInfo(): Promise<ContactInfo> {
  const res = await fetch('/api/contact');
  if (!res.ok) throw new Error('Failed to load contact info');
  return res.json();
}

export async function updateContactInfo(data: Partial<ContactInfo>): Promise<ContactInfo> {
  const res = await fetch('/api/contact', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update contact info');
  const json = await res.json();
  return json.contact;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch('/api/services');
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const res = await fetch('/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to create service');
  return res.json();
}

export async function updateService(id: string, service: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
}

export async function deleteService(id: string): Promise<boolean> {
  const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
  return res.ok;
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch('/api/blogs');
  if (!res.ok) throw new Error('Failed to load blog posts');
  return res.json();
}

export async function createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  if (!res.ok) throw new Error('Failed to create blog post');
  return res.json();
}

export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  if (!res.ok) throw new Error('Failed to update blog post');
  return res.json();
}

export async function deleteBlog(id: string): Promise<boolean> {
  const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
  return res.ok;
}

export async function fetchPrices(): Promise<ScrapPrice[]> {
  const res = await fetch('/api/prices');
  if (!res.ok) throw new Error('Failed to load scrap prices');
  return res.json();
}

export async function updatePrices(prices: ScrapPrice[]): Promise<ScrapPrice[]> {
  const res = await fetch('/api/prices', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prices),
  });
  if (!res.ok) throw new Error('Failed to update scrap prices');
  const json = await res.json();
  return json.prices;
}

export async function submitConsultation(lead: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
}): Promise<ConsultationLead> {
  const res = await fetch('/api/consultations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error('Failed to submit consultation request');
  const json = await res.json();
  return json.lead;
}

export async function fetchConsultations(): Promise<ConsultationLead[]> {
  const res = await fetch('/api/consultations');
  if (!res.ok) throw new Error('Failed to load consultations');
  return res.json();
}

export async function updateConsultationStatus(id: string, status: string): Promise<boolean> {
  const res = await fetch(`/api/consultations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.ok;
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function updateAdminCredentials(currentPassword: string, newUsername?: string, newPassword?: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch('/api/auth/update-credentials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newUsername, newPassword }),
  });
  return res.json();
}
