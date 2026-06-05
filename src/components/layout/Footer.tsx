import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  dict: any;
  lang: 'es' | 'en';
}

export default function Footer({ dict, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Link href={`/${lang}`} className={styles.logo}>
              <span className="text-gradient">Lizza X</span>
            </Link>
            <p className={styles.description}>
              {lang === 'es' 
                ? 'Desarrollo de software premium y soluciones avanzadas de IA para el mercado global.' 
                : 'Premium software development and advanced AI solutions for the global market.'}
            </p>
            <address className={styles.address}>
              <strong>Lizza X LLC</strong><br />
              30 N Gould St, Ste N<br />
              Sheridan, WY 82801<br />
              United States
            </address>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.title}>{lang === 'es' ? 'Navegación' : 'Navigation'}</h4>
            <ul className={styles.links}>
              <li><a href="#about">{dict.nav.about}</a></li>
              <li><a href="#services">{dict.nav.services}</a></li>
              <li><a href="#experience">{dict.nav.experience}</a></li>
              <li><a href="#blog">{dict.nav.blog}</a></li>
              <li><a href="#contact">{dict.nav.contact}</a></li>
            </ul>
          </div>

          <div className={styles.socialGroup}>
            <h4 className={styles.title}>{lang === 'es' ? 'Contacto & Redes' : 'Connect'}</h4>
            <div className={styles.socialIcons}>
              <a 
                href="https://github.com/lizza-x" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialLink} liquid-glass-hover`}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/gustavolizarraga" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialLink} liquid-glass-hover`}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://x.com/lizza_x" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialLink} liquid-glass-hover`}
                aria-label="Twitter / X"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:gustavo@lizzax.com" 
                className={`${styles.socialLink} liquid-glass-hover`}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} <strong>Lizza X LLC</strong>. {dict.footer.rights}
          </p>
          <p className={styles.legal}>
            Wyoming Filing ID: 2025-001769271
          </p>
        </div>
      </div>
    </footer>
  );
}
