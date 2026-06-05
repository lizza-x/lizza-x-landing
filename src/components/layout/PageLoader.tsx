'use client';

import React, { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const duration = 1000; // 1s total duration
    const intervalTime = 12;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      currentProgress += step + Math.random() * 3; // Add random jitter for realism
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setMounted(false);
            // Restore scroll
            document.body.style.overflow = '';
          }, 500); // match fadeOut transition duration
        }, 200); // hold at 100% for 200ms
      }
      setProgress(Math.min(100, Math.floor(currentProgress)));
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${styles.loaderContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        {/* Glow circle behind */}
        <div className={styles.glowBg} />
        
        {/* Lizza X Logo */}
        <div className={styles.logoWrapper}>
          <h1 className={`${styles.logoText} text-gradient`}>Lizza X</h1>
        </div>

        {/* Progress Counter & Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBarWrapper}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressPercentage}>
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
