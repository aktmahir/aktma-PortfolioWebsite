interface FooterProps {
  name: string;
  initials: string;
}

export default function Footer({ name, initials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </span>
            <p className="text-slate-400 text-sm">
              © {currentYear} {name}. All rights reserved.
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
