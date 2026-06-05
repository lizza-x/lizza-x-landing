import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Tag } from 'lucide-react';
import { getDictionary, Locale } from '@/utils/get-dictionary';
import { getPostBySlug, renderMarkdown } from '@/utils/markdown';
import styles from './BlogPost.module.css';

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const slug = params.slug;

  if (lang !== 'es' && lang !== 'en') {
    notFound();
  }

  const post = getPostBySlug(slug, lang);
  if (!post) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const htmlContent = renderMarkdown(post.content);

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
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Back navigation */}
        <Link href={`/${lang}#blog`} className={`${styles.backBtn} liquid-glass liquid-glass-hover`}>
          <ChevronLeft size={16} />
          <span>{dict.blog.back_to_blog}</span>
        </Link>

        {/* Article Container */}
        <article className={`${styles.articleCard} liquid-glass`}>
          {/* Category Tag */}
          <div className={`${styles.categoryBadge} liquid-glass`}>
            <Tag size={12} className={styles.tagIcon} />
            <span>{post.category}</span>
          </div>

          <h1 className={styles.postTitle}>{post.title}</h1>

          {/* Meta Information */}
          <div className={styles.postMeta}>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className={styles.metaItem}>
              <User size={14} />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Excerpt panel */}
          <div className={styles.excerptBox}>
            <p>{post.excerpt}</p>
          </div>

          {/* Rendered HTML Body */}
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
}
