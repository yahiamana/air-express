/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, Clock, Shield, Star, Sparkles, ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroTexts = [
    "Livraison rapide et fiable à Agadez",
    "Votre partenaire de confiance à Agadez", 
    "Service express dans tout Agadez",
    "24h/24, 7j/7 pour vous servir"
  ];

  const features = [
    { 
      icon: Clock, 
      text: "Livraison Express", 
      subtext: "30min max",
      description: "Le service le plus rapide de la ville"
    },
    { 
      icon: Shield, 
      text: "Sécurisé", 
      subtext: "100% Garanti",
      description: "Vos biens en sécurité totale"
    },
    { 
      icon: Star, 
      text: "Premium", 
      subtext: "Service 5★",
      description: "Qualité exceptionnelle garantie"
    },
  ];

  const stats = [
    { number: "500+", label: "Livraisons", icon: Truck },
    { number: "30min", label: "Délai moyen", icon: Clock },
    { number: "98%", label: "Satisfaction", icon: Star },
    { number: "24/7", label: "Disponible", icon: Shield }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => {
      clearInterval(textInterval);
      clearInterval(featureInterval);
    };
  }, [heroTexts.length, features.length]);

  const handleMouseMove = (e:any) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className="relative min-h-screen py-40 flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/20"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-20 left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl px-6 py-3">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
              </div>
              <span className="text-orange-300 font-semibold text-sm">Service Express Agadez</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Livraison
                </span>
                <span className="block">
                  <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    Rapide & Fiable
                  </span>
                </span>
              </h1>

              {/* Rotating Subtitle */}
              <div className="h-16 flex items-center">
                <p className="text-xl md:text-2xl text-gray-300 font-light">
                  {heroTexts[currentTextIndex]}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              <span className="text-orange-400 font-semibold">AÏR EXPRESS</span> — 
              Votre partenaire de confiance pour des livraisons express à Agadez. 
              Service premium disponible 24h/24.
            </p>

            {/* Interactive Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.text}
                    className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                      activeFeature === index
                        ? "bg-orange-500/20 border-orange-500/50 scale-105 shadow-lg"
                        : "bg-slate-800/30 border-slate-700/50 hover:border-orange-500/30"
                    }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`p-2 rounded-xl transition-colors ${
                        activeFeature === index ? "bg-orange-500" : "bg-slate-700/50"
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          activeFeature === index ? "text-white" : "text-orange-400"
                        }`} />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm transition-colors ${
                          activeFeature === index ? "text-orange-300" : "text-white"
                        }`}>
                          {feature.text}
                        </div>
                        <div className="text-orange-400 text-xs font-medium">
                          {feature.subtext}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/commander" className="group flex-1">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center gap-3">
                  <span>Commander Maintenant</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/services" className="group flex-1">
                <button className="w-full border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                  <span>Nos Services</span>
                  <Zap className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="text-center group cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            
            {/* Main Image Container */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" />
              
              {/* Logo Image */}
              <div className="relative z-10">
                <Image 
                  src="/2.png"
                  alt="AÏR EXPRESS - Service de livraison rapide à Agadez"
                  width={600}
                  height={600}
                  className="relative z-10 drop-shadow-[0_0_60px_rgba(255,165,0,0.4)] hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            </div>

            {/* Feature Cards */}
            <div className="absolute -bottom-6 -left-6 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">Express</div>
                  <div className="text-orange-300 text-sm">30min max</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">Sécurisé</div>
                  <div className="text-green-300 text-sm">100% Garanti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform duration-300"
        aria-label="Voir la suite"
      >
        <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse" />
        </div>
      </button>
    </section>
  );
};

export default Hero;