import { notFound } from 'next/navigation';
import { getDictionary, Locale } from '@/utils/get-dictionary';
import { getAllPosts } from '@/utils/markdown';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import BlogSection from '@/components/sections/BlogSection';
import ContactForm from '@/components/sections/ContactForm';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const lang = params.lang as Locale;
  
  if (lang !== 'es' && lang !== 'en') {
    notFound();
  }

  const dict = await getDictionary(lang);
  const posts = getAllPosts(lang);

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <About dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <BlogSection dict={dict} lang={lang} posts={posts} />
      <ContactForm dict={dict} lang={lang} />
    </>
  );
}
