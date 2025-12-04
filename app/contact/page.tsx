/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2,
  HeadphonesIcon,
  Truck,
} from "lucide-react";

// Types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  color: string;
  href?: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

interface InfoItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

// Constants
const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    title: "Email",
    value: "airexpressaz@hotmail.com",
    description: "Réponse sous 24h",
    color: "from-blue-500 to-cyan-500",
    href: "mailto:airexpressaz@hotmail.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Agadez, Niger",
    description: "Zone de livraison",
    color: "from-orange-500 to-amber-500",
    href: "#map",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "24h/24",
    description: "Service 7j/7",
    color: "from-purple-500 to-pink-500",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1AFwqyiJLU/?mibextid=wwXIfr",
    label: "Facebook",
    color: "hover:bg-blue-500 hover:border-blue-500",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/air_express_agadez_niger?igsh=MWZhZGVwOWtuYmd3bA==",
    label: "Instagram",
    color: "hover:bg-pink-500 hover:border-pink-500",
  },
];

const INFO_ITEMS: InfoItem[] = [
  {
    icon: Clock,
    title: "🕒 Temps de réponse",
    description:
      "Nous nous engageons à répondre à toutes vos demandes dans un délai maximum de 24 heures.",
    color: "text-orange-400",
  },
  {
    icon: HeadphonesIcon,
    title: "📞 Support client",
    description:
      "Notre équipe est disponible 7j/7 pour vous accompagner et répondre à vos questions.",
    color: "text-orange-400",
  },
  {
    icon: Truck,
    title: "🚚 Zones de livraison",
    description:
      "Nous couvrons toute la ville d'Agadez et ses environs. Contactez-nous pour vérifier la disponibilité dans votre secteur.",
    color: "text-orange-400",
  },
];

// ✅ Custom Hook for Form State
const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "YOUR_ACCESS_KEY_HERE", // ← replace with your real access key
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
  };
};

// ✅ Components
const BackgroundElements = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-orange-900/20"></div>
    <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
  </div>
);

const ContactMethodCard = ({ method }: { method: ContactMethod }) => {
  const IconComponent = method.icon;
  return (
    <a
      href={method.href}
      className="group relative bg-slate-800/40 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-linear-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>
      <div
        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
      <p className="text-gray-300 font-medium mb-1">{method.value}</p>
      <p className="text-gray-400 text-sm">{method.description}</p>
    </a>
  );
};

const ContactMethodsGrid = ({ isVisible }: { isVisible: boolean }) => (
  <div className="flex justify-center items-center">
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {CONTACT_METHODS.map((method) => (
        <ContactMethodCard key={method.title} method={method} />
      ))}
    </div>
  </div>
);

const FormInput = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  rows,
}: {
  icon: React.ElementType;
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
      <Icon className="w-4 h-4" />
      {label} {required && "*"}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none resize-none"
        required={required}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 outline-none"
        required={required}
        disabled={disabled}
      />
    )}
  </div>
);

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
  >
    {isSubmitting ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        Envoi en cours...
      </>
    ) : (
      <>
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        Envoyer le message
      </>
    )}
  </button>
);

const SuccessMessage = () => (
  <div className="text-center py-12">
    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
    <p className="text-gray-300">
      Nous vous répondrons dans les plus brefs délais.
    </p>
  </div>
);

const ContactForm = () => {
  const { formData, isSubmitting, isSubmitted, handleInputChange, handleSubmit } =
    useContactForm();

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        icon={User}
        label="Nom complet"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Votre nom complet"
        required
        disabled={isSubmitting}
      />

      <FormInput
        icon={Mail}
        label="Adresse email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        type="email"
        placeholder="exemple@email.com"
        required
        disabled={isSubmitting}
      />

      <FormInput
        icon={MessageSquare}
        label="Votre message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        type="textarea"
        placeholder="Décrivez votre demande en détail..."
        rows={6}
        required
        disabled={isSubmitting}
      />

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

const InfoSection = () => (
  <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-8">
    <h3 className="text-2xl font-bold text-white mb-6">
      Informations supplémentaires
    </h3>
    <div className="space-y-6">
      {INFO_ITEMS.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="flex gap-4">
            <div className={`p-3 rounded-xl bg-slate-700/50 h-fit`}>
              <IconComponent className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <h4 className={`${item.color} font-semibold mb-1`}>
                {item.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const SocialCard = ({ social }: { social: SocialLink }) => {
  const IconComponent = social.icon;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-1 bg-slate-700/50 border border-slate-600 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${social.color} group`}
    >
      <IconComponent className="w-6 h-6 text-gray-300 group-hover:text-white mx-auto mb-2" />
      <span className="text-gray-300 group-hover:text-white text-sm font-medium">
        {social.label}
      </span>
    </a>
  );
};

const SocialSection = () => (
  <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-8">
    <h3 className="text-2xl font-bold text-white mb-6">Suivez-nous</h3>
    <p className="text-gray-300 mb-6">
      Restez connecté avec AÏR EXPRESS sur les réseaux sociaux pour les dernières actualités et promotions.
    </p>
    <div className="flex gap-4">
      {SOCIAL_LINKS.map((social) => (
        <SocialCard key={social.label} social={social} />
      ))}
    </div>
  </div>
);

const MapSection = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`transition-all duration-1000 delay-600 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
    id="map"
  >
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Retrouvez-<span className="text-orange-500">nous</span> à Agadez
      </h2>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Découvrez nos différents points d’implantation dans la ville et planifiez votre visite.
      </p>
    </div>
  </div>
);

const HeaderSection = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`text-center mb-20 transition-all duration-1000 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
  >
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
      Contactez-
      <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
        nous
      </span>
    </h1>
    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
      Une question, une demande ou simplement envie de nous parler ? Nous
      sommes là pour vous aider. Remplissez le formulaire ou contactez-nous
      directement.
    </p>
  </div>
);

// ✅ Main Component
export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 text-white py-40 overflow-hidden">
      <BackgroundElements />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <HeaderSection isVisible={isVisible} />
        <ContactMethodsGrid isVisible={isVisible} />

        {/* Main Grid */}
        <div
          className={`grid lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-gray-400">
                    Nous vous répondons rapidement
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <InfoSection />
            <SocialSection />
          </div>
        </div>

        <MapSection isVisible={isVisible} />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-3xl rounded-full animate-pulse"></div>
    </section>
  );
}
