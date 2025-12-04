"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { 
  Target, 
  Eye, 
  Shield, 
  Zap, 
  Heart, 
  Users, 
  Clock, 
  Truck,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const Apropos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Nous tenons nos promesses. Chaque livraison est effectuée avec soin et ponctualité.",
      color: "from-blue-500 to-cyan-500",
      features: ["Livraison garantie", "Service ponctuel", "Engagement qualité"]
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Nous utilisons les technologies modernes pour offrir un service plus intelligent et rapide.",
      color: "from-purple-500 to-pink-500",
      features: ["Technologie moderne", "Process optimisés", "Solutions intelligentes"]
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Nous plaçons nos clients au centre de tout, pour une relation durable basée sur la confiance.",
      color: "from-orange-500 to-amber-500",
      features: ["Service client dédié", "Relation durable", "Confiance mutuelle"]
    }
  ];

  const stats = [
    { number: "500+", label: "Clients satisfaits", icon: Users },
    { number: "1000+", label: "Livraisons effectuées", icon: Truck },
    { number: "98%", label: "Taux de satisfaction", icon: Star },
    { number: "30min", label: "Délai moyen", icon: Clock }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-rotate values
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [values.length]);

  return (
    <section className="relative min-h-screen py-40 text-white  overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/20"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-orange-300 font-medium text-sm">Notre Histoire</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            À propos de{" "}
            <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              AÏR EXPRESS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12">
            Fondée à Agadez, AÏR EXPRESS est bien plus qu’un service de livraison. 
            Nous sommes les artères de votre ville, connectant les commerces aux foyers 
            avec rapidité, fiabilité et un engagement sans faille envers notre communauté.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
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

        {/* Mission & Vision Section */}
        <div 
          className={`grid lg:grid-cols-2 gap-16 mb-24 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mission */}
          <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-4">Notre Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Révolutionner la livraison à Agadez en fournissant une expérience fluide, 
              rapide et sécurisée. Nous croyons que chaque commande mérite une attention 
              particulière et nous nous engageons à dépasser vos attentes à chaque étape.
            </p>
            <div className="space-y-3">
              {["Livraison express sous 45min", "Service 7j/7", "Support client dédié"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-4">Notre Vision</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Devenir le service de livraison de référence en Afrique de l’Ouest, 
              en alliant technologie de pointe, confiance absolue et excellence 
              opérationnelle pour simplifier la vie quotidienne de nos clients.
            </p>
            <div className="space-y-3">
              {["Expansion régionale", "Innovation technologique", "Excellence durable"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div 
          className={`mb-24 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="text-orange-500">Valeurs</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ces principes fondamentaux guident chacune de nos actions et décisions.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className={`group relative bg-slate-800/40 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 transition-all duration-500 cursor-pointer ${
                    activeValue === index 
                      ? "transform scale-105 shadow-2xl -translate-y-2 border-orange-500/50" 
                      : "hover:shadow-xl hover:-translate-y-1"
                  }`}
                  onMouseEnter={() => setActiveValue(index)}
                >
                  {/* Gradient Background */}
                  <div 
                    className={`absolute inset-0 rounded-3xl bg-linear-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                      activeValue === index ? "opacity-10" : ""
                    }`}
                  ></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div 
                      className={`w-20 h-20 rounded-2xl bg-linear-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                        activeValue === index ? "scale-110" : ""
                      }`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {value.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {value.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-linear-to-r ${value.color}`}></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à découvrir nos services ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez la communauté AÏR EXPRESS et faites l’expérience 
              d’un service de livraison qui place vos besoins au premier plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center gap-3 justify-center"
              >
                <span>Découvrir nos services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
              >
                <span>Nous contacter</span>
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

export default Apropos;