/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Package, Flame, ShoppingCart, Hammer, Clock, CheckCircle2, ArrowRight, Sparkles, Truck, Shield, Star } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Flame,
    title: "Gaz Domestiques",
    price: "500 F",
    delay: "30-45 minutes",
    description: "Livraison rapide et sécurisée de bouteilles de gaz à domicile. Service disponible 7j/7 avec installation sur demande.",
    points: [
      "Livraison rapide et sécurisée",
      "Bouteilles certifiées et contrôlées",
      "Installation professionnelle incluse",
      "Paiement sécurisé à la livraison",
      "Service d'urgence disponible"
    ],
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    features: ["Express", "Installation", "7j/7"]
  },
  {
    icon: ShoppingCart,
    title: "Alimentation",
    price: "Variable",
    delay: "30-45 minutes",
    description: "Courses et produits alimentaires frais livrés directement chez vous. Large sélection de produits locaux et importés.",
    points: [
      "Produits frais et de qualité garantie",
      "Large sélection locale et importée",
      "Emballage soigné et adapté",
      "Respect strict de la chaîne du froid",
      "Listes de courses sauvegardées"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    features: ["Frais", "Large choix", "Économique"]
  },
  {
    icon: Hammer,
    title: "Matériaux de Construction",
    price: "Sur devis",
    delay: "30-45 minutes",
    description: "Transport professionnel de matériaux de construction pour tous vos projets. Livraison directe sur chantier avec manutention.",
    points: [
      "Transport spécialisé et sécurisé",
      "Livraison directe sur chantier",
      "Manutention professionnelle incluse",
      "Devis personnalisé gratuit",
      "Conseils techniques disponibles"
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    features: ["Professionnel", "Manutention", "Devis gratuit"]
  },
  {
    icon: Package,
    title: "Colis Express",
    price: "500 F",
    delay: "30-45 minutes",
    description: "Envoi et réception de colis en toute sécurité dans tout Agadez. Service de suivi en temps réel et assurance incluse.",
    points: [
      "Suivi en temps réel GPS",
      "Assurance colis incluse",
      "Manipulation soigneuse garantie",
      "Confirmation de livraison",
      "Service de retrait multiple"
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    features: ["Suivi GPS", "Assuré", "Flexible"]
  },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: "500+", label: "Livraisons quotidiennes", icon: Truck },
    { number: "30min", label: "Délai moyen", icon: Clock },
    { number: "98%", label: "Satisfaction client", icon: Star },
    { number: "24h/24", label: "Service disponible", icon: Shield }
  ];

  return (
    <section className="relative min-h-screen py-40 text-white overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/20"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-orange-300 font-medium text-sm">Nos Services Premium</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Nos <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Services</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Découvrez notre gamme complète de services de livraison adaptés à tous vos besoins quotidiens. 
            Rapidité, fiabilité et professionnalisme garantis.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="text-center transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {services.map((service, index:any) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`group relative bg-slate-800/40 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 transition-all duration-500 ${
                  hoveredService === index 
                    ? "transform scale-105 shadow-2xl -translate-y-2 border-orange-500/50" 
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Gradient Border Effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                    hoveredService === index ? "opacity-10" : ""
                  }`}
                ></div>

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`bg-linear-to-br ${service.color} rounded-xl p-3`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-amber-500 text-xl font-bold">{service.price}</div>
                        <div className="flex items-center gap-1 text-orange-400 text-sm">
                          <Clock className="w-4 h-4" />
                          {service.delay}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-700/50 text-orange-300 px-3 py-1 rounded-full text-sm font-medium border border-orange-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Points List */}
                <ul className="space-y-3 mb-8 relative z-10">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link 
                  href={`/commander?service=${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative z-10 group/btn"
                >
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group-hover:shadow-lg">
                    <span>Commander ce service</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </Link>

                {/* Hover Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 blur-xl transition-all duration-500 ${
                    hoveredService === index ? "opacity-5" : ""
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins spécifiques. Nous adaptons nos services 
              pour répondre parfaitement à vos exigences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center gap-3 justify-center"
              >
                <span>Nous contacter</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
              >
                <span>En savoir plus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-3xl rounded-full animate-pulse"></div>
    </section>
  );
};

export default Services;