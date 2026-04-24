export interface BaseFrontmatter {
  title: string;
  meta_title?: string;
  description?: string;
  image?: string;
  draft?: boolean;
  date?: string;
}

export interface BlogPost extends BaseFrontmatter {
  slug: string;
  categories?: string[];
  tags?: string[];
  author?: string;
}

export interface Service extends BaseFrontmatter {
  slug: string;
  tags?: string[];
  keywords?: string[];
}

export interface CaseStudy extends BaseFrontmatter {
  slug: string;
  email?: string;
  social?: {
    name: string;
    icon: string;
    link: string;
  }[];
}

export interface Page extends BaseFrontmatter {
  slug: string;
}

export interface SiteConfig {
  title: string;
  baseUrl: string;
  description: string;
  descriptionZh?: string;
  company: {
    name: string;
    founded: number;
    email: string;
    phone?: string;
    address?: string;
  };
  social: {
    name: string;
    icon: string;
    link: string;
  }[];
  navigation: {
    en: NavItem[];
    zh: NavItem[];
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
