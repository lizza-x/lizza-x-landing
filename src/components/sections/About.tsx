'use client';

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { founderStats, techStackData } from '@/data/site-data';
import styles from './About.module.css';

interface AboutProps {
  dict: any;
  lang: 'es' | 'en';
}

type TabType = 'all' | 'mobile' | 'web' | 'ai' | 'cloud';

export default function About({ dict, lang }: AboutProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredTech = activeTab === 'all'
    ? techStackData
    : techStackData.filter(tech => tech.category === activeTab);

  const categories: { value: TabType; labelES: string; labelEN: string }[] = [
    { value: 'all', labelES: 'Todo', labelEN: 'All' },
    { value: 'mobile', labelES: 'Mobile', labelEN: 'Mobile' },
    { value: 'web', labelES: 'Web/SaaS', labelEN: 'Web/SaaS' },
    { value: 'ai', labelES: 'Inteligencia Artificial', labelEN: 'AI Solutions' },
    { value: 'cloud', labelES: 'Cloud/Backend', labelEN: 'Cloud/Backend' },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Founder Bio Block */}
        <div className={styles.founderBlock}>
          <div className={styles.visualColumn}>
            {/* Liquid Glass Profiler Card */}
            <div className={`${styles.avatarCard} liquid-glass`}>
              <div className={styles.avatarInner}>
                {/* Abstract animated initials since we don't have user photo */}
                <div className={styles.initialsGlow}>GL</div>
              </div>
              <h3 className={styles.founderName}>{dict.about.founder_title}</h3>
              <p className={styles.founderRole}>{dict.about.founder_role}</p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} text-gradient`}>{founderStats.experienceValue}</span>
                  <span className={styles.statLbl}>{dict.about.stats.experience}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} text-gradient`}>{founderStats.appsValue}</span>
                  <span className={styles.statLbl}>{dict.about.stats.apps}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statVal} text-gradient`}>{founderStats.studentsValue}</span>
                  <span className={styles.statLbl}>{dict.about.stats.students}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.textColumn}>
            <div className={styles.badge}>{lang === 'es' ? 'El Fundador' : 'The Founder'}</div>
            <h2 className={styles.title}>{dict.about.title}</h2>
            <p className={styles.bioText}>{dict.about.bio_p1}</p>
            <p className={styles.bioText}>{dict.about.bio_p2}</p>
            
            <div className={styles.keyAttributes}>
              <div className={styles.attrItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>{lang === 'es' ? 'Código limpio bajo principios SOLID' : 'Clean code following SOLID principles'}</span>
              </div>
              <div className={styles.attrItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>{lang === 'es' ? 'Enfoque absoluto en UI/UX fluida y responsiva' : 'Absolute focus on fluid & responsive UI/UX'}</span>
              </div>
              <div className={styles.attrItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>{lang === 'es' ? 'Integración nativa de IA en flujos móviles' : 'Native AI integration in mobile workflows'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Timeline Segment */}
        <div id="experience" className={styles.experienceBlock}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subTitle}>{dict.experience.title}</h2>
            <div className={styles.titleLine} />
            <p className={styles.subSubtitle}>{dict.experience.subtitle}</p>
          </div>

          <div className={styles.timeline}>
            {dict.experience.jobs.map((job: any, index: number) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDot}>
                  <Briefcase size={14} className={styles.dotIcon} />
                </div>
                <div className={`${styles.timelineContent} liquid-glass liquid-glass-hover`}>
                  <span className={styles.timelinePeriod}>{job.period}</span>
                  <h3 className={styles.timelineRole}>{job.role}</h3>
                  <h4 className={styles.timelineCompany}>{job.company}</h4>
                  <p className={styles.timelineDesc}>{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Skill Stack Section */}
        <div className={styles.techStackBlock}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subTitle}>
              {lang === 'es' ? 'Ecosistema Tecnológico' : 'Technology Ecosystem'}
            </h2>
            <div className={styles.titleLine} />
            <p className={styles.subSubtitle}>
              {lang === 'es' 
                ? 'El conjunto de tecnologías que utilizo para construir productos robustos, veloces y mantenibles.' 
                : 'The toolset I leverage to engineer robust, high-speed, and maintainable products.'}
            </p>
          </div>

          {/* Skill Filter Tabs */}
          <div className={styles.tabsContainer}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveTab(cat.value)}
                className={`${styles.tabBtn} ${activeTab === cat.value ? styles.tabBtnActive : ''} liquid-glass`}
              >
                {lang === 'es' ? cat.labelES : cat.labelEN}
              </button>
            ))}
          </div>

          {/* Skill List */}
          <div className={styles.techGrid}>
            {filteredTech.map((tech) => (
              <div 
                key={tech.name} 
                className={`${styles.techBadge} liquid-glass liquid-glass-hover`}
              >
                <span className={styles.techDot} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
