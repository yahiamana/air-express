"use client";
import React, { useState, useEffect } from "react";
import { Clock, Shield, Truck, CheckCircle2, Sparkles, Users, Award, Heart, LucideProps } from "lucide-react";
interface benefit {
    id: number;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
    stat: string;
    color: string;
    delay: string;
}

const BENEFITS:benefit[] = [
  {
    id: 1,
    icon: Clock,
    title: "Livraison Rapide",
    description: "Service express dans toute la ville d'Agadez. Délai moyen de 30-45 minutes garantie.",
    stat: "30-45 min",
    color: "from-blue-500 to-cyan-500",
    delay: "0ms"
  },
  {
    id: 2,
    icon: Shield,
    title: "Fiable et Sécurisé",
    description: "Vos colis en toute sécurité avec garantie satisfait ou remboursé. Service assuré et traçable.",
    stat: "100% Sécurisé",
    color: "from-green-500 to-emerald-500",
    delay: "100ms"
  },
  {
    id: 3,
    icon: Truck,
    title: "Suivi en Temps Réel",
    description: "Restez informé du statut de votre livraison à tout moment via notre plateforme de suivi.",
    stat: "24h/24",
    color: "from-purple-500 to-pink-500",
    delay: "200ms"
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "Service Local",
    description: "Une entreprise d'Agadez, pour les habitants d'Agadez. Nous connaissons parfaitement la ville.",
    stat: "Local",
    color: "from-orange-500 to-amber-500",
    delay: "300ms"
  },
];

const WhyUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/10"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-orange-300 font-medium text-sm">Pourquoi Nous Choisir</span>
          </div>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide bg-linear-to-r from-white to-gray-300 bg-clip-text mb-6">
            Excellence Garantie
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            AÏR EXPRESS s’engage à vous offrir le meilleur service de livraison à Agadez. 
            Découvrez pourquoi des centaines de clients nous font confiance chaque jour.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-2xl mx-auto mb-3">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-sm">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mx-auto mb-3">
                <Truck className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-gray-400 text-sm">Livraisons</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mx-auto mb-3">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mx-auto mb-3">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-gray-400 text-sm">Service</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {BENEFITS.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className={`group relative bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 transition-all duration-500 ${
                  hoveredCard === benefit.id 
                    ? "transform scale-105 shadow-2xl -translate-y-2 border-opacity-50" 
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
                style={{ transitionDelay: benefit.delay }}
                onMouseEnter={() => setHoveredCard(benefit.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background Effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                  <div className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                    
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${benefit.color} opacity-0 group-hover:opacity-30 animate-ping duration-1000`}></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-full px-4 py-2 backdrop-blur-sm mt-4">
                    <span className="text-orange-300 text-sm font-medium">{benefit.stat}</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${benefit.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white text-2xl font-bold mb-4">
              Prêt à essayer notre service ?
            </h3>
            <p className="text-gray-300 mb-6">
              Rejoignez des centaines de clients satisfaits à Agadez. 
              Livraison rapide, sécurisée et fiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Commander Maintenant
              </button>
              <button className="border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105">
                En Savoir Plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;