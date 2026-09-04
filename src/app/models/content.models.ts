export interface StatMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface HeroData {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroImage: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  tagline: string;
  bioParagraphs: string[];
  education: {
    degree: string;
    institution: string;
    description: string;
  }[];
  experienceYears: number;
  organization: string;
  worldRecords: {
    recordBook: string;
    achievement: string;
    year: string;
  }[];
  profileImage: string;
  bannerImage: string;
}

export interface BentoPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  linkText: string;
  linkUrl: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: 'Leadership' | 'Career' | 'Stress Management' | 'Spirituality' | 'HR & Talent';
  author: string;
  coverImage: string;
  description: string;
  keyTakeaways: string[];
  pages?: number;
  publisher?: string;
  amazonUrl: string;
  isUnveiledByVIP?: boolean;
  vipNote?: string;
  featured?: boolean;
}

export interface Award {
  id: string;
  title: string;
  conferredBy: string;
  year: string;
  description: string;
  iconType: string;
  badgeColor?: string;
  image?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  description: string;
  targetAudience: string;
  keyDeliverables: string[];
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Keynotes' | 'Dignitaries' | 'Mentorship' | 'Global Travels';
  imageUrl: string;
  caption: string;
  location?: string;
  year?: string;
  featured?: boolean;
}

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  inquiryType: 'Keynote Speaker' | 'Corporate Consulting' | 'Youth Mentorship' | 'Book Query' | 'General';
  dateSubmitted: string;
  eventDate?: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Confirmed' | 'Archived';
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    whatsapp: string;
    linkedin: string;
  };
  copyrightText: string;
}

export interface FeaturedVideo {
  badge: string;
  title: string;
  description: string;
  youtubeUrl: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  buttonText: string;
  buttonLink: string;
}

export interface SiteData {
  hero: HeroData;
  profile: AuthorProfile;
  stats: StatMetric[];
  bentoPillars: BentoPillar[];
  featuredVideo: FeaturedVideo;
  books: Book[];
  awards: Award[];
  services: ServiceItem[];
  gallery: GalleryPhoto[];
  leads: LeadInquiry[];
  settings: SiteSettings;
}
