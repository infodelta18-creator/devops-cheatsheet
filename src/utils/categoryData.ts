export const categories = [
  'CI-CD',
  'Containerization',
  'Cloud',
  'Infrastructure-Management',
  'Version-Control',
  'Security',
  'Networking',
  'Monitoring',
] as const;

export type Category = typeof categories[number];

export const TOTAL_CATEGORIES = categories.length;

export const categoryData: Record<Category, {
  description: string;
  toolCount: number;
  color: string;
}> = {
  'CI-CD': {
    description: 'Uzluksiz integratsiya va uzluksiz joylashtirish vositalari va amaliyotlari',
    toolCount: 25,
    color: 'blue'
  },
  'Containerization': {
    description: 'Konteyner texnologiyalari va orkestrlash vositalari',
    toolCount: 18,
    color: 'orange'
  },
  'Cloud': {
    description: 'Bulutli platformalar va xizmatlar',
    toolCount: 30,
    color: 'purple'
  },
  'Infrastructure-Management': {
    description: 'Kod va konfiguratsiyani boshqarish sifatida infratuzilma',
    toolCount: 22,
    color: 'green'
  },
  'Version-Control': {
    description: 'Manba kodini boshqarish va versiyani boshqarish tizimlari',
    toolCount: 15,
    color: 'indigo'
  },
  'Security': {
    description: 'Xavfsizlik vositalari va eng yaxshi amaliyotlar',
    toolCount: 20,
    color: 'red'
  },
  'Networking': {
    description: 'Tarmoq konfiguratsiyasi va boshqaruv vositalari',
    toolCount: 16,
    color: 'cyan'
  },
  'Monitoring': {
    description: 'Tizim monitoringi va kuzatuv vositalari',
    toolCount: 24,
    color: 'teal'
  }
}; 