'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Bot, Play, Ticket, Users, Music, HardDrive, Smartphone, FlaskConical, Rocket, Infinity, BookOpen, Presentation, Code2 } from 'lucide-react';
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
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const morphs: MorphItem[] = [
    { 
      label: 'X', 
      color: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
      icon: <Infinity size={14} />, 
      subtitle: lang === 'es' ? 'Donde la X es una variable que puede representar cualquier cosa' : 'Where X is a variable that can represent anything'
    },
    { 
      label: 'Dev', 
      color: '#2997ff', 
      icon: <Terminal size={14} />, 
      subtitle: lang === 'es' ? 'Desarrollo de sistemas a medida bajo principios SOLID' : 'Tailored systems engineering under SOLID principles'
    },
    { 
      label: 'AI', 
      color: '#ff007f', 
      icon: <Bot size={14} />, 
      subtitle: lang === 'es' ? 'Integración de modelos de lenguaje, RAG y agentes autónomos' : 'Integration of language models, RAG, & autonomous agents'
    },
    { 
      label: 'Academy', 
      color: '#fbbf24', 
      icon: <BookOpen size={14} />, 
      subtitle: lang === 'es' ? 'Cursos intensivos en línea de desarrollo móvil avanzado' : 'Intensive online bootcamps for advanced mobile development'
    },
    { 
      label: 'Talks', 
      color: '#a370f7', 
      icon: <Presentation size={14} />, 
      subtitle: lang === 'es' ? 'Charlas y conferencias técnicas sobre tecnología móvil' : 'Technical talks & keynotes on mobile technologies'
    },
    { 
      label: 'Events', 
      color: '#2dd4bf', 
      icon: <Ticket size={14} />, 
      subtitle: lang === 'es' ? 'Organización de hackathones y meetups de programadores' : 'Organizing hackathons & developer meetups'
    },
    { 
      label: 'Community', 
      color: '#6366f1', 
      icon: <Users size={14} />, 
      subtitle: lang === 'es' ? 'Construcción y facilitación de comunidades tech' : 'Building & fostering developer communities'
    },
    { 
      label: 'Labs', 
      color: '#ec4899', 
      icon: <FlaskConical size={14} />, 
      subtitle: lang === 'es' ? 'Prototipos rápidos e investigación de software experimental' : 'Rapid prototyping & experimental software research'
    },
    { 
      label: 'Teach', 
      color: '#34c759', 
      icon: <Play size={14} />, 
      subtitle: lang === 'es' ? 'Mentorías personalizadas e instrucción universitaria' : 'One-on-one mentorship & university lectures'
    },
    { 
      label: 'DevRel', 
      color: '#f97316', 
      icon: <Code2 size={14} />, 
      subtitle: lang === 'es' ? 'Conexión y estrategias de Developer Relations para startups' : 'Developer Relations strategies & advocacy for startups'
    }
  ];

  // Typing logic
  useEffect(() => {
    const handleType = () => {
      const current = loopNum % morphs.length;
      const fullText = morphs[current].label;

      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(60); // faster deleting
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(120); // normal typing
      }

      // If typed the whole word
      if (!isDeleting && typedText === fullText) {
        setTypingSpeed(2200); // stay on the completed word for 2.2 seconds
        setIsDeleting(true);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(500); // pause before starting to type next word
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed, morphs.length]);

  const activeIndex = loopNum % morphs.length;
  const active = morphs[activeIndex];

  // Helper to render customized layout frame types
  const renderVisualPanel = () => {
    switch (active.label) {
      case 'Dev':
        // Terminal Window
        return (
          <div className={`${styles.windowFrame} liquid-glass`}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>Developer Workspace — SOLID</span>
            </div>
            <div className={styles.windowBody}>
              <p className={styles.codeLine}><span className={styles.codeKeyword}>class</span> <span className={styles.codeClass}>LizzaX</span> {'{'}</p>
              <p className={styles.codeIndent}><span className={styles.codeAnnotation}>@Override</span></p>
              <p className={styles.codeIndent}><span className={styles.codeKeyword}>fun</span> <span className={styles.codeFunc}>build</span>(goal: <span className={styles.codeType}>String</span>) {'{'}</p>
              <p className={styles.codeDoubleIndent}><span className={styles.codeKeyword}>val</span> code = <span className={styles.codeString}>\"Clean Code & SOLID\"</span></p>
              <p className={styles.codeDoubleIndent}><span className={styles.codeFunc}>compile</span>(code)</p>
              <p className={styles.codeIndent}>{'}'}</p>
              <p className={styles.codeLine}>{'}'}</p>
            </div>
          </div>
        );

      case 'AI':
        // AI chat assistant panel
        return (
          <div className={`${styles.windowFrame} liquid-glass`}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>AI Assistant Node</span>
            </div>
            <div className={styles.aiChatBody}>
              <div className={styles.chatBubbleUser}>
                {lang === 'es' ? 'Integra un modelo RAG local.' : 'Integrate a local RAG model.'}
              </div>
              <div className={styles.chatBubbleBot}>
                <Bot size={14} className={styles.botIcon} style={{ color: active.color }} />
                <span>
                  {lang === 'es' 
                    ? 'Procesando vectorización de base de conocimiento mediante LLaMA 3.2...' 
                    : 'Processing knowledge base vectorization via LLaMA 3.2...'}
                </span>
              </div>
            </div>
          </div>
        );

      case 'Academy':
      case 'Teach':
        // Classroom Portal board
        return (
          <div className={`${styles.tabletFrame} liquid-glass`}>
            <div className={styles.tabletHeader}>
              <div className={styles.tabletCam} />
              <span>Lizza Academy Portal</span>
            </div>
            <div className={styles.tabletBody}>
              <div className={styles.courseHeader}>
                <BookOpen size={16} style={{ color: active.color }} />
                <span className={styles.courseTitle}>Android Jetpack Compose</span>
              </div>
              <ul className={styles.lessonList}>
                <li className={styles.lessonItemCompleted}>
                  <input type="checkbox" checked readOnly className={styles.checkbox} />
                  <span>1. Clean Architecture & MVVM</span>
                </li>
                <li className={styles.lessonItemActive} style={{ borderColor: active.color }}>
                  <div className={styles.activeIndicator} style={{ backgroundColor: active.color }} />
                  <span>2. Unidirectional Data Flow (UDF)</span>
                </li>
                <li className={styles.lessonItemPending}>
                  <div className={styles.pendingIndicator} />
                  <span>3. Local cache database integration</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'Events':
      case 'Talks':
        // Conference Ticket and Slide Deck
        return (
          <div className={`${styles.ticketFrame} liquid-glass`}>
            <div className={styles.ticketBadge} style={{ background: active.color }}>
              {active.label === 'Events' ? 'EVENT TICKET' : 'SLIDE PRESENTATION'}
            </div>
            <div className={styles.ticketMain}>
              <h3 className={styles.ticketTitle}>Lizza X Tech Keynote</h3>
              <p className={styles.ticketPresenter}>Speaker: Gustavo Lizárraga</p>
              <div className={styles.ticketQR} style={{ borderColor: active.color }} />
            </div>
            <div className={styles.ticketMeta}>
              <span>Wyoming, USA</span>
              <span>16,000+ Students invited</span>
            </div>
          </div>
        );

      case 'Community':
        // Chat workspace
        return (
          <div className={`${styles.windowFrame} liquid-glass`}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>Discord — Tech Community</span>
            </div>
            <div className={styles.communityGrid}>
              <div className={styles.channelSidebar}>
                <div className={styles.activeChannel}>#general-chat</div>
                <div className={styles.sidebarChannel}>#announcements</div>
                <div className={styles.sidebarChannel}>#github-campus</div>
              </div>
              <div className={styles.communityMembers}>
                <div className={styles.memberRow}>
                  <div className={styles.onlineStatus} />
                  <span>Gustavo Lizárraga</span>
                </div>
                <div className={styles.memberRow}>
                  <div className={styles.onlineStatus} />
                  <span>GitHub Expert</span>
                </div>
                <div className={styles.memberRow}>
                  <div className={styles.offlineStatus} />
                  <span>Auth0 Ambassador</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Labs':
        // Labs Neural Simulation
        return (
          <div className={`${styles.windowFrame} liquid-glass`}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>Labs Simulator node-42</span>
            </div>
            <div className={styles.labsBody}>
              <div className={styles.spinnerCircle} style={{ borderTopColor: active.color }} />
              <div className={styles.simulationText} style={{ color: active.color }}>
                {lang === 'es' ? 'Simulando red neuronal...' : 'Simulating neural nodes...'}
              </div>
              <div className={styles.graphSkeleton}>
                <div className={styles.graphBar} style={{ height: '30%', backgroundColor: active.color }} />
                <div className={styles.graphBar} style={{ height: '60%', backgroundColor: active.color }} />
                <div className={styles.graphBar} style={{ height: '80%', backgroundColor: active.color }} />
                <div className={styles.graphBar} style={{ height: '50%', backgroundColor: active.color }} />
              </div>
            </div>
          </div>
        );

      case 'DevRel':
        // Metrics panel
        return (
          <div className={`${styles.windowFrame} liquid-glass`}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>DevRel Metrics Dashboard</span>
            </div>
            <div className={styles.metricsBody}>
              <div className={styles.metricGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricNum}>GitHub</div>
                  <div className={styles.metricLbl} style={{ color: active.color }}>Campus Expert</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricNum}>Auth0</div>
                  <div className={styles.metricLbl} style={{ color: active.color }}>Ambassador</div>
                </div>
              </div>
              <div className={styles.devrelWave}>
                <div className={styles.waveItem} style={{ height: '12px', background: active.color }} />
                <div className={styles.waveItem} style={{ height: '28px', background: active.color }} />
                <div className={styles.waveItem} style={{ height: '18px', background: active.color }} />
                <div className={styles.waveItem} style={{ height: '36px', background: active.color }} />
              </div>
            </div>
          </div>
        );

      case 'X':
      default:
        // Default: iPhone Mobile frame
        return (
          <div className={`${styles.phoneMockup} liquid-glass`}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
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
                transition: 'color 0.4s ease'
              }}
            >
              {typedText}
            </span>
            <span className={styles.cursor} style={{ color: active.label === 'X' ? 'var(--secondary)' : active.color }}>|</span>
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
            <div>
              <p className={styles.expText}>{active.subtitle}</p>
              {active.label === 'X' && (
                <p className={styles.expTextSub}>
                  {lang === 'es' ? 'La X es lo que sea que venga después...' : 'The X is whatever comes next...'}
                </p>
              )}
            </div>
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

        {/* Dynamic Showcase Container */}
        <div className={styles.visualContainer}>
          <div 
            className={styles.glassCircle} 
            style={{
              background: active.label === 'X' 
                ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.35) 0%, rgba(var(--secondary-rgb), 0.35) 100%)' 
                : `radial-gradient(circle, ${active.color}40 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          
          {/* Dynamic Mockup Render */}
          {renderVisualPanel()}

          {/* Dynamic Floating Glass Badge */}
          <div className={`${styles.floatingBadge} liquid-glass`}>
            <div className={styles.flexItem}>
              <div className={styles.glowDot} style={{ 
                backgroundColor: active.label === 'X' ? '#34c759' : active.color,
                boxShadow: `0 0 10px ${active.label === 'X' ? '#34c759' : active.color}`
              }} />
              <div>
                <div className={styles.skeletonTitle}>Lizza X Ecosystem</div>
                <div className={styles.skeletonSubtitle}>
                  {active.label === 'X' ? 'X = Variable' : `Focus: Lizza ${active.label}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
