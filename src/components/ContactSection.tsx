import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ContactSectionProps {
  email: string;
  name?: string;
}

export default function ContactSection({ email }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    'form-name': 'contact',
    'bot-field': '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitState('submitting');

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params.append(key, value);
      } else if (value instanceof File) {
        params.append(key, value.name);
      }
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        setSubmitState('success');
        trackEvent('form_submit', { form_name: 'contact', status: 'success' });
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
          'form-name': 'contact',
          'bot-field': '',
        });
      } else {
        setSubmitState('error');
        trackEvent('form_submit', { form_name: 'contact', status: 'error' });
      }
    } catch {
      setSubmitState('error');
    }
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
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary-500/50 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-slate-700/50 group-hover:bg-primary-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-slate-100 font-medium">{email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="p-3 rounded-lg bg-slate-700/50">
                  <MapPin className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-slate-100 font-medium">Istanbul, Turkey</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/aktma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Github className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/mahiraktas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Send email"
                className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-primary-500/50 transition-all group"
              >
                <Send className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form name="contact" onSubmit={handleSubmit} className="glass-card p-8 space-y-6" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" value="" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                    className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="[Your Name]"
                    disabled={submitState === 'submitting'}
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
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                    className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="[your.email@domain.com]"
                    disabled={submitState === 'submitting'}
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
                  name="subject"
                  value={formState.subject}
                  onChange={(e) => setFormState(p => ({ ...p, subject: e.target.value }))}
                  className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="[Project inquiry, collaboration, etc.]"
                  disabled={submitState === 'submitting'}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  className={`input-field resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="[Tell me about your project, timeline, and requirements...]"
                  disabled={submitState === 'submitting'}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
                disabled={submitState === 'submitting'}
              >
                {submitState === 'submitting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                )}
                {submitState === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Sent Successfully!
                  </>
                )}
                {submitState === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Failed - Try Again
                  </>
                )}
                {submitState === 'idle' && (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {submitState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-400"
                >
                  Thank you! I'll get back to you within 24 hours.
                </motion.p>
              )}
              {submitState === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-400"
                >
                  Something went wrong. Please try again or email directly at {email}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
