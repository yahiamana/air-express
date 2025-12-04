/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Types and Constants
interface NavItem {
  label: string;
  href: string;
}

interface NavConfig {
  desktop: NavItem[];
  mobile: NavItem[];
}

const NAVIGATION_CONFIG: NavConfig = {
  desktop: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Commander", href: "/commander" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  mobile: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Commander", href: "/commander" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

const SCROLL_THRESHOLD = 20;

// Custom Hooks
const useScrollDetection = (threshold: number = SCROLL_THRESHOLD) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [threshold]);

  return isScrolled;
};

const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const openMenu = useCallback(() => setIsOpen(true), []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle body scroll lock
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
};

const useHydration = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

// Utility Functions
const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

// Components
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

const NavLink = React.memo(({ 
  item, 
  isActive, 
  onClick,
  variant = "desktop" 
}: NavLinkProps) => {
  const baseStyles = `text-white font-medium hover:text-orange-500 transition-colors duration-200 ${
    isActive ? "text-orange-500" : ""
  }`;

  if (variant === "mobile") {
    return (
      <Link
        href={item.href}
        className={`block text-xl py-3 border-b border-slate-700 ${baseStyles}`}
        onClick={onClick}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={`relative text-lg group ${baseStyles}`}
      onClick={onClick}
    >
      {item.label}
      <span 
        className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
});

NavLink.displayName = 'NavLink';

const Logo = React.memo(({ 
  isScrolled, 
  onClick 
}: { 
  isScrolled: boolean; 
  onClick: () => void;
}) => (
  <Link 
    href="/" 
    className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
    onClick={onClick}
  >
    <Image 
      src="/2.png" 
      alt="AÏR EXPRESS Logo" 
      width={isScrolled ? 80 : 100} 
      height={isScrolled ? 80 : 100} 
      priority 
      className="select-none transition-all duration-300"
    />
  </Link>
));

Logo.displayName = 'Logo';

const MenuButton = React.memo(({ 
  isOpen, 
  onClick 
}: { 
  isOpen: boolean; 
  onClick: () => void;
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <button
      className="md:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded p-1 transition-colors duration-200 hover:bg-slate-800"
      onClick={onClick}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onKeyDown={handleKeyDown}
    >
      {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
    </button>
  );
});

MenuButton.displayName = 'MenuButton';

const MobileMenu = React.memo(({ 
  isOpen, 
  onClose,
  currentPath 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  currentPath: string;
}) => (
  <div
    className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none delay-300"
    }`}
    onClick={onClose}
    aria-hidden={!isOpen}
    id="mobile-menu"
  >
    {/* Backdrop */}
    <div 
      className={`absolute inset-0 bg-black transition-opacity duration-300 ${
        isOpen ? "opacity-50" : "opacity-0"
      }`}
    />
    
    {/* Menu Panel - Removed transparency and backdrop blur */}
    <div
      className={`absolute right-0 top-0 h-full w-80 max-w-full bg-slate-900 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation mobile"
    >
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <Logo isScrolled={true} onClick={onClose} />
          <button
            onClick={onClose}
            className="text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Fermer le menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 space-y-2" aria-label="Navigation principale">
          {NAVIGATION_CONFIG.mobile.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={currentPath === item.href}
              onClick={onClose}
              variant="mobile"
            />
          ))}
        </nav>
      </div>
    </div>
  </div>
));

MobileMenu.displayName = 'MobileMenu';

const DesktopNavigation = React.memo(({ currentPath }: { currentPath: string }) => (
  <nav className="hidden md:flex items-center gap-8">
    {NAVIGATION_CONFIG.desktop.map((item) => (
      <NavLink
        key={item.href}
        item={item}
        isActive={currentPath === item.href}
      />
    ))}
  </nav>
));

DesktopNavigation.displayName = 'DesktopNavigation';

const SkeletonLoader = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-transparent py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
      <div className="w-32 h-16 bg-gray-200 animate-pulse rounded"></div>
      <div className="w-8 h-8 bg-gray-200 animate-pulse rounded md:hidden"></div>
    </div>
  </header>
);

// Main Component
const Nav = () => {
  const isMounted = useHydration();
  const isScrolled = useScrollDetection(SCROLL_THRESHOLD);
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const pathname = usePathname();

  if (!isMounted) {
    return <SkeletonLoader />;
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-900 shadow-lg py-2"  // Removed transparency
          : "bg-slate-900 py-4"  // Changed from transparent to solid color
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Logo isScrolled={isScrolled} onClick={closeMenu} />
        
        <DesktopNavigation currentPath={pathname} />
        
        <MenuButton isOpen={isOpen} onClick={toggleMenu} />
      </div>

      <MobileMenu 
        isOpen={isOpen} 
        onClose={closeMenu}
        currentPath={pathname}
      />
    </header>
  );
};

export default Nav;