/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useRef } from "react";
import { Flame, ShoppingCart, Wrench, Package, Clock, CheckCircle, ArrowRight, Sparkles, Truck, Star, Shield, Zap } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Gaz domestiques",
    description: "Livraison rapide et sécurisée de bouteilles de gaz à domicile. Service disponible 7j/7 avec installation professionnelle.",
    price: "500 F",
    deliveryTime: "30-45 minutes",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    features: ["Installation incluse", "Service 7j/7", "Urgence 24h/24", "Bouteilles certifiées"]
  },
  {
    id: 2,
    title: "Alimentation",
    description: "Courses et produits alimentaires frais livrés directement chez vous. Produits locaux et importés disponibles.",
    price: "Variable",
    deliveryTime: "30-45 minutes",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    features: ["Produits frais", "Large sélection", "Circuit court", "Emballage adapté"]
  },
  {
    id: 3,
    title: "Matériaux de construction",
    description: "Transport sécurisé de matériaux pour tous vos projets. Livraison sur chantier avec manutention professionnelle incluse.",
    price: "Sur devis",
    deliveryTime: "30-45 minutes",
    icon: Wrench,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    features: ["Transport sécurisé", "Manutention incluse", "Devis gratuit", "Conseil technique"]
  },
  {
    id: 4,
    title: "Colis express",
    description: "Envoi et réception de colis en toute sécurité dans tout Agadez. Service fiable avec suivi GPS et assurance incluse.",
    price: "500 F",
    deliveryTime: "30-45 minutes",
    icon: Package,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    features: ["Suivi GPS", "Assurance incluse", "Service flexible", "Retrait multiple"]
  },
];

const Serv = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement | null>(null);


  const stats = [
    { number: "500+", label: "Livraisons quotidiennes", icon: Truck },
    { number: "30min", label: "Délai moyen", icon: Clock },
    { number: "98%", label: "Satisfaction client", icon: Star },
    { number: "24h/24", label: "Service disponible", icon: Shield }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleMouseMove = (e:any) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 w-full mx-auto overflow-hidden"
      id="services"
    >
      {/* Exact Same Background as Hero */}
      <div className="absolute inset-0 -z-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br w-full from-slate-900 via-slate-800 to-orange-900/30 animate-gradient-x"></div>
        
        {/* Dynamic Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl animate-orb-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-orb-float-delayed"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-orb-float-slow"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] animate-grid-flow"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-orange-400 rounded-full animate-particle-1 opacity-60"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-particle-2 opacity-40"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-orange-300 rounded-full animate-particle-3 opacity-50"></div>

        {/* Mouse-following Spotlight */}
        <div 
          className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl px-6 py-3 mb-8 group hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
              <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
            </div>
            <span className="text-orange-300 font-semibold text-sm">Services Premium Agadez</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nos <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Services</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Des solutions complètes de livraison adaptées à tous vos besoins à Agadez. 
            Rapidité, fiabilité et professionnalisme garantis.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="text-center transition-all duration-500 hover:scale-110 cursor-pointer"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-14 h-14 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-700/50 transition-colors">
                    <IconComponent className="w-7 h-7 text-orange-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
     <div className="flex justify-center items-center">  <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative bg-slate-800/40 backdrop-blur-lg border ${service.borderColor} rounded-3xl p-8 transition-all duration-500 ${
                  hoveredCard === service.id 
                    ? "transform scale-105 shadow-2xl -translate-y-2 glow-effect" 
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Service Header */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`bg-linear-to-br ${service.color} rounded-xl p-3 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-orange-400 font-bold text-xl">{service.price}</div>
                        <div className="flex items-center gap-2 text-orange-300">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{service.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 relative z-10">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/feature">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-gray-300 text-sm group-hover/feature:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="relative z-10">
                  <Link 
                    href={`/commander?service=${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <button className="w-full group/btn bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center gap-3">
                      <span>Commander maintenant</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      <Zap className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 blur-xl transition-all duration-500`} />
              </div>
            );
          })}
        </div></div> 

        {/* Bottom CTA */}
        <div 
          className="text-center mt-20 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '700ms'
          }}
        >
          <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-amber-500/5 opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à révolutionner vos livraisons ?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des centaines de clients satisfaits qui nous font confiance 
                pour leurs livraisons essentielles à Agadez.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center gap-3 justify-center"
                >
                  <span>Demander un devis personnalisé</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="group border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
                >
                  <span>Découvrir notre histoire</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Same Custom Animations as Hero */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-20px) rotate(1deg) scale(1.02); }
          66% { transform: translateY(-10px) rotate(-1deg) scale(0.98); }
        }
        
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        @keyframes orb-float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.05); }
        }

        @keyframes orb-float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }

        @keyframes particle-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -15px) scale(1.2); }
          50% { transform: translate(15px, 10px) scale(0.8); }
          75% { transform: translate(-10px, 15px) scale(1.1); }
        }

        @keyframes particle-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15px, -10px) scale(1.3); }
          66% { transform: translate(10px, 20px) scale(0.7); }
        }

        @keyframes particle-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(25px, 5px) scale(1.4); }
          50% { transform: translate(-5px, -25px) scale(0.6); }
          75% { transform: translate(-20px, 15px) scale(1.2); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-orb-float {
          animation: orb-float 15s ease-in-out infinite;
        }
        .animate-orb-float-delayed {
          animation: orb-float-delayed 18s ease-in-out infinite;
        }
        .animate-orb-float-slow {
          animation: orb-float-slow 20s ease-in-out infinite;
        }
        .animate-particle-1 {
          animation: particle-1 25s ease-in-out infinite;
        }
        .animate-particle-2 {
          animation: particle-2 30s ease-in-out infinite;
        }
        .animate-particle-3 {
          animation: particle-3 35s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 20s ease infinite;
          background-size: 200% 200%;
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .glow-effect {
          box-shadow: 0 0 40px rgba(255, 165, 0, 0.2), 0 0 80px rgba(255, 165, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Serv;