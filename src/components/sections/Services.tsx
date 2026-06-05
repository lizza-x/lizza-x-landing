import React from 'react';
import { Smartphone, Code2, Cpu, Cloud } from 'lucide-react';
import { servicesData } from '@/data/site-data';
import styles from './Services.module.css';

interface ServicesProps {
  dict: any;
  lang: 'es' | 'en';
}

export default function Services({ dict, lang }: ServicesProps) {
  // Helper to render matching icon
  const renderIcon = (iconName: string) => {
    const iconSize = 28;
    switch (iconName) {
      case 'phone':
        return <Smartphone size={iconSize} className={styles.icon} />;
      case 'code':
        return <Code2 size={iconSize} className={styles.icon} />;
      case 'brain':
        return <Cpu size={iconSize} className={styles.icon} />;
      case 'cloud':
        return <Cloud size={iconSize} className={styles.icon} />;
      default:
        return <Code2 size={iconSize} className={styles.icon} />;
    }
  };

  // Helper to resolve nested localized dictionary strings safely
  const getLocalizedString = (key: string) => {
    const keys = key.split('.');
    let value: any = dict;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return '';
      }
    }
    return typeof value === 'string' ? value : '';
  };

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dict.services.title}</h2>
          <div className={styles.titleLine} />
          <p className={styles.subtitle}>{dict.services.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.card} liquid-glass liquid-glass-hover`}
            >
              <div className={`${styles.iconWrapper} liquid-glass`}>
                {renderIcon(service.icon)}
              </div>
              
              <h3 className={styles.cardTitle}>
                {getLocalizedString(service.titleKey)}
              </h3>
              
              <p className={styles.cardDesc}>
                {getLocalizedString(service.descKey)}
              </p>
              
              <div className={styles.techTag}>
                <span className={styles.techLabel}>Stack: </span>
                <span className={styles.techList}>
                  {getLocalizedString(service.techKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
