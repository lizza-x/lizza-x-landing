import React from 'react';
import Link from 'next/link';
import { Calendar, Tag, ArrowUpRight } from 'lucide-react';
import styles from './BlogSection.module.css';
import { BlogPost } from '@/utils/markdown';

interface BlogSectionProps {
  dict: any;
  lang: 'es' | 'en';
  posts: BlogPost[];
}

export default function BlogSection({ dict, lang, posts }: BlogSectionProps) {
  // Show only 3 posts on landing page
  const featuredPosts = posts.slice(0, 3);

  // Helper to format date
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const locale = lang === 'es' ? 'es-ES' : 'en-US';
      return new Date(dateString).toLocaleDateString(locale, options);
    } catch {
      return dateString;
    }
  };

  return (
    <section id="blog" className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dict.blog.title}</h2>
          <div className={styles.titleLine} />
          <p className={styles.subtitle}>{dict.blog.subtitle}</p>
        </div>

        {featuredPosts.length === 0 ? (
          <div className={`${styles.noPosts} liquid-glass`}>
            <p>
              {lang === 'es' 
                ? 'Pronto publicaremos nuevos artículos. ¡Mantente al tanto!' 
                : 'New articles will be published soon. Stay tuned!'}
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {featuredPosts.map((post) => (
              <article 
                key={post.slug} 
                className={`${styles.postCard} liquid-glass liquid-glass-hover`}
              >
                <div className={styles.postMeta}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className={`${styles.categoryBadge} liquid-glass`}>
                    <Tag size={10} className={styles.tagIcon} />
                    <span>{post.category}</span>
                  </div>
                </div>

                <h3 className={styles.postTitle}>
                  <Link href={`/${lang}/blog/${post.slug}`} className={styles.postLink}>
                    {post.title}
                  </Link>
                </h3>

                <p className={styles.postExcerpt}>{post.excerpt}</p>

                <div className={styles.postFooter}>
                  <Link href={`/${lang}/blog/${post.slug}`} className={styles.readMoreBtn}>
                    <span>{dict.blog.read_more}</span>
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
