import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Code2,
  Layers,
  Cloud,
  Building2,
  Rocket,
  Users,
  Zap,
  Lock,
  ArrowRight,
  Send,
  MapPin,
  Calendar,
  Quote,
  Star
} from 'lucide-react';

// ============================================
// CONFIGURATION - Edit these placeholders
// ============================================
const CONFIG = {
  name: '[Your Name]',
  initials: '[YN]',
  title: 'Senior Software Engineer',
  tagline: 'Building High-Performance Systems & Scalable Architecture',
  subtitle: 'Senior Software Engineer specializing in Full-Stack Systems & Cloud Architecture. Crafting clean, maintainable code guided by SOLID principles and robust infrastructure.',
  location: '[City, Country]',
  email: '[your.email@domain.com]',
  resumeUrl: '#',
  social: {
    github: 'https://github.com/[username]',
    linkedin: 'https://linkedin.com/in/[username]',
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
      company: '[Company Name]',
      location: '[Location]',
      period: '2022 - Present',
      achievements: [
        'Architected microservices platform serving 2M+ daily active users',
        'Reduced API latency by 60% through strategic caching and query optimization',
        'Led team of 6 engineers, establishing code review standards and CI/CD pipelines'
      ]
    },
    {
      title: 'Software Engineer',
      company: '[Previous Company]',
      location: '[Location]',
      period: '2019 - 2022',
      achievements: [
        'Built real-time data pipeline processing 500K events/second',
        'Migrated monolith to cloud-native architecture, reducing costs by 40%',
        'Mentored 4 junior developers through structured pair programming'
      ]
    },
    {
      title: 'Junior Developer',
      company: '[First Company]',
      location: '[Location]',
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
      title: '[Project Alpha]',
      category: 'Full-Stack',
      description: 'Enterprise-grade SaaS platform with real-time collaboration features. Handles millions of concurrent connections with sub-100ms latency.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '[Simulation Engine]',
      category: 'Simulations/Graphics',
      description: 'High-performance physics simulation engine for scientific computing. Supports GPU acceleration and distributed computing.',
      tech: ['C#', '.NET 8', 'Unity3D', 'CUDA', 'Docker'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '[Cloud Infrastructure]',
      category: 'Cloud & DevOps',
      description: 'Infrastructure-as-Code solution for multi-cloud deployments. Automates provisioning across AWS, Azure, and GCP.',
      tech: ['Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '[API Gateway]',
      category: 'Full-Stack',
      description: 'High-throughput API gateway with intelligent routing, rate limiting, and real-time analytics dashboard.',
      tech: ['Go', 'gRPC', 'Redis', 'Grafana', 'Kubernetes'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '[Data Pipeline]',
      category: 'Cloud & DevOps',
      description: 'Event-driven data processing pipeline handling 500K+ events/second with exactly-once delivery guarantees.',
      tech: ['Kafka', 'Flink', 'Python', 'AWS Kinesis', 'Snowflake'],
      liveUrl: '#',
      codeUrl: '#',
      image: 'https://images.pexels.com/photos/163340/pexels-photo-163340.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '[Graphics Renderer]',
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
      name: '[John Smith]',
      title: 'CTO at [Tech Company]',
      quote: 'An exceptional engineer who consistently delivers beyond expectations. Their architectural decisions saved us months of development time and positioned our product for scale.'
    },
    {
      name: '[Sarah Johnson]',
      title: 'Senior Lead Developer at [Enterprise Corp]',
      quote: 'Working alongside them on the platform modernization was transformative. Their deep knowledge of distributed systems and attention to detail elevated our entire team\'s capabilities.'
    },
    {
      name: '[Michael Chen]',
      title: 'VP of Engineering at [Startup Inc]',
      quote: 'Rare combination of technical brilliance and leadership skills. They mentored our junior engineers while simultaneously architecting our most critical systems. A true force multiplier.'
    }
  ]
};

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// ============================================
// COMPONENTS
// ============================================

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['About', 'Expertise', 'Experience', 'Projects', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            className="flex items-center gap-2 font-bold text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {CONFIG.initials}
            </span>
            <span className="hidden sm:block text-slate-100">{CONFIG.name}</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="px-4 py-2 text-slate-300 hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-slate-800/50"
              >
                {item}
              </button>
            ))}
            <a
              href={CONFIG.resumeUrl}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all duration-200"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <a
                  href={CONFIG.resumeUrl}
                  className="flex items-center gap-2 px-4 py-3 mt-2 mx-4 bg-primary-600 text-white rounded-lg"
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <TechConstellation />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Available for new opportunities
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-slate-100">{CONFIG.title}.</span>
          <br />
          <span className="gradient-text">{CONFIG.tagline}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {CONFIG.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
          >
            View Work
            <ArrowRight size={20} />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl border border-slate-700 hover:border-primary-500/50 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-500 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Tech Constellation Animation
function TechConstellation() {
  const symbols = ['{ }', '< />', '[ ]', '( )', '=>', '&&', '||', '??', '!', ';'];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {symbols.map((symbol, i) => (
        <motion.span
          key={i}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-2xl font-mono text-primary-400"
        >
          {symbol}
        </motion.span>
      ))}
    </div>
  );
}

// Expertise Section
function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const expertiseCategories = [
    {
      title: 'Languages & Core',
      icon: <Code2 className="w-6 h-6" />,
      items: CONFIG.expertise.languages,
      color: 'primary'
    },
    {
      title: 'Frameworks & Engines',
      icon: <Layers className="w-6 h-6" />,
      items: CONFIG.expertise.frameworks,
      color: 'cyan'
    },
    {
      title: 'Architecture',
      icon: <Building2 className="w-6 h-6" />,
      items: CONFIG.expertise.architecture,
      color: 'emerald'
    },
    {
      title: 'DevOps & Cloud',
      icon: <Cloud className="w-6 h-6" />,
      items: CONFIG.expertise.devops,
      color: 'amber'
    }
  ];

  const colorVariants: Record<string, { gradient: string; border: string; text: string }> = {
    primary: { gradient: 'from-primary-500/20', border: 'border-primary-500/30', text: 'text-primary-400' },
    cyan: { gradient: 'from-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    emerald: { gradient: 'from-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    amber: { gradient: 'from-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' }
  };

  return (
    <section id="expertise" className="relative py-24 md:py-32 bg-slate-900/50">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Expertise</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over years of production experience, from low-level systems to cloud-native architectures.
          </p>
        </motion.div>

        {/* Competence Cards Grid */}
        <motion.div
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {expertiseCategories.map((category, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${colorVariants[category.color].gradient} to-transparent backdrop-blur-sm border ${colorVariants[category.color].border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-slate-800/80 ${colorVariants[category.color].text}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-100">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, j) => (
                  <motion.span
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className="tech-badge"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Engineering Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-100">
            Engineering Philosophy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONFIG.philosophy.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-5 rounded-xl glass-card text-center hover:border-primary-500/30"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                  {i === 0 && <Lock className="w-5 h-5" />}
                  {i === 1 && <Zap className="w-5 h-5" />}
                  {i === 2 && <Rocket className="w-5 h-5" />}
                  {i === 3 && <Users className="w-5 h-5" />}
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Experience Timeline
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Career Journey</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A track record of delivering impact, from early-stage startups to enterprise scale.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-cyan-500 to-primary-500/0" />

          {CONFIG.experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`relative flex items-center mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-slate-950 z-10" />

              {/* Content Card */}
              <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10"
                >
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-1">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Gallery
function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filters = ['All', 'Full-Stack', 'Simulations/Graphics', 'Cloud & DevOps'];
  const filteredProjects = activeFilter === 'All'
    ? CONFIG.projects
    : CONFIG.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Production-grade systems built with performance, scalability, and maintainability in mind.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-100">{project.title}</h3>
                      <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, j) => (
                        <span key={j} className="tech-badge text-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.codeUrl}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm rounded-lg border border-slate-700 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CONFIG.testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">What Others Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Colleagues and collaborators sharing their experience working together.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-10 text-center"
            >
              <Quote className="w-12 h-12 mx-auto mb-6 text-primary-500/50" />
              <blockquote className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 italic">
                "{CONFIG.testimonials[currentIndex].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-400 text-primary-400" />
                ))}
              </div>
              <p className="font-semibold text-slate-100">
                {CONFIG.testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-slate-400">
                {CONFIG.testimonials[currentIndex].title}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {CONFIG.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = 'Invalid email format';
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-slate-900/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to build something scalable? Let's discuss your next project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Let's build something scalable together
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you need architectural consulting, a full-stack solution, or a technical leader for your team,
                I'm open to discussing opportunities that align with building impactful, well-engineered systems.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${CONFIG.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary-500/50 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-slate-700/50 group-hover:bg-primary-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-slate-100 font-medium">{CONFIG.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="p-3 rounded-lg bg-slate-700/50">
                  <MapPin className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-slate-100 font-medium">{CONFIG.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Github className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href={CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href={`mailto:${CONFIG.email}`}
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Mail className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                      className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="[Your Name]"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                      className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="[your.email@domain.com]"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState(p => ({ ...p, subject: e.target.value }))}
                    className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="[Project inquiry, collaboration, etc.]"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                    className={`input-field resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="[Tell me about your project, timeline, and requirements...]"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {CONFIG.initials}
            </span>
            <p className="text-slate-400 text-sm">
              © {currentYear} {CONFIG.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span>Built with</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">React</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">Tailwind</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">Vite</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
