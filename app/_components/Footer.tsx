/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Truck, ArrowUp} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Commander", href: "/commander" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Gaz domestiques", href: "/services#gaz" },
    { name: "Alimentation", href: "/services#alimentation" },
    { name: "Matériaux construction", href: "/services#materiaux" },
    { name: "Colis express", href: "/services#colis" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1AFwqyiJLU/?mibextid=wwXIfr",
      icon: Facebook,
      color: "hover:text-blue-500 hover:border-blue-500",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/air_express_agadez_niger?igsh=MWZhZGVwOWtuYmd3bA==",
      icon: Instagram,
      color: "hover:text-pink-500 hover:border-pink-500",
    },
   
  ];

  return (
    <footer className="relative bg-linear-to-b from-slate-900 to-slate-950 border-t border-orange-500/20 mt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Left Section - Brand & Contact */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex flex-col items-start space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image 
                    src="/2.png" 
                    alt="AÏR EXPRESS Logo" 
                    width={80} 
                    height={80} 
                    className="drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-orange-500/10 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AÏR EXPRESS</h2>
                  <p className="text-orange-400 text-sm font-medium">Livraison Express Agadez</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Votre partenaire de confiance pour des livraisons rapides, fiables et locales à Agadez. 
                Service disponible 7j/7 pour répondre à tous vos besoins.
              </p>
            </div>

            {/* Contact & Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  Contactez-nous
                </h3>
                <div className="space-y-3">
                 
                   
                  <a 
                    href="mailto:airexpressaz@hotmail.com" 
                    className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <Mail className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium">airexpressaz@hotmail.com</div>
                      <div className="text-sm text-gray-400">Réponse sous 24h</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Business Info */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Horaires
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium"></div>
                      <div className="text-sm text-gray-400">24h/24</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">Agadez, Niger</div>
                      <div className="text-sm text-gray-400">Zone de livraison</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Nos Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      href={service.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-white text-lg font-semibold mb-4">Suivez-nous</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`p-3 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-300 transition-all duration-300 hover:scale-110 ${social.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Suivez-nous sur ${social.name}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © {new Date().getFullYear()} AÏR EXPRESS Agadez. Tous droits réservés. | 
                <span className="text-orange-400 ml-1">Service de livraison express</span>
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Conditions d’utilisation
              </Link>
              <Link href="/sitemap" className="hover:text-orange-400 transition-colors">
                Plan du site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

     
    </footer>
  );
};

export default Footer;