export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  year: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  quote: string;
  author: string;
  authorRole: string;
  tags: string[];
}

export interface ScrubMilestone {
  progressStart: number;
  progressEnd: number;
  badge: string;
  title: string;
  subtitle: string;
  details: string[];
}
