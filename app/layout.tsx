import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Malik Scrap Metal Buyers | We Buy Industrial & Commercial Scrap Metal',
  description: 'Licensed scrap metal buyers in Dubai & UAE. Top cash rates paid for copper wire, brass, aluminum, stainless steel, HMS steel, catalytic converters, batteries, and demolition scrap. Free roll-off bin drop-off and prompt on-site pickup.',
  keywords: 'scrap metal buyers, buy scrap copper, sell scrap metal Dubai, industrial scrap buyers UAE, cash for scrap metal, scrap battery buyers, stainless steel scrap purchase, commercial roll off scrap container, Dubai scrap yard',
  openGraph: {
    title: 'Malik Scrap Metal Buyers | Top Cash Rates for All Scrap Metal',
    description: 'We purchase all types of scrap metal: copper, brass, aluminum, steel, high-temp alloys, and batteries with instant digital weighbridge payout.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
