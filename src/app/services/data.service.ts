import { Injectable, signal, computed } from '@angular/core';
import {
  SiteData,
  HeroData,
  AuthorProfile,
  StatMetric,
  BentoPillar,
  Book,
  Award,
  ServiceItem,
  GalleryPhoto,
  LeadInquiry,
  SiteSettings
} from '../models/content.models';

const STORAGE_KEY = 'dr_venugopal_site_data_v2';

const DEFAULT_DATA: SiteData = {
  hero: {
    badge: 'Inspiring Positive Educator • HR Leader • Author • Speaker',
    titlePrefix: 'Transforming Potential into',
    titleHighlight: 'Extraordinary Success',
    titleSuffix: 'Through Visionary Leadership',
    subtitle: 'Dr. Chikkala Venugopal Rao is considered one of today\'s leading authorities on Human Resources, leadership development, educational technology, and youth mentorship.',
    primaryCtaText: 'Explore Books & Research',
    primaryCtaLink: '/my-books',
    secondaryCtaText: 'Book Keynote Seminar',
    secondaryCtaLink: '/contact',
    heroImage: 'images/author/venugopal-profile.jpg'
  },
  profile: {
    name: 'Dr. Chikkala Venugopal Rao',
    title: 'Human Resources Leader | Entrepreneur | Author | Speaker',
    tagline: 'Make Something Different!',
    bioParagraphs: [
      'Dr. Chikkala Venugopal Rao is a distinguished Human Resources expert who has guided countless professionals and students through complex career transformations. With an unwavering passion for mentoring talent and matching organizations with exceptional leaders, Dr. Venugopal has established himself as a prominent figure in the global HR ecosystem.',
      'Through Verch Consulting LLP, he has solidified his reputation by seamlessly connecting talent with suitable organizations, providing high-impact corporate advisory, and orchestrating comprehensive capability-building workshops.',
      'Holding an MBA in HR, an LLB, and a Ph.D. in Human Resources Management from Andhra University, his credentials are exemplary. His 16+ years of expertise in esteemed IT and Pharma enterprises, coupled with three honorary Doctorates for Social Services and 3 World Records, attest to his monumental contributions.'
    ],
    education: [
      {
        degree: 'Ph.D. in Human Resources Management',
        institution: 'Andhra University',
        description: 'Pioneering doctoral research on strategic human capital optimization, leadership efficacy, and modern workforce dynamics.'
      },
      {
        degree: 'Master of Business Administration (MBA - HR)',
        institution: 'Renowned University',
        description: 'Advanced specialization in organizational behavior, labor jurisprudence, and executive talent acquisition.'
      },
      {
        degree: 'Bachelor of Laws (LLB)',
        institution: 'Faculty of Law',
        description: 'Comprehensive legal foundation in corporate compliance, labor rights, and enterprise dispute mediation.'
      }
    ],
    experienceYears: 16,
    organization: 'Verch Consulting LLP',
    worldRecords: [
      {
        recordBook: 'London Book of Records',
        achievement: 'Mentored over 27,000+ students and professionals across India within a record span of three years.',
        year: '2023'
      },
      {
        recordBook: 'USA Book of Records',
        achievement: 'Conducted premier nationwide career acceleration and skill development summits for youth empowerment.',
        year: '2023'
      },
      {
        recordBook: 'Telugu Book of Records',
        achievement: 'Outstanding contribution to state-wide skill enhancement and educational excellence programs.',
        year: '2023'
      }
    ],
    profileImage: 'images/author/venugopal-profile.jpg',
    bannerImage: 'images/seminar-banner.jpg'
  },
  stats: [
    {
      id: 'stat-1',
      label: 'Years of Leadership',
      value: 16,
      suffix: '+',
      description: 'Senior HR management across premier IT and Pharmaceutical giants'
    },
    {
      id: 'stat-2',
      label: 'Seminars Delivered',
      value: 125,
      suffix: '+',
      description: 'Inspiring keynote addresses delivered across prestigious national and international forums'
    },
    {
      id: 'stat-3',
      label: 'Youth & Leaders Mentored',
      value: 27000,
      suffix: '+',
      description: 'Empowered aspirants with career clarity, interview prowess, and leadership habits'
    },
    {
      id: 'stat-4',
      label: 'World Records',
      value: 3,
      suffix: '',
      description: 'Recognized by London, USA, and Telugu Book of Records'
    },
    {
      id: 'stat-5',
      label: 'Books Authored',
      value: 9,
      suffix: '+',
      description: 'Bestselling titles covering leadership, job interviews, campus connect, and wellness'
    },
    {
      id: 'stat-6',
      label: 'Research Papers Published',
      value: 16,
      suffix: '+',
      description: 'Scholarly publications in human resources, stress alleviation, and organizational ethics'
    }
  ],
  bentoPillars: [
    {
      id: 'pillar-1',
      title: 'Who Am I?',
      subtitle: 'Educator, Scholar & Visionary',
      description: 'A distinguished academician holding MBA-HR, LLB, and PhD from Andhra University with 16+ years shaping elite IT & Pharma talent.',
      image: 'images/ad.jpg',
      tag: 'Credentials',
      linkText: 'Read Full Biography',
      linkUrl: '/about-me'
    },
    {
      id: 'pillar-2',
      title: 'What I Do?',
      subtitle: 'Verch Consulting LLP Founder',
      description: 'Delivering strategic HR advisory, executive recruitment, campus-to-corporate transformations, and high-impact leadership masterclasses.',
      image: 'images/ad2.jpg',
      tag: 'Consulting',
      linkText: 'Explore Services',
      linkUrl: '/services'
    },
    {
      id: 'pillar-3',
      title: 'Why I Do It?',
      subtitle: 'Empowering India\'s Next Gen',
      description: 'Committed to eradicating career confusion, bridging industrial skill gaps, and igniting purpose in thousands of young professionals.',
      image: 'images/ad3.jpg',
      tag: 'Mission',
      linkText: 'Our Impact',
      linkUrl: '/about-me'
    },
    {
      id: 'pillar-4',
      title: 'For How Long?',
      subtitle: '16+ Years & 3 World Records',
      description: 'Dedicated over a decade and a half to corporate excellence, authoring 9+ books and mentoring 27,000+ youth with global distinction.',
      image: 'images/ad4.jpg',
      tag: 'Milestones',
      linkText: 'View World Records',
      linkUrl: '/about-me'
    }
  ],
  books: [
    {
      id: 'book-1',
      title: 'Beyond Bossing',
      subtitle: 'A Modern Paradigm for Empathetic & Strategic Leadership',
      category: 'Leadership',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/beyond_bossing.jpg',
      description: 'Beyond Bossing challenges outdated autocratic command structures, illustrating how modern managers evolve into inspirational mentors who foster psychological safety, high performance, and lasting loyalty.',
      keyTakeaways: [
        'Shift from commanding authority to catalytic influence',
        'Techniques to cultivate proactive employee engagement',
        'Frameworks for navigating conflict with emotional intelligence'
      ],
      pages: 210,
      publisher: 'Verch Academic Press',
      amazonUrl: 'https://www.amazon.in',
      isUnveiledByVIP: true,
      vipNote: 'Unveiled by Hon\'ble Former Vice President of India, Shri M. Venkaiah Naidu Garu.',
      featured: true
    },
    {
      id: 'book-2',
      title: 'Campus to Corporate Connect',
      subtitle: 'The Ultimate Playbook for Graduating Students',
      category: 'Career',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/campus_to_corporate_connect.jpg',
      description: 'A comprehensive handbook designed to bridge the vast chasm between academic theory and corporate workplace expectations, empowering young graduates to hit the ground running.',
      keyTakeaways: [
        'Mastering workplace communication and etiquette',
        'Developing the first-90-days corporate breakthrough strategy',
        'Building essential soft skills and professional resilience'
      ],
      pages: 195,
      publisher: 'National Career Series',
      amazonUrl: 'https://www.amazon.in',
      isUnveiledByVIP: true,
      vipNote: 'Unveiled by Hon\'ble Former Vice President of India, Shri M. Venkaiah Naidu Garu.',
      featured: true
    },
    {
      id: 'book-3',
      title: 'Coaching & Mentoring in Leadership Development',
      subtitle: 'Unlocking Human Capital Potential',
      category: 'Leadership',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/leadership_development.jpg',
      description: 'An authoritative manual for C-Suite executives, HR practitioners, and people managers detailing structured coaching models that multiply leadership capability across organizations.',
      keyTakeaways: [
        'The GROW & OSCAR coaching models tailored for Asian enterprises',
        'Measuring the direct ROI of executive mentorship programs',
        'Fostering a continuous learning culture across departments'
      ],
      pages: 260,
      publisher: 'Global Management Publications',
      amazonUrl: 'https://www.amazon.in',
      isUnveiledByVIP: true,
      vipNote: 'Unveiled by Hon\'ble Former Vice President of India, Shri M. Venkaiah Naidu Garu.',
      featured: true
    },
    {
      id: 'book-4',
      title: 'Smart Hiring',
      subtitle: 'Strategies to Attract, Evaluate & Retain Top Tier Talent',
      category: 'HR & Talent',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/smart_hiring.jpg',
      description: 'Drawing from 16+ years in IT & Pharma hiring, Dr. Venugopal shares battle-tested strategies for modern recruitment, bias-free competency evaluations, and reducing turnover.',
      keyTakeaways: [
        'Competency-based interview matrix and behavioral scoring',
        'Employer branding techniques that draw passive high-performers',
        'Onboarding frameworks that ensure Day-1 retention'
      ],
      pages: 230,
      publisher: 'HR Excellence Guild',
      amazonUrl: 'https://www.amazon.in',
      featured: true
    },
    {
      id: 'book-5',
      title: 'The Synergy of Success',
      subtitle: 'Aligning Vision, Team Dynamics & Execution',
      category: 'Leadership',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/synnergy_of_success.jpg',
      description: 'A deep dive into the psychological and structural synergies that distinguish high-velocity teams from mediocre groups, providing actionable blueprints for collective victory.',
      keyTakeaways: [
        'How cross-functional alignment eliminates organizational silos',
        'The role of transparent feedback loops in agile execution',
        'Sustaining momentum through high-stakes market changes'
      ],
      pages: 180,
      publisher: 'Leadership Matrix',
      amazonUrl: 'https://www.amazon.in',
      featured: false
    },
    {
      id: 'book-6',
      title: 'How to Succeed in Job Interviews',
      subtitle: 'Crack Any Interview with Confidence & Substance',
      category: 'Career',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/how_to_succedd_job_interviews.jpg',
      description: 'The definitive interview preparation guide answering the most challenging HR and technical interview questions, body language mastery, and impactful salary negotiation.',
      keyTakeaways: [
        'The STAR method perfected with real-world case templates',
        'Overcoming interview anxiety and building genuine presence',
        'Negotiating compensation packages with professional poise'
      ],
      pages: 175,
      publisher: 'Career Horizons',
      amazonUrl: 'https://www.amazon.in',
      featured: false
    },
    {
      id: 'book-7',
      title: 'Stress Management Techniques for Daily Life',
      subtitle: 'Practical Tools for Mental Harmony & Peak Performance',
      category: 'Stress Management',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/stress_management_techniques.jpg',
      description: 'A compassionate, science-backed manual addressing workplace burnout, cognitive fatigue, and lifestyle stress with actionable daily mindfulness, breathwork, and boundary-setting rituals.',
      keyTakeaways: [
        'Micro-restoration rituals for high-pressure corporate roles',
        'Cognitive reframing techniques to dissolve anxiety triggers',
        'Designing a sustainable work-life-health harmony matrix'
      ],
      pages: 190,
      publisher: 'Holistic Living Press',
      amazonUrl: 'https://www.amazon.in',
      featured: false
    },
    {
      id: 'book-8',
      title: 'Tomorrows Talent',
      subtitle: 'Preparing the Workforce for AI, Automation & Beyond',
      category: 'HR & Talent',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/tomorrows_talent.jpg',
      description: 'An insightful forecast into future-ready skill stacks, human-AI collaboration, and how both institutions and corporate enterprises can nurture adaptable, creative problem solvers.',
      keyTakeaways: [
        'Identifying emerging meta-skills that withstand automation',
        'Continuous upskilling systems for enterprise longevity',
        'Fostering generational collaboration in hybrid workplaces'
      ],
      pages: 220,
      publisher: 'Future Work Press',
      amazonUrl: 'https://www.amazon.in',
      featured: false
    },
    {
      id: 'book-9',
      title: 'Shirdi Sai Baba',
      subtitle: 'Timeless Wisdom for Modern Peace & Ethical Living',
      category: 'Spirituality',
      author: 'Dr. Chikkala Venugopal Rao',
      coverImage: 'images/books/shirdi_sai_baba.jpg',
      description: 'A deeply reflective exploration of the life, teachings, and universal spiritual philosophy of Shirdi Sai Baba, illustrating how humility, faith, and patience illuminate our daily lives.',
      keyTakeaways: [
        'Principles of Shraddha (Faith) and Saburi (Patience) in adversity',
        'Universal oneness and compassionate selfless service',
        'Finding inner stillness amidst a chaotic modern existence'
      ],
      pages: 160,
      publisher: 'Divine Light Publications',
      amazonUrl: 'https://www.amazon.in',
      featured: false
    }
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Global Indian Award',
      conferredBy: 'Hon\'ble Former President of India, Smt. Pratibha Patil',
      year: '2013',
      description: 'Conferred in recognition of extraordinary achievements in Human Resources management and pioneering social youth initiatives.',
      iconType: 'crown',
      badgeColor: '#00b4d8'
    },
    {
      id: 'award-2',
      title: 'Business Excellence Award',
      conferredBy: 'Shri Biswa Bhusan Harichandan, Hon\'ble Governor of Andhra Pradesh',
      year: '2023',
      description: 'Awarded for stellar corporate advisory, entrepreneurial leadership through Verch Consulting LLP, and outstanding youth skilling.',
      iconType: 'award',
      badgeColor: '#90e0ef'
    },
    {
      id: 'award-3',
      title: 'CEO of the Year (Human Resources Services)',
      conferredBy: 'Indian Achiever Foundation',
      year: '2020 & 2024',
      description: 'Recognized twice as India\'s foremost visionary CEO in Human Resources and organizational talent strategy.',
      iconType: 'star',
      badgeColor: '#0077b6'
    },
    {
      id: 'award-4',
      title: 'Three Book Launches by Hon\'ble Vice President',
      conferredBy: 'Shri M. Venkaiah Naidu Garu, Former Vice President of India',
      year: '2023',
      description: 'Prestigious ceremonial launch of Beyond Bossing, Campus to Corporate Connect, and Coaching & Mentoring at official vice-presidential forum.',
      iconType: 'book-open',
      badgeColor: '#caf0f8'
    },
    {
      id: 'award-5',
      title: 'HR Manager of the Year',
      conferredBy: 'National HR Consortium',
      year: '2013',
      description: 'Honored for spearheading pathbreaking talent retention and organizational transformation in the IT sector.',
      iconType: 'medal',
      badgeColor: '#00b4d8'
    },
    {
      id: 'award-6',
      title: 'Best Author & Rising Business Tycoon',
      conferredBy: 'National Business Council & Literary Forum',
      year: '2024',
      description: 'Celebrated for transformative authorship and entrepreneurial velocity across the professional education sector.',
      iconType: 'feather',
      badgeColor: '#90e0ef'
    }
  ],
  services: [
    {
      id: 'service-1',
      title: 'Strategic HR Advisory & Org Transformation',
      subtitle: 'Aligning People Strategy with Enterprise Growth',
      icon: 'briefcase',
      image: 'images/ad.jpg',
      description: 'Comprehensive human resources consulting for mid-to-large enterprises, designing high-performance org charts, KPI matrices, compensation benchmarks, and compliance frameworks.',
      targetAudience: 'Corporates, Startups, CEOs, CHROs',
      keyDeliverables: [
        'Organizational design & restructuring audits',
        'Performance Management System (PMS) overhaul',
        'Labor compliance and industrial relations advisory',
        'Employee engagement and retention roadmaps'
      ],
      badge: 'Corporate Advisory'
    },
    {
      id: 'service-2',
      title: 'Executive Coaching & Leadership Masterclasses',
      subtitle: 'Elevating Managers into Transformational Leaders',
      icon: 'users',
      image: 'images/ad2.jpg',
      description: 'One-on-one executive coaching and bespoke corporate workshops tailored for senior managers and department heads to sharpen strategic thinking, empathy, and crisis leadership.',
      targetAudience: 'Directors, Senior Managers, Emerging Leaders',
      keyDeliverables: [
        'Beyond Bossing leadership frameworks',
        'Executive presence, communication, and influence',
        'Conflict resolution and psychological safety building',
        '360-degree leadership diagnostic and action plan'
      ],
      badge: 'Executive Training'
    },
    {
      id: 'service-3',
      title: 'Campus-to-Corporate Skilling Summits',
      subtitle: 'Bridging Education and Industry for 27,000+ Youth',
      icon: 'graduation-cap',
      image: 'images/ad3.jpg',
      description: 'World-record recognized campus training summits delivering rigorous job interview readiness, soft skill mastery, resume engineering, and corporate culture orientation.',
      targetAudience: 'Universities, Colleges, Final-Year Students, Freshers',
      keyDeliverables: [
        'Mock interviews and live panel feedback sessions',
        'Aptitude, group discussion, and body language mastery',
        'Direct hiring connections via Verch Consulting networks',
        'World Record certified participation modules'
      ],
      badge: 'Youth Skilling'
    },
    {
      id: 'service-4',
      title: 'Executive Search & Smart Hiring Solutions',
      subtitle: 'Precision Talent Acquisition via Verch Consulting LLP',
      icon: 'target',
      image: 'images/ad4.jpg',
      description: 'End-to-end talent headhunting and competency-based assessment solutions connecting high-growth IT, Pharma, and manufacturing enterprises with proven top-tier talent.',
      targetAudience: 'Talent Acquisition Teams, Growing Companies',
      keyDeliverables: [
        'Confidential C-suite and leadership executive search',
        'Structured behavioral & competency assessment matrix',
        'Rapid turn-around time with pre-vetted candidate pools',
        'Seamless onboarding and early retention advisory'
      ],
      badge: 'Talent Search'
    },
    {
      id: 'service-5',
      title: 'Keynote Speaking & Global Seminars',
      subtitle: 'Inspiring, Actionable & Memorable Keynote Addresses',
      icon: 'mic',
      image: 'images/seminar-banner.jpg',
      description: 'Engaging, powerful keynote addresses for annual corporate conferences, university convocations, and global summits on leadership, future of work, and personal excellence.',
      targetAudience: 'Conference Organizers, Event Curators, Global Summits',
      keyDeliverables: [
        'Customized keynote speech aligned with event theme',
        'Interactive audience Q&A and breakout facilitation',
        'Pre-event promotional video & post-event takeaways',
        'Author book-signing and VIP meet & greet'
      ],
      badge: 'Keynotes & Seminars'
    },
    {
      id: 'service-6',
      title: 'Workplace Stress & Wellness Programs',
      subtitle: 'Cultivating Resilience & Preventing Employee Burnout',
      icon: 'heart-pulse',
      image: 'images/ad3.jpg',
      description: 'Evidence-based workshops providing practical mindfulness, ergonomic wellness, emotional reframing, and sustainable routines to maximize workplace vitality and morale.',
      targetAudience: 'All Employees, HR Teams, Corporate Wellness Leads',
      keyDeliverables: [
        'Daily micro-stress relief toolkits for desk workers',
        'Work-life-family integration frameworks',
        'Mental wellness pulse checks and manager guidance',
        'Interactive mindfulness and breathwork sessions'
      ],
      badge: 'Wellness'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Global Indian Award Presentation',
      category: 'Dignitaries',
      imageUrl: 'images/author/venugopal-profile.jpg',
      caption: 'Receiving the prestigious Global Indian Award from Hon\'ble Former President of India, Smt. Pratibha Patil.',
      location: 'New Delhi',
      year: '2013',
      featured: true
    },
    {
      id: 'gal-2',
      title: 'Ceremonial Book Unveiling',
      category: 'Dignitaries',
      imageUrl: 'images/gallery/venkaiah-naidu-book-launch.jpg',
      caption: 'Hon\'ble Former Vice President of India, Shri M. Venkaiah Naidu Garu launching three landmark books by Dr. Venugopal Rao.',
      location: 'Hyderabad',
      year: '2023',
      featured: true
    },
    {
      id: 'gal-3',
      title: 'Governor Felicitation for Business Excellence',
      category: 'Dignitaries',
      imageUrl: 'images/ad2.jpg',
      caption: 'Honored with the Business Excellence Award by Shri Biswa Bhusan Harichandan, Hon\'ble Governor of Andhra Pradesh.',
      location: 'Raj Bhavan',
      year: '2023',
      featured: true
    },
    {
      id: 'gal-4',
      title: 'Youth Mentorship & World Record Summit',
      category: 'Mentorship',
      imageUrl: 'images/ad3.jpg',
      caption: 'Addressing over 3,000 university students during the nationwide career acceleration drive that established 3 World Records.',
      location: 'Visakhapatnam',
      year: '2023',
      featured: true
    },
    {
      id: 'gal-5',
      title: 'Annual Keynote Address - Future of HR',
      category: 'Keynotes',
      imageUrl: 'images/seminar-banner.jpg',
      caption: 'Delivering the inaugural address on "AI & the Next Decade of Human Capital" at the Global HR Leadership Conclave.',
      location: 'Bengaluru',
      year: '2024',
      featured: true
    },
    {
      id: 'gal-6',
      title: 'Verch Consulting Executive Roundtable',
      category: 'Keynotes',
      imageUrl: 'images/ad4.jpg',
      caption: 'Hosting an exclusive strategy roundtable with C-Suite leaders on talent retention and cross-border expansion.',
      location: 'Hyderabad',
      year: '2024',
      featured: true
    }
  ],
  leads: [
    {
      id: 'lead-101',
      name: 'Dr. Ramesh Sharma',
      email: 'ramesh.sharma@techcorp.com',
      phone: '+91 98480 12345',
      organization: 'TechCorp Global Solutions',
      inquiryType: 'Keynote Speaker',
      dateSubmitted: '2026-09-01T10:30:00Z',
      eventDate: '2026-10-15',
      message: 'We would love to invite Dr. Venugopal as our Chief Keynote Speaker for our Annual Global Leadership Conference in Hyderabad with 800+ attendees.',
      status: 'In Progress',
      notes: 'Initial discussion completed. Date locked for Oct 15th.'
    },
    {
      id: 'lead-102',
      name: 'Priya Sundaram',
      email: 'priya.sundaram@apexpharma.in',
      phone: '+91 97000 87654',
      organization: 'Apex Life Sciences',
      inquiryType: 'Corporate Consulting',
      dateSubmitted: '2026-09-02T08:15:00Z',
      message: 'Looking for strategic HR advisory on organizational restructuring and performance appraisal design for our 2,500 employee workforce.',
      status: 'New'
    }
  ],
  settings: {
    siteName: 'Dr. Chikkala Venugopal Rao',
    tagline: 'Inspiring Positive Educator, Author, Speaker & HR Leader',
    email: 'info@drchikkalavenugopalrao.com',
    phone: '+91 999 999 9999',
    address: 'Hyderabad, Telangana, India',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/919999999999?text=Hello%20Dr.%20Venugopal',
      linkedin: 'https://linkedin.com'
    },
    copyrightText: '© 2026 Dr. Chikkala Venugopal Rao. All Rights Reserved.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private siteDataSignal = signal<SiteData>(this.loadInitialData());

  // Public readonly computed signals for components
  readonly siteData = computed(() => this.siteDataSignal());
  readonly hero = computed(() => this.siteDataSignal().hero);
  readonly profile = computed(() => this.siteDataSignal().profile);
  readonly stats = computed(() => this.siteDataSignal().stats);
  readonly bentoPillars = computed(() => this.siteDataSignal().bentoPillars);
  readonly books = computed(() => this.siteDataSignal().books);
  readonly featuredBooks = computed(() => this.siteDataSignal().books.filter(b => b.featured));
  readonly awards = computed(() => this.siteDataSignal().awards);
  readonly services = computed(() => this.siteDataSignal().services);
  readonly gallery = computed(() => this.siteDataSignal().gallery);
  readonly leads = computed(() => this.siteDataSignal().leads);
  readonly settings = computed(() => this.siteDataSignal().settings);

  private loadInitialData(): SiteData {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const settings = { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) };
        if (settings.copyrightText?.includes('Designed with Apple Intelligence Precision')) {
          settings.copyrightText = DEFAULT_DATA.settings.copyrightText;
        }
        // Ensure structure completeness
        return {
          hero: { ...DEFAULT_DATA.hero, ...(parsed.hero || {}) },
          profile: { ...DEFAULT_DATA.profile, ...(parsed.profile || {}) },
          stats: parsed.stats?.length ? parsed.stats : DEFAULT_DATA.stats,
          bentoPillars: parsed.bentoPillars?.length ? parsed.bentoPillars : DEFAULT_DATA.bentoPillars,
          books: parsed.books?.length ? parsed.books : DEFAULT_DATA.books,
          awards: parsed.awards?.length ? parsed.awards : DEFAULT_DATA.awards,
          services: parsed.services?.length ? parsed.services : DEFAULT_DATA.services,
          gallery: parsed.gallery?.length ? parsed.gallery : DEFAULT_DATA.gallery,
          leads: parsed.leads ? parsed.leads : DEFAULT_DATA.leads,
          settings
        };
      }
    } catch (e) {
      console.warn('Failed to load saved site data from localStorage, falling back to default:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  private persist(data: SiteData): void {
    this.siteDataSignal.set(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save site data to localStorage:', e);
    }
  }

  // Hero updates
  updateHero(hero: HeroData): void {
    const current = this.siteDataSignal();
    this.persist({ ...current, hero });
  }

  // Profile updates
  updateProfile(profile: AuthorProfile): void {
    const current = this.siteDataSignal();
    this.persist({ ...current, profile });
  }

  // Stats updates
  updateStats(stats: StatMetric[]): void {
    const current = this.siteDataSignal();
    this.persist({ ...current, stats });
  }

  // Bento pillars update
  updateBentoPillars(bentoPillars: BentoPillar[]): void {
    const current = this.siteDataSignal();
    this.persist({ ...current, bentoPillars });
  }

  // Books CRUD
  addBook(book: Omit<Book, 'id'>): Book {
    const newBook: Book = {
      ...book,
      id: 'book-' + Date.now()
    };
    const current = this.siteDataSignal();
    this.persist({ ...current, books: [newBook, ...current.books] });
    return newBook;
  }

  updateBook(updated: Book): void {
    const current = this.siteDataSignal();
    const books = current.books.map(b => (b.id === updated.id ? updated : b));
    this.persist({ ...current, books });
  }

  deleteBook(id: string): void {
    const current = this.siteDataSignal();
    const books = current.books.filter(b => b.id !== id);
    this.persist({ ...current, books });
  }

  // Awards CRUD
  addAward(award: Omit<Award, 'id'>): Award {
    const newAward: Award = {
      ...award,
      id: 'award-' + Date.now()
    };
    const current = this.siteDataSignal();
    this.persist({ ...current, awards: [newAward, ...current.awards] });
    return newAward;
  }

  updateAward(updated: Award): void {
    const current = this.siteDataSignal();
    const awards = current.awards.map(a => (a.id === updated.id ? updated : a));
    this.persist({ ...current, awards });
  }

  deleteAward(id: string): void {
    const current = this.siteDataSignal();
    const awards = current.awards.filter(a => a.id !== id);
    this.persist({ ...current, awards });
  }

  // Services CRUD
  addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...service,
      id: 'service-' + Date.now()
    };
    const current = this.siteDataSignal();
    this.persist({ ...current, services: [newService, ...current.services] });
    return newService;
  }

  updateService(updated: ServiceItem): void {
    const current = this.siteDataSignal();
    const services = current.services.map(s => (s.id === updated.id ? updated : s));
    this.persist({ ...current, services });
  }

  deleteService(id: string): void {
    const current = this.siteDataSignal();
    const services = current.services.filter(s => s.id !== id);
    this.persist({ ...current, services });
  }

  // Gallery CRUD
  addGalleryPhoto(photo: Omit<GalleryPhoto, 'id'>): GalleryPhoto {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'gal-' + Date.now()
    };
    const current = this.siteDataSignal();
    this.persist({ ...current, gallery: [newPhoto, ...current.gallery] });
    return newPhoto;
  }

  updateGalleryPhoto(updated: GalleryPhoto): void {
    const current = this.siteDataSignal();
    const gallery = current.gallery.map(g => (g.id === updated.id ? updated : g));
    this.persist({ ...current, gallery });
  }

  deleteGalleryPhoto(id: string): void {
    const current = this.siteDataSignal();
    const gallery = current.gallery.filter(g => g.id !== id);
    this.persist({ ...current, gallery });
  }

  // Leads CRM
  addLead(leadData: Omit<LeadInquiry, 'id' | 'dateSubmitted' | 'status'>): LeadInquiry {
    const newLead: LeadInquiry = {
      ...leadData,
      id: 'lead-' + Date.now(),
      dateSubmitted: new Date().toISOString(),
      status: 'New'
    };
    const current = this.siteDataSignal();
    this.persist({ ...current, leads: [newLead, ...current.leads] });
    return newLead;
  }

  updateLeadStatus(id: string, status: LeadInquiry['status'], notes?: string): void {
    const current = this.siteDataSignal();
    const leads = current.leads.map(l => {
      if (l.id === id) {
        return { ...l, status, ...(notes !== undefined ? { notes } : {}) };
      }
      return l;
    });
    this.persist({ ...current, leads });
  }

  deleteLead(id: string): void {
    const current = this.siteDataSignal();
    const leads = current.leads.filter(l => l.id !== id);
    this.persist({ ...current, leads });
  }

  // Site Settings
  updateSettings(settings: SiteSettings): void {
    const current = this.siteDataSignal();
    this.persist({ ...current, settings });
  }

  // Full export/import/reset
  exportData(): string {
    return JSON.stringify(this.siteDataSignal(), null, 2);
  }

  importData(jsonContent: string): boolean {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed && typeof parsed === 'object' && parsed.hero && parsed.profile) {
        this.persist(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed - Invalid JSON format:', e);
    }
    return false;
  }

  resetToDefaultData(): void {
    this.persist(JSON.parse(JSON.stringify(DEFAULT_DATA)));
  }
}
