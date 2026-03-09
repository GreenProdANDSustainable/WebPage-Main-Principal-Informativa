// Type definitions for home page components

// Base types
export type IconName = string; // Nombre del icono de lucide-react

// Values Section
export interface ValueItem {
  id: string;
  iconName: IconName;
  titleKey: string;
  descriptionKey: string;
}

// Certifications Section
export interface Certification {
  id: string;
  nameKey: string;
  descriptionKey: string;
  logo?: string;
  verificationUrl?: string;
}

// Impact Stats Section
export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
}

// Business Lines Section
export interface BusinessLine {
  id: string;
  type: 'product' | 'service';
  iconName: IconName;
  imageUrl?: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
}

// Sustainability Section
export interface Initiative {
  id: string;
  iconName: IconName;
  titleKey: string;
  descriptionKey: string;
}

// Testimonials Section
export interface Testimonial {
  id: string;
  nameKey: string;
  companyKey: string;
  positionKey: string;
  textKey: string;
  avatar?: string;
}

// Dictionary type extension
export interface HomeDictionary {
  values: {
    title: string;
    subtitle: string;
    items: Record<string, { title: string; description: string }>;
  };
  certifications: {
    title: string;
    subtitle: string;
    items: Record<string, { name: string; description: string }>;
  };
  stats: {
    title: string;
    items: Record<string, { label: string }>;
  };
  businessLines: {
    title: string;
    subtitle: string;
    viewMore: string;
    items: Record<string, { title: string; description: string }>;
  };
  missionVision: {
    mission: {
      title: string;
      text: string;
    };
    vision: {
      title: string;
      text: string;
    };
  };
  sustainability: {
    title: string;
    subtitle: string;
    learnMore: string;
    items: Record<string, { title: string; description: string }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Record<string, {
      name: string;
      company: string;
      position: string;
      text: string;
    }>;
  };
}
