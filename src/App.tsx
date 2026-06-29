// ============================================
// CONFIGURATION - Edit these placeholders
// ============================================
const CONFIG = {
  name: 'Mahir Aktaş',
  initials: 'MA',
  title: 'Senior Software Engineer',
  tagline: 'Building High-Performance Systems & Scalable Architecture',
  subtitle: 'Senior Software Engineer specializing in Full-Stack Systems & Cloud Architecture. Crafting clean, maintainable code guided by SOLID principles and robust infrastructure.',
  location: 'Istanbul, Turkey',
  email: 'aktmahir@gmail.com',
  resumeUrl: '#',
  social: {
    github: 'https://github.com/aktma',
    linkedin: 'https://linkedin.com/in/mahiraktas',
  },
  expertise: {
    languages: ['C#', 'TypeScript', 'JavaScript', 'Go', 'Python', 'Rust'],
    frameworks: ['.NET 8/9', 'React', 'Node.js', 'Next.js', 'Unity3D', 'Vue.js'],
    architecture: ['Clean Architecture', 'Microservices', 'Event-Driven', 'Domain-Driven Design', 'REST/GraphQL APIs'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Azure', 'GCP']
  },
  philosophy: [
    { title: 'Test-Driven Development', desc: 'Writing tests first ensures robust, maintainable code with fewer regressions.' },
    { title: 'Performance Optimization', desc: 'Every millisecond matters. I optimize for speed, memory, and scalability.' },
    { title: 'Scalable Architecture', desc: 'Designing systems that grow gracefully from 1 to 1M+ users.' },
    { title: 'Agile Leadership', desc: 'Leading teams with clear communication and iterative delivery.' }
  ],
  experiences: [
    {
      title: 'Senior Software Engineer',
      company: 'TechNova Inc.',
      location: 'Istanbul, Turkey',
      period: '2022 - Present',
      achievements: [
        'Architected microservices platform serving 2M+ daily active users',
        'Reduced API latency by 60% through strategic caching and query optimization',
        'Led team of 6 engineers, establishing code review standards and CI/CD pipelines'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'CloudScale Systems',
      location: 'Remote',
      period: '2019 - 2022',
      achievements: [
        'Built real-time data pipeline processing 500K events/second',
        'Migrated monolith to cloud-native architecture, reducing costs by 40%',
        'Mentored 4 junior developers through structured pair programming'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'DevStart Solutions',
      location: 'Istanbul, Turkey',
      period: '2017 - 2019',
      achievements: [
        'Developed customer-facing dashboard used by 50K+ enterprise clients',
        'Implemented automated testing achieving 85% code coverage',
        'Contributed to open-source projects with 500+ GitHub stars'
      ]
    }
  ],
  projects: [
    {
      title: 'Nexus Platform',
      category: 'Full-Stack',
      description: 'Enterprise-grade SaaS platform with real-time collaboration features. Handles millions of concurrent connections with sub-100ms latency.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Photon Engine',
      category: 'Simulations/Graphics',
      description: 'High-performance physics simulation engine for scientific computing. Supports GPU acceleration and distributed computing.',
      tech: ['C#', '.NET 8', 'Unity3D', 'CUDA', 'Docker'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'TerraForge',
      category: 'Cloud & DevOps',
      description: 'Infrastructure-as-Code solution for multi-cloud deployments. Automates provisioning across AWS, Azure, and GCP.',
      tech: ['Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Velocity Gateway',
      category: 'Full-Stack',
      description: 'High-throughput API gateway with intelligent routing, rate limiting, and real-time analytics dashboard.',
      tech: ['Go', 'gRPC', 'Redis', 'Grafana', 'Kubernetes'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'StreamForge',
      category: 'Cloud & DevOps',
      description: 'Event-driven data processing pipeline handling 500K+ events/second with exactly-once delivery guarantees.',
      tech: ['Kafka', 'Flink', 'Python', 'AWS Kinesis', 'Snowflake'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/163340/pexels-photo-163340.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Voxel Raytracer',
      category: 'Simulations/Graphics',
      description: 'Real-time ray tracing engine with Vulkan API. Achieves 60fps at 4K with physically-based rendering.',
      tech: ['Rust', 'Vulkan', 'SPIR-V', 'GLSL', 'CUDA'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/373071/pexels-photo-373071.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ],
  testimonials: [
    {
      name: 'John Smith',
      title: 'CTO at TechNova Inc.',
      quote: 'An exceptional engineer who consistently delivers beyond expectations. Their architectural decisions saved us months of development time and positioned our product for scale.'
    },
    {
      name: 'Sarah Johnson',
      title: 'Senior Lead Developer at CloudScale Systems',
      quote: 'Working alongside them on the platform modernization was transformative. Their deep knowledge of distributed systems and attention to detail elevated our entire team\'s capabilities.'
    },
    {
      name: 'Michael Chen',
      title: 'VP of Engineering at DevStart Solutions',
      quote: 'Rare combination of technical brilliance and leadership skills. They mentored our junior engineers while simultaneously architecting our most critical systems. A true force multiplier.'
    }
  ]
};

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ExpertiseSection from './components/ExpertiseSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      <Navigation
        name={CONFIG.name}
        initials={CONFIG.initials}
        resumeUrl={CONFIG.resumeUrl}
      />
      <main>
        <HeroSection
          title={CONFIG.title}
          tagline={CONFIG.tagline}
          subtitle={CONFIG.subtitle}
        />
        <ExpertiseSection
          expertise={CONFIG.expertise}
          philosophy={CONFIG.philosophy}
        />
        <ExperienceSection experiences={CONFIG.experiences} />
        <ProjectsSection projects={CONFIG.projects} />
        <TestimonialsSection testimonials={CONFIG.testimonials} />
        <ContactSection email={CONFIG.email} name={CONFIG.name} />
      </main>
      <Footer name={CONFIG.name} initials={CONFIG.initials} />
    </div>
  );
}
