"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, Clock, Star, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const Pret = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "30-45 min", label: "Délai moyen" },
    { value: "500+", label: "Livraisons" },
    { value: "98%", label: "Satisfaction" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Auto-rotate stats
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(statInterval);
    };
  }, [stats.length]);

  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/20"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-float delay-1000 opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-float delay-500 opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div 
          className={`flex flex-col items-center text-center px-6 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-orange-300 font-medium text-sm">Commander Maintenant</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Prêt à{" "}
            <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              commander
            </span>{" "}
            ?
          </h1>

          {/* Description */}
          <p className="text-gray-300 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
            Rejoignez des centaines de clients satisfaits à Agadez. Livraison{" "}
            <span className="text-orange-400 font-semibold">rapide</span>,{" "}
            <span className="text-orange-400 font-semibold">sécurisée</span> et{" "}
            <span className="text-orange-400 font-semibold">fiable</span> garantie.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl w-full">
            <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Express</div>
                <div className="text-orange-300 text-sm">30-45 min</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Sécurisé</div>
                <div className="text-green-300 text-sm">Garantie</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Premium</div>
                <div className="text-blue-300 text-sm">Service 5★</div>
              </div>
            </div>
          </div>

          {/* Rotating Stats */}
          <div className="mb-12 h-16 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1 transition-all duration-500">
                {stats[currentStat].value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stats[currentStat].label}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/commander"
              className="group relative inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/30"
            >
              <span>Commander maintenant</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              
              {/* Button Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <Truck className="w-5 h-5" />
              <span>Nos services</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Aucun engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Support 24h/24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-3xl rounded-full animate-pulse delay-1000"></div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Pret;