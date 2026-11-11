export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  description: string;
  icon: string;
  image: string;
  badge?: string;
  highlight?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  commentsCount: number;
  image: string;
  category: string;
}

export interface ScrapPrice {
  metal: string;
  price: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export interface ContactInfo {
  companyName: string;
  tagline: string;
  phone: string;
  dispatchPhone: string;
  email: string;
  secondaryEmail: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  googleMapsUrl: string;
  emergencyHotline: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

export interface ConsultationLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Scheduled' | 'Completed';
}

