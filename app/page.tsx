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
import { WhatsAppButton } from '@/client/components/WhatsAppButton';
import {
  fetchContactInfo,
  fetchServices,
  fetchBlogs,
} from '@/client/lib/api';
import {
  defaultContact,
  fallbackServices,
  fallbackBlogs,
} from '@/client/lib/fallbackData';
import { ServiceItem, BlogPost, ContactInfo } from '@/client/types';

export default function HomePage() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [activeSection, setActiveSection] = useState('home');

  const loadData = async () => {
    try {
      const [c, s, b] = await Promise.all([
        fetchContactInfo().catch(() => defaultContact),
        fetchServices().catch(() => []),
        fetchBlogs().catch(() => []),
      ]);
      if (c && c.companyName) setContact(c);
      if (s && s.length > 0) setServices(s);
      if (b && b.length > 0) setBlogs(b);
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
      const sections = ['home', 'services', 'about', 'delivery', 'why-trust', 'blog', 'location', 'contact'];
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
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactUs={() => scrollToConsultation('Sell Scrap - Request Quote & Site Valuation')}
          phone={contact.phone}
        />

        {/* 4. Services Section: Directly below Hero section with "View All Services" button */}
        <section id="services">
          <ServicesSlider
            services={services}
            onRequestService={(title) => scrollToConsultation(`Sell Scrap Offer for: ${title}`)}
          />
        </section>

        {/* 5. About Section: Single, solid, well-designed element */}
        <section id="about">
          <AboutSection
            onLearnMoreServices={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* 6. Free Scrap Container Delivery */}
        <section id="delivery">
          <FreeDelivery onGetQuote={() => scrollToConsultation('Request Free Scrap Roll-Off Container Placement')} />
        </section>

        {/* 7. Why Trust Our Services */}
        <section id="why-trust">
          <WhyTrustSection
            onGetSupport={() => scrollToConsultation('Scrap Pickup & Container Dispatch Inquiry')}
            phone={contact.dispatchPhone}
          />
        </section>

        {/* 8. Blog Section: Directly below Why Trust Our Services, matching Services layout */}
        <section id="blog">
          <BlogSection blogs={blogs} />
        </section>

        {/* 9. Location & Interactive Map Preview */}
        <section id="location">
          <LocationSection
            contact={contact}
            onRequestDropoff={() => scrollToConsultation('Yard Drop-off & Weighbridge Appointment')}
          />
        </section>
      </main>

      {/* 10. Footer */}
      <Footer
        contact={contact}
        onRequestQuote={() => scrollToConsultation('Material Valuation & Scrap Purchase Request')}
      />

      {/* 11. Floating WhatsApp Quick Action Button */}
      <WhatsAppButton phone={contact.dispatchPhone || contact.phone} />
    </div>
  );
}
