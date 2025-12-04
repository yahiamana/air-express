import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Air Express | Fast & Reliable Delivery in Agadez, Niger",
    template: "%s | Air Express",
  },
  description:
    "Air Express offers fast, affordable, and reliable parcel delivery services across Agadez, Niger. Track your packages easily and enjoy same-day delivery with trusted local couriers.",
  keywords: [
    "Air Express",
    "delivery Agadez",
    "parcel delivery Niger",
    "courier service Agadez",
    "same day delivery",
    "shipping Niger",
    "local delivery service",
    "express transport",
    "Air Express Niger",
  ],
  authors: [{ name: "Air Express Team", url: "https://airexpress.com" }],
  creator: "Air Express",
  publisher: "Air Express",
  openGraph: {
    title: "Air Express | Fast & Reliable Delivery in Agadez, Niger",
    description:
      "Send and receive packages quickly and safely in Agadez with Air Express — your trusted delivery partner in Niger.",
    url: "https://airexpress.com",
    siteName: "Air Express",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://airexpress.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Air Express Delivery Service in Agadez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Express | Reliable Delivery in Agadez, Niger",
    description:
      "Fast, secure, and affordable parcel delivery across Agadez with Air Express.",
    images: ["https://airexpress.com/og-image.jpg"],
    creator: "@AirExpress",
  },
  alternates: {
    canonical: "https://airexpress.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <Nav/>
        <div className="absolute inset-0 bg-linear-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
