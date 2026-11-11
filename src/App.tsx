import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { ServicesSlider } from './components/ServicesSlider';
import { WhyTrustSection } from './components/WhyTrustSection';
import { BlogSection } from './components/BlogSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import {
  fetchContactInfo,
  fetchServices,
  fetchBlogs,
  fetchPrices,
  fetchConsultations,
} from './api';
import { ServiceItem, BlogPost, ContactInfo, ScrapPrice, ConsultationLead } from './types';

// Fallback initial state in case server is just booting
const defaultContact: ContactInfo = {
  companyName: 'Malik Scrap Metal  ',
  tagline: 'Premier Industrial Scrap Metal   Container Dispatch',
  phone: '+9710504363615',
  dispatchPhone: '+9710504363615',
  email: 'malikscrapdealer11@gmail.com',
  secondaryEmail: 'malikscrapdealer11@gmail.com',
  address: '4820 Industrial Parkway, Dock #4',
  city: 'Detroit',
  state: 'MI',
  zip: '48210',
  country: 'United States',
  hoursWeekday: '24/7 service available',
  hoursSaturday: 'Saturday: 24/7 service available',
  hoursSunday: 'Sunday: 24/7 service available',
  googleMapsUrl: 'https://maps.google.com/?q=4820+Industrial+Parkway+Detroit+MI+48210',
  emergencyHotline: '24/7 Roll-Off  Commercial Container Dispatch Available',
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
};

export default function App() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [prices, setPrices] = useState<ScrapPrice[]>([]);
  const [consultations, setConsultations] = useState<ConsultationLead[]>([]);

  // UI state
  const [adminOpen, setAdminOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load all data
  const loadData = async () => {
    try {
      const [c, s, b, p, leads] = await Promise.all([
        fetchContactInfo().catch(() => defaultContact),
        fetchServices().catch(() => []),
        fetchBlogs().catch(() => []),
        fetchPrices().catch(() => []),
        fetchConsultations().catch(() => []),
      ]);
      setContact(c);
      setServices(s);
      setBlogs(b);
      setPrices(p);
      setConsultations(leads);
    } catch (err) {
      console.error('Failed to load backend data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Scroll tracking for nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'prices', 'blog', 'location', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top  scrollPos < top + height) {
    setActiveSection(section);
    break;
  }
}
      }
    };
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Quick Action to scroll to Free Consultation form
const scrollToConsultation = (customSubject?: string) => {
  const el = document.getElementById('about');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  if (customSubject) {
    // Find subject input in form
    const input = document.querySelector('input[placeholder*="Subject"]') as HTMLInputElement;
    if (input) {
      input.value = customSubject;
      input.focus();
    }
  }
};

const handleQuoteWithEstimate = (metal: string, weight: string, estimatedTotal: string) => {
  scrollToConsultation(`Rate Lock: ${metal} (~${weight} units, Est. $${estimatedTotal})`);
};

return (
  <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
    {/* 1. Top Bar (Need Help, Phone, Email, Hours, Socials, Admin Portal) */}
    <TopBar
      contact={contact}
      onOpenAdmin={() => setAdminOpen(true)}
      isAdminLoggedIn={isAdminLoggedIn}
    />

    {/* 2. Main Navbar with logo, nav links, search, and 'Get Support' CTA */}
    <Navbar
      contact={contact}
      onOpenSearch={() => setSearchOpen(true)}
      onRequestQuote={() => scrollToConsultation('Request Container  Rate Consultation')}
      activeSection={activeSection}
    />

    <main className="flex-1">
      {/* 3. Hero Section with Industrial Crane Slider  Edge Tabs (Screenshot 4) */}
      <HeroSlider
        onLearnMore={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onContactUs={() => scrollToConsultation('Direct Industrial Scrap Consultation')}
        phone={contact.phone}
      />

      {/* 4. About Our Company with [History | Mission | Support] tabs  Free Consultation Card (Screenshot 1) */}
      <AboutSection
        onLearnMoreServices={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Our Service Swiper Slider with 3-second auto-transition (Screenshot 2) */}
      {services.length > 0(
        <ServicesSlider
          services={services}
          onRequestService={(title) => scrollToConsultation(`Inquiry for Service: ${title}`)}
        />
      )}

      {/* 6. Today's Scrap Prices  Instant Calculator Estimator */}
      {prices.length > 0(
        <PriceBoard
          prices={prices}
          onQuoteWithEstimate={handleQuoteWithEstimate}
        />
      )}

      {/* 7. Why Trust Our Services with Video Tour  Orange 24/7 Strip (Screenshot 5) */}
      <WhyTrustSection
        onGetSupport={() => scrollToConsultation('24/7 Customer Support  Logistics Dispatch')}
        phone={contact.dispatchPhone}
      />

      {/* 8. Our Latest Blog with article cards  reader (Screenshot 3) */}
      {blogs.length > 0 < BlogSection blogs={blogs} />}

      {/* 9. Location  Scale Entrance Section (Placed above the footer) */}
      <LocationSection
        contact={contact}
        onRequestDropoff={() => scrollToConsultation('Commercial Yard Drop-off Appointment')}
      />
    </main>

    {/* 10. Comprehensive Footer */}
    <Footer
      contact={contact}
      onOpenAdmin={() => setAdminOpen(true)}
      onRequestQuote={() => scrollToConsultation('Material Valuation Request')}
    />

    {/* Admin Management Dashboard Modal */}
    <AdminDashboard
      isOpen={adminOpen}
      onClose={() => setAdminOpen(false)}
      contact={contact}
      services={services}
      blogs={blogs}
      prices={prices}
      consultations={consultations}
      onRefreshData={loadData}
      isAdminLoggedIn={isAdminLoggedIn}
      setIsAdminLoggedIn={setIsAdminLoggedIn}
    />
  </div>
);
}
