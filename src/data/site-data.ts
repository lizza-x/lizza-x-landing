export interface ServiceData {
  id: string;
  icon: 'phone' | 'code' | 'brain' | 'cloud' | 'play' | 'users';
  titleKey: string;
  descKey: string;
  techKey: string;
}

export interface JobData {
  roleKey: string;
  company: string;
  period: string;
  descKey: string;
}

export interface TechItem {
  name: string;
  category: 'mobile' | 'web' | 'ai' | 'cloud';
}

export const servicesData: ServiceData[] = [
  {
    id: 'mobile',
    icon: 'phone',
    titleKey: 'services.mobile.title',
    descKey: 'services.mobile.desc',
    techKey: 'services.mobile.tech',
  },
  {
    id: 'software',
    icon: 'code',
    titleKey: 'services.software.title',
    descKey: 'services.software.desc',
    techKey: 'services.software.tech',
  },
  {
    id: 'ai',
    icon: 'brain',
    titleKey: 'services.ai.title',
    descKey: 'services.ai.desc',
    techKey: 'services.ai.tech',
  },
  {
    id: 'cloud',
    icon: 'cloud',
    titleKey: 'services.cloud.title',
    descKey: 'services.cloud.desc',
    techKey: 'services.cloud.tech',
  },
  {
    id: 'academy',
    icon: 'play',
    titleKey: 'services.academy.title',
    descKey: 'services.academy.desc',
    techKey: 'services.academy.tech',
  },
  {
    id: 'devrel',
    icon: 'users',
    titleKey: 'services.devrel.title',
    descKey: 'services.devrel.desc',
    techKey: 'services.devrel.tech',
  },
];

export const techStackData: TechItem[] = [
  // Mobile
  { name: 'Kotlin', category: 'mobile' },
  { name: 'Swift', category: 'mobile' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'Kotlin Multiplatform', category: 'mobile' },
  { name: 'Jetpack Compose', category: 'mobile' },
  { name: 'SwiftUI', category: 'mobile' },
  // Web
  { name: 'React', category: 'web' },
  { name: 'Next.js', category: 'web' },
  { name: 'TypeScript', category: 'web' },
  { name: 'Vanilla CSS', category: 'web' },
  // AI
  { name: 'OpenAI API', category: 'ai' },
  { name: 'LangChain', category: 'ai' },
  { name: 'Gemini Edge / Nano', category: 'ai' },
  { name: 'CoreML', category: 'ai' },
  // Cloud
  { name: 'AWS', category: 'cloud' },
  { name: 'Supabase', category: 'cloud' },
  { name: 'Serverless Functions', category: 'cloud' },
  { name: 'PostgreSQL', category: 'cloud' },
  { name: 'GitHub Actions', category: 'cloud' },
];

export const founderStats = {
  experienceValue: '13+',
  appsValue: '45+',
  studentsValue: '16,000+',
};
