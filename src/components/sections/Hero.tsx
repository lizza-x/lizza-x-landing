import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  dict: any;
  lang: 'es' | 'en';
}

export default function Hero({ dict, lang }: HeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={`${styles.badge} liquid-glass`}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>{dict.hero.badge}</span>
          </div>
          
          <h1 className={styles.title}>
            {dict.hero.title_part1}{' '}
            <span className="text-gradient">{dict.hero.title_part2}</span>
          </h1>
          
          <p className={styles.subtitle}>
            {dict.hero.subtitle}
          </p>
          
          <div className={styles.ctaGroup}>
            <a href="#contact" className={`${styles.btnPrimary} liquid-glass-hover`}>
              {dict.hero.cta_primary}
              <ArrowRight size={16} />
            </a>
            <a href="#blog" className={`${styles.btnSecondary} liquid-glass-hover`}>
              {dict.hero.cta_secondary}
            </a>
          </div>
        </div>

        {/* Liquid Glass Apple Visual */}
        <div className={styles.visualContainer}>
          <div className={styles.glassCircle} />
          
          {/* Glass Phone Mockup */}
          <div className={`${styles.phoneMockup} liquid-glass`}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <div className={styles.screenHeader}>
                <div className={styles.avatarPlaceholder} />
                <div className={styles.textSkeletonLineLong} />
              </div>
              <div className={styles.screenBody}>
                <div className={styles.cardSkeleton} />
                <div className={styles.cardSkeleton} />
                <div className={styles.cardSkeleton} />
              </div>
            </div>
          </div>

          {/* Floater Liquid Glass Badge */}
          <div className={`${styles.floatingBadge} liquid-glass`}>
            <div className={styles.flexItem}>
              <div className={styles.glowDot} />
              <div>
                <div className={styles.skeletonTitle}>Lizza X KMP</div>
                <div className={styles.skeletonSubtitle}>Shared Logic active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
