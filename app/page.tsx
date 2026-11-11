'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/client/components/TopBar';
import { Navbar } from '@/client/components/Navbar';
import { HeroSlider } from '@/client/components/HeroSlider';
import { AboutSection } from '@/client/components/AboutSection';
import { ServicesSlider } from '@/client/components/ServicesSlider';
import { WhyTrustSection } from '@/client/components/WhyTrustSection';
import { BlogSection } from '@/client/components/BlogSection';
import { LocationSection } from '@/client/components/LocationSection';
import { FreeDelivery } from '@/client/components/FreeDelivery';
import { Footer } from '@/client/components/Footer';
import {
  fetchContactInfo,
  fetchServices,
  fetchBlogs,
} from '@/client/lib/api';
import { ServiceItem, BlogPost, ContactInfo } from '@/client/types';

const defaultContact: ContactInfo = {
  companyName: 'Malik Scrap Metal Buyers',
  tagline: 'We Buy Industrial & Commercial Scrap Metal at Top Market Rates',
  phone: '+971 50 436 3615',
  dispatchPhone: '+971 50 436 3615',
  email: 'malikscrapdealer11@gmail.com',
  secondaryEmail: 'purchase@malikscrap.com',
  address: 'Dubai Industrial City, Phase 2, Dubai, UAE',
  city: 'Dubai',
  state: 'Dubai',
  zip: '500001',
  country: 'United Arab Emirates',
  hoursWeekday: '24/7 Scrap Receiving & Site Pickup',
  hoursSaturday: 'Saturday: 24/7 Weighbridge Open',
  hoursSunday: 'Sunday: 24/7 On-Call Dispatch',
  googleMapsUrl: 'https://maps.app.goo.gl/4jdRcf7gbDx4L1Z59',
  emergencyHotline: '24/7 Scrap Collection & Container Placement Available',
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
};

export default function HomePage() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const loadData = async () => {
    try {
      const [c, s, b] = await Promise.all([
        fetchContactInfo().catch(() => defaultContact),
        fetchServices().catch(() => []),
        fetchBlogs().catch(() => []),
      ]);
      setContact(c);
      setServices(s);
      setBlogs(b);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Scroll tracking for nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'delivery', 'blog', 'location', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToConsultation = (customSubject?: string) => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (customSubject) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder*="Subject"]') as HTMLInputElement;
        if (input) {
          input.value = customSubject;
          input.focus();
        }
      }, 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
      {/* 1. Top Bar */}
      <TopBar contact={contact} />

      {/* 2. Main Navbar */}
      <Navbar
        contact={contact}
        onRequestQuote={() => scrollToConsultation('Sell Scrap Metal - Free Valuation & Container Request')}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 3. Hero Slider */}
        <HeroSlider
          onLearnMore={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactUs={() => scrollToConsultation('Sell Scrap - Request Quote & Site Valuation')}
          phone={contact.phone}
        />

        {/* 4. About Section */}
        <AboutSection
          onLearnMoreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. Services Slider (What we buy) */}
        {services.length > 0 && (
          <ServicesSlider
            services={services}
            onRequestService={(title) => scrollToConsultation(`Sell Scrap Offer for: ${title}`)}
          />
        )}

        {/* 6. Free Scrap Container Delivery */}
        <FreeDelivery onGetQuote={() => scrollToConsultation('Request Free Scrap Roll-Off Container Placement')} />

        {/* 7. Why Trust Us to Buy Your Scrap */}
        <WhyTrustSection
          onGetSupport={() => scrollToConsultation('Scrap Pickup & Container Dispatch Inquiry')}
          phone={contact.dispatchPhone}
        />

        {/* 8. Scrap Selling Blog & Guides */}
        {blogs.length > 0 && <BlogSection blogs={blogs} />}

        {/* 9. Location & Interactive Map Preview */}
        <LocationSection
          contact={contact}
          onRequestDropoff={() => scrollToConsultation('Yard Drop-off & Weighbridge Appointment')}
        />
      </main>

      {/* 10. Footer */}
      <Footer
        contact={contact}
        onRequestQuote={() => scrollToConsultation('Material Valuation & Scrap Purchase Request')}
      />
    </div>
  );
}
