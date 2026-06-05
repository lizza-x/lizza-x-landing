'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Bot, Play, Ticket, Users, Music, HardDrive, Smartphone, FlaskConical, Rocket, Infinity } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  dict: any;
  lang: 'es' | 'en';
}

interface MorphItem {
  label: string;
  color: string;
  icon: React.ReactNode;
  subtitle: string;
}

export default function Hero({ dict, lang }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const morphs: MorphItem[] = [
    { 
      label: 'Dev', 
      color: '#2997ff', 
      icon: <Terminal size={14} />, 
      subtitle: lang === 'es' ? 'Desarrollo de software con código limpio y SOLID' : 'Software development with clean & SOLID code'
    },
    { 
      label: 'AI', 
      color: '#ff007f', 
      icon: <Bot size={14} />, 
      subtitle: lang === 'es' ? 'Modelos de lenguaje (LLMs) y automatizaciones' : 'Language models (LLMs) & automation workflow'
    },
    { 
      label: 'Learn', 
      color: '#fbbf24', 
      icon: <Play size={14} />, 
      subtitle: lang === 'es' ? 'Capacitación y mentorías de ingeniería avanzada' : 'Advanced engineering training & mentorship'
    },
    { 
      label: 'Events', 
      color: '#2dd4bf', 
      icon: <Ticket size={14} />, 
      subtitle: lang === 'es' ? 'Organización de meetups y conferencias tech' : 'Organizing tech meetups & developer conferences'
    },
    { 
      label: 'Community', 
      color: '#a370f7', 
      icon: <Users size={14} />, 
      subtitle: lang === 'es' ? 'Construcción de comunidades de programadores' : 'Building active developer communities'
    },
    { 
      label: 'Media', 
      color: '#34c759', 
      icon: <Music size={14} />, 
      subtitle: lang === 'es' ? 'Creación de contenido educativo y podcasts' : 'Educational content creation & tech podcasts'
    },
    { 
      label: 'Cloud', 
      color: '#ef4444', 
      icon: <HardDrive size={14} />, 
      subtitle: lang === 'es' ? 'Arquitecturas serverless y bases de datos' : 'Serverless architecture & robust databases'
    },
    { 
      label: 'Mobile', 
      color: '#6366f1', 
      icon: <Smartphone size={14} />, 
      subtitle: lang === 'es' ? 'Apps móviles nativas (KMP, Android, iOS)' : 'Native mobile apps (KMP, Android, iOS)'
    },
    { 
      label: 'Labs', 
      color: '#ec4899', 
      icon: <FlaskConical size={14} />, 
      subtitle: lang === 'es' ? 'Experimentos de software y prototipado rápido' : 'Software experimentation & rapid prototyping'
    },
    { 
      label: 'Future', 
      color: '#f97316', 
      icon: <Rocket size={14} />, 
      subtitle: lang === 'es' ? 'Visión tecnológica para escalar tu negocio' : 'Technology vision to scale your business'
    },
    { 
      label: 'X', 
      color: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
      icon: <Infinity size={14} />, 
      subtitle: lang === 'es' ? 'Donde X puede representar cualquier cosa' : 'Where X can represent anything'
    }
  ];

  // Rotate items every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % morphs.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [morphs.length]);

  const active = morphs[activeIndex];

  // Render different screen UI mockup for each morphing state
  const renderPhoneScreen = () => {
    switch (active.label) {
      case 'Dev':
        return (
          <div className={styles.terminalScreen}>
            <div className={styles.termHeader}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.termBody}>
              <p className={styles.termLineBlue}>$ git push origin main</p>
              <p className={styles.termLineGreen}>Enumerating objects: 45, done.</p>
              <p className={styles.termLine}>Counting objects: 100% (45/45), done.</p>
              <p className={styles.termLinePurple}>Delta compression using up to 8 threads</p>
              <p className={styles.termLine}>Writing objects: 100% (45/45), 9.61 KiB</p>
              <p className={styles.termLineGreen}>To github.com:lizza-x/landing.git</p>
              <p className={styles.termLineGreen}> * [new branch]      main -{'>'} main</p>
            </div>
          </div>
        );
      case 'AI':
        return (
          <div className={styles.aiChatScreen}>
            <div className={styles.chatBubbleUser}>
              {lang === 'es' ? 'Genera la arquitectura para mi app móvil' : 'Generate architecture for my mobile app'}
            </div>
            <div className={styles.chatBubbleBot}>
              <Bot size={12} className={styles.botIcon} />
              <span>
                {lang === 'es' 
                  ? 'Recomiendo Clean Architecture compartiendo la lógica en Kotlin Multiplatform (KMP)...' 
                  : 'I recommend Clean Architecture with shared logic using Kotlin Multiplatform (KMP)...'}
              </span>
            </div>
          </div>
        );
      case 'Learn':
        return (
          <div className={styles.videoPlayerScreen}>
            <div className={styles.videoThumbnail}>
              <Play size={20} className={styles.playIcon} />
            </div>
            <div className={styles.videoMeta}>
              <div className={styles.videoTitle}>Jetpack Compose Essentials</div>
              <div className={styles.videoProgress}>
                <div className={styles.progressBar} />
              </div>
            </div>
          </div>
        );
      case 'Events':
        return (
          <div className={styles.ticketScreen}>
            <div className={styles.ticketBadge}>TICKET</div>
            <div className={styles.ticketTitle}>Lizza Dev Summit 2026</div>
            <div className={styles.ticketQR} />
            <div className={styles.ticketFooter}>Wyoming - Virtual</div>
          </div>
        );
      case 'Community':
        return (
          <div className={styles.communityScreen}>
            <div className={styles.channelHeader}>#general-chat</div>
            <div className={styles.memberList}>
              <div className={styles.memberItem}>
                <span className={styles.activeDot} />
                <span>Gustavo Lizarraga (Founder)</span>
              </div>
              <div className={styles.memberItem}>
                <span className={styles.activeDot} />
                <span>Alice Smith (React Dev)</span>
              </div>
              <div className={styles.memberItem}>
                <span className={styles.offlineDot} />
                <span>Bob Martin (Kotlin Eng)</span>
              </div>
            </div>
          </div>
        );
      case 'Media':
        return (
          <div className={styles.mediaScreen}>
            <div className={styles.audioWave}>
              <div className={`${styles.waveBar} ${styles.wave1}`} />
              <div className={`${styles.waveBar} ${styles.wave2}`} />
              <div className={`${styles.waveBar} ${styles.wave3}`} />
              <div className={`${styles.waveBar} ${styles.wave4}`} />
              <div className={`${styles.waveBar} ${styles.wave5}`} />
            </div>
            <div className={styles.podcastMeta}>
              <div className={styles.podcastTitle}>The Mobile Engine</div>
              <div className={styles.podcastEp}>Episode 42: Flutter vs KMP</div>
            </div>
          </div>
        );
      case 'Cloud':
        return (
          <div className={styles.cloudScreen}>
            <div className={styles.dashboardMetric}>
              <span className={styles.metricLabel}>API Requests</span>
              <span className={styles.metricVal}>99.98%</span>
            </div>
            <div className={styles.chartMockup}>
              <div className={styles.chartBar} style={{ height: '30%' }} />
              <div className={styles.chartBar} style={{ height: '55%' }} />
              <div className={styles.chartBar} style={{ height: '80%' }} />
              <div className={styles.chartBar} style={{ height: '70%' }} />
              <div className={styles.chartBar} style={{ height: '95%' }} />
            </div>
          </div>
        );
      case 'Mobile':
        return (
          <div className={styles.mobileAppScreen}>
            <div className={styles.appHeader}>
              <span>Lizza Wallet</span>
            </div>
            <div className={styles.balanceCard}>
              <div className={styles.balanceTitle}>Balance</div>
              <div className={styles.balanceAmount}>$12,450.00</div>
            </div>
            <div className={styles.flexGrid}>
              <div className={styles.gridBtn}>Send</div>
              <div className={styles.gridBtn}>Receive</div>
            </div>
          </div>
        );
      case 'Labs':
        return (
          <div className={styles.labsScreen}>
            <div className={styles.spinnerWrapper}>
              <div className={styles.labSpinner} />
            </div>
            <div className={styles.labText}>Simulating Neural Node...</div>
          </div>
        );
      case 'Future':
        return (
          <div className={styles.futureScreen}>
            <div className={styles.cosmicCircle} />
            <div className={styles.futureText}>X = Next Big Thing</div>
          </div>
        );
      case 'X':
      default:
        return (
          <div className={styles.defaultScreen}>
            <div className={styles.screenHeader}>
              <div className={styles.avatarPlaceholder} />
              <div className={styles.textSkeletonLineLong} />
            </div>
            <div className={styles.screenBody}>
              <div className={`${styles.cardSkeleton} ${styles.glowCard}`} />
              <div className={styles.cardSkeleton} />
              <div className={styles.cardSkeleton} />
            </div>
          </div>
        );
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={`${styles.badge} liquid-glass`}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>{dict.hero.badge}</span>
          </div>
          
          <h1 className={styles.title}>
            Lizza{' '}
            <span 
              className={styles.dynamicWord} 
              style={{
                background: active.label === 'X' ? active.color : 'none',
                WebkitTextFillColor: active.label === 'X' ? 'transparent' : 'initial',
                color: active.label !== 'X' ? active.color : 'transparent',
                transition: 'color 0.4s ease, background 0.4s ease'
              }}
            >
              {active.label}
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            {dict.hero.subtitle}
          </p>

          {/* Sincronized Dynamic Text Explanation */}
          <div className={`${styles.morphExplanation} liquid-glass`}>
            <div className={styles.expIcon} style={{ 
              borderColor: active.label === 'X' ? 'var(--primary)' : active.color,
              color: active.label === 'X' ? 'var(--primary)' : active.color 
            }}>
              {active.icon}
            </div>
            <p className={styles.expText}>{active.subtitle}</p>
          </div>
          
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
          <div 
            className={styles.glassCircle} 
            style={{
              background: active.label === 'X' 
                ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.35) 0%, rgba(var(--secondary-rgb), 0.35) 100%)' 
                : `radial-gradient(circle, ${active.color}40 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          
          {/* Glass Phone Mockup */}
          <div className={`${styles.phoneMockup} liquid-glass`}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              {renderPhoneScreen()}
            </div>
          </div>

          {/* Dynamic Floating Glass Badge */}
          <div className={`${styles.floatingBadge} liquid-glass`}>
            <div className={styles.flexItem}>
              <div className={styles.glowDot} style={{ 
                backgroundColor: active.label === 'X' ? '#34c759' : active.color,
                boxShadow: `0 0 10px ${active.label === 'X' ? '#34c759' : active.color}`
              }} />
              <div>
                <div className={styles.skeletonTitle}>Lizza X Platform</div>
                <div className={styles.skeletonSubtitle}>
                  {active.label === 'X' ? 'X = Expandable variable' : `Focus: Lizza ${active.label}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
