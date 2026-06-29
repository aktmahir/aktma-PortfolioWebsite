import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Layers,
  Cloud,
  Building2,
  Rocket,
  Users,
  Zap,
  Lock,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

interface ExpertiseItem {
  title: string;
  desc: string;
}

interface ExpertiseCategory {
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

interface ExpertiseSectionProps {
  expertise: {
    languages: string[];
    frameworks: string[];
    architecture: string[];
    devops: string[];
  };
  philosophy: ExpertiseItem[];
}

const colorVariants: Record<string, { gradient: string; border: string; text: string }> = {
  primary: { gradient: 'from-primary-500/20', border: 'border-primary-500/30', text: 'text-primary-400' },
  cyan: { gradient: 'from-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  emerald: { gradient: 'from-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  amber: { gradient: 'from-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' }
};

export default function ExpertiseSection({ expertise, philosophy }: ExpertiseSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const expertiseCategories: ExpertiseCategory[] = [
    {
      title: 'Languages & Core',
      icon: <Code2 className="w-6 h-6" />,
      items: expertise.languages,
      color: 'primary'
    },
    {
      title: 'Frameworks & Engines',
      icon: <Layers className="w-6 h-6" />,
      items: expertise.frameworks,
      color: 'cyan'
    },
    {
      title: 'Architecture',
      icon: <Building2 className="w-6 h-6" />,
      items: expertise.architecture,
      color: 'emerald'
    },
    {
      title: 'DevOps & Cloud',
      icon: <Cloud className="w-6 h-6" />,
      items: expertise.devops,
      color: 'amber'
    }
  ];

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-100">
            Engineering Philosophy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophy.map((item, i) => (
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
