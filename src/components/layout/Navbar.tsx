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

  // Sync scroll state
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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'es' ? 'en' : 'es';
    // Replace the language segment in the URL path
    const pathSegments = pathname.split('/');
    pathSegments[1] = nextLang;
    const newPath = pathSegments.join('/') || `/${nextLang}`;
    router.push(newPath);
  };

  const menuItems = [
    { label: dict.nav.about, href: '#about' },
    { label: dict.nav.services, href: '#services' },
    { label: dict.nav.experience, href: '#experience' },
    { label: dict.nav.blog, href: '#blog' },
    { label: dict.nav.contact, href: '#contact' },
  ];

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
              <Link href={`/${lang}${item.href}`} className={styles.navLink}>
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
                  className={styles.mobileNavLink}
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
