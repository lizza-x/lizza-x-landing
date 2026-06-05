import { getDictionary, Locale } from '@/utils/get-dictionary';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  if (lang !== 'es' && lang !== 'en') return {};
  
  const dict = await getDictionary(lang);
  
  return {
    title: `Lizza X | ${dict.hero.badge}`,
    description: dict.hero.subtitle,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  if (lang !== 'es' && lang !== 'en') {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar dict={dict} lang={lang} />
      <div style={{ flex: '1 0 auto' }}>
        {children}
      </div>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
