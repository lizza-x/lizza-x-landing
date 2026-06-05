'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  dict: any;
  lang: 'es' | 'en';
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Sync scroll state for glass transparency change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync initial theme
  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
    setTheme(activeTheme);
  }, []);

  // IntersectionObserver to trace active section for menu highlights
  useEffect(() => {
    if (pathname.includes('/about')) {
      setActiveSection('about');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // trigger when occupying screen center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ['services', 'blog', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Observe Hero top too
    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'es' ? 'en' : 'es';
    const pathSegments = pathname.split('/');
    pathSegments[1] = nextLang;
    const newPath = pathSegments.join('/') || `/${nextLang}`;
    router.push(newPath);
  };

  const menuItems = [
    { label: dict.nav.services, href: '/#services', id: 'services' },
    { label: dict.nav.blog, href: '/#blog', id: 'blog' },
    { label: dict.nav.contact, href: '/#contact', id: 'contact' },
    { label: dict.nav.about, href: '/about', id: 'about' },
  ];

  // Helper to determine if a menu item is active
  const isLinkActive = (item: typeof menuItems[0]) => {
    return activeSection === item.id;
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} liquid-glass`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href={`/${lang}`} className={styles.logo}>
          <span className="text-gradient">Lizza X</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.navMenu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={`/${lang}${item.href}`} 
                className={`${styles.navLink} ${isLinkActive(item) ? styles.activeNavLink : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className={styles.actions}>
          <button 
            onClick={toggleLanguage} 
            className={`${styles.iconButton} liquid-glass-hover`}
            aria-label="Toggle language"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe size={18} />
            <span className={styles.langLabel}>{lang.toUpperCase()}</span>
          </button>

          <button 
            onClick={toggleTheme} 
            className={`${styles.iconButton} liquid-glass-hover`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${styles.mobileMenuBtn} ${styles.iconButton}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} liquid-glass`}>
          <ul className={styles.mobileNavMenu}>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={`/${lang}${item.href}`} 
                  className={`${styles.mobileNavLink} ${isLinkActive(item) ? styles.activeMobileNavLink : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
