'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  dict: any;
  lang: 'es' | 'en';
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || (lang === 'es' ? 'Hubo un error al enviar el mensaje.' : 'Failed to send message.'));
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(lang === 'es' ? 'Error de red. Intenta más tarde.' : 'Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.badge}>{lang === 'es' ? 'Contacto' : 'Get In Touch'}</div>
            <h2 className={styles.title}>{dict.contact.title}</h2>
            <p className={styles.subtitle}>{dict.contact.subtitle}</p>
          </div>

          {status === 'success' ? (
            <div className={`${styles.successCard} liquid-glass`}>
              <CheckCircle2 size={48} className={styles.successIcon} />
              <h3 className={styles.successTitle}>{dict.contact.success_title}</h3>
              <p className={styles.successDesc}>{dict.contact.success_desc}</p>
              <button 
                onClick={() => setStatus('idle')} 
                className={`${styles.resetBtn} liquid-glass-hover`}
              >
                {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`${styles.form} liquid-glass`}>
              {status === 'error' && (
                <div className={styles.errorBanner}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>{dict.contact.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder={lang === 'es' ? 'Ej. Juan Pérez' : 'e.g. John Doe'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>{dict.contact.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder={lang === 'es' ? 'juan@ejemplo.com' : 'john@example.com'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>{dict.contact.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={styles.textarea}
                  placeholder={lang === 'es' ? 'Cuéntame acerca de tu aplicación móvil o proyecto web...' : 'Tell me about your mobile app or web project...'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`${styles.submitBtn} liquid-glass-hover`}
              >
                <span>{status === 'sending' ? dict.contact.sending : dict.contact.submit}</span>
                <Send size={16} className={styles.sendIcon} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
