import { notFound } from 'next/navigation';
import { getDictionary, Locale } from '@/utils/get-dictionary';
import About from '@/components/sections/About';

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage(props: AboutPageProps) {
  const params = await props.params;
  const lang = params.lang as Locale;

  if (lang !== 'es' && lang !== 'en') {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div style={{ paddingTop: '64px' }}>
      <About dict={dict} lang={lang} />
    </div>
  );
}
