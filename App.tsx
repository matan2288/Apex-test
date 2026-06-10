import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Linkedin, Mail, Check, ArrowUpRight } from 'lucide-react';
import { AIPersonaChat } from './components/AIPersonaChat';
import { 
  portfolioPillars, 
  portfolioExperiences, 
  portfolioSkills, 
  portfolioRecommendations 
} from './portfolio-data';

// Reuse SectionLabel component for section headers
interface SectionLabelProps {
  num: string;
  title: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ num, title }) => {
  return (
    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
      <span className="font-semibold text-zinc-900">{num}</span>
      <span className="text-zinc-300">—</span>
      <span className="text-zinc-500 font-medium">{title}</span>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('00');
  const [selectedPillarId, setSelectedPillarId] = useState(portfolioPillars[0].id);
  
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Numbered nav items: 00 to 05
  const navItems = [
    { num: '00', label: 'Dialogue', href: '#dia' },
    { num: '01', label: 'About', href: '#about' },
    { num: '02', label: 'Experience', href: '#exp' },
    { num: '03', label: 'Skills', href: '#skills' },
    { num: '04', label: 'Quotes', href: '#quotes' },
    { num: '05', label: 'Contact', href: '#contact' },
  ];

  // Track scroll position to update active navbar index
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = [
        { id: '00', element: document.getElementById('dia') },
        { id: '01', element: document.getElementById('about') },
        { id: '02', element: document.getElementById('exp') },
        { id: '03', element: document.getElementById('skills') },
        { id: '04', element: document.getElementById('quotes') },
        { id: '05', element: document.getElementById('contact') },
      ];

      for (const sec of sections) {
        if (sec.element) {
          const offsetTop = sec.element.offsetTop;
          const offsetHeight = sec.element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail.trim().length > 3) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactEmail('');
        setContactMsg('');
      }, 5000);
    }
  };

  const selectedPillar = portfolioPillars.find(p => p.id === selectedPillarId) || portfolioPillars[0];

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-zinc-100 selection:text-zinc-900 antialiased scroll-smooth">
      
      {/* 3. Top Navbar — Fixed header, logo left, numbered links right */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-[42rem] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#dia" className="font-mono text-xs uppercase tracking-wider font-bold hover:text-zinc-500 transition-colors">
            MATAN <span className="text-zinc-400 font-normal">// 2288</span>
          </a>

          {/* Desktop inline horizontal nav */}
          <nav className="hidden sm:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.num}
                href={item.href}
                className={`group flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  activeSection === item.num 
                    ? 'text-zinc-950 font-bold underline underline-offset-4' 
                    : 'text-zinc-400 hover:text-zinc-900'
                }`}
              >
                <span>{item.num}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans lowercase hidden lg:inline text-zinc-500">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="sm:hidden text-zinc-900 p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav menu below header */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-b border-zinc-200 py-4 px-6 space-y-3.5 shadow-sm transition-all">
            {navItems.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 text-xs font-mono uppercase tracking-wider ${
                  activeSection === item.num ? 'text-zinc-950 font-bold' : 'text-zinc-500'
                }`}
              >
                <span className="text-[10px] text-zinc-400">{item.num}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Single Column Container - max-width: 42rem editorial layout */}
      <main className="max-w-[42rem] mx-auto px-6 pt-24 pb-20">
        
        {/* Section 00 — Hero with Name, Location, Tagline and integrated AI chat */}
        <section id="dia" className="min-h-[85vh] flex flex-col justify-center py-12">
          <SectionLabel num="00" title="Twin Dialogue" />
          
          <div className="mb-8">
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block mb-2">
              TEL AVIV, ISRAEL
            </span>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#111827] uppercase leading-none mb-4">
              Matan // 2288
            </h1>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-4">
              Full-Stack Specialist &amp; eCommerce Component Engineer
            </p>
            <p className="text-sm text-zinc-600 leading-7 max-w-xl">
              I have exactly 4 years of software development experience specializing in optimizing enterprise checkout buyflows, integrating tag management infrastructures, and crafting pixel-perfect client integrations (Altice, 3UK, USCC).
            </p>
          </div>

          {/* Embedded AI Chat Interface right on the Hero Page load */}
          <div className="mt-4">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Quick Query Sandbox — Ask anything about my contracts:
            </p>
            <AIPersonaChat />
          </div>
        </section>

        {/* Section 01 — About Section with interactive numbered pillars */}
        <section id="about" className="py-20 border-t border-zinc-200">
          <SectionLabel num="01" title="About &amp; Principles" />
          
          <div className="space-y-6 text-[#4B5563] text-sm leading-8 mb-12">
            <p>
              I treat system design with mechanical integrity. Understanding browser-side telemetry bottlenecks and writing bulletproof, type-safe custom UI architectures are the core mechanics of my engineering process.
            </p>
            <p>
              Over the past 4 years, I've engineered highly secure, low-latency, and high-converting checkout user paths for international partners, maintaining direct accountability to major stakeholder units.
            </p>
          </div>

          {/* Interactive pillars with minimal tab selector */}
          <div className="border border-zinc-200 rounded-lg p-5 bg-zinc-50/50">
            <div className="flex gap-2 overflow-x-auto pb-4 border-b border-zinc-200">
              {portfolioPillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillarId(p.id)}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide rounded border transition-all cursor-pointer whitespace-nowrap outline-none ${
                    selectedPillarId === p.id
                      ? 'bg-zinc-900 border-zinc-900 text-white font-bold'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {p.num} / {p.id}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider block mb-1">
                {selectedPillar.subtitle}
              </span>
              <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase mb-2">
                {selectedPillar.title}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {selectedPillar.desc}
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 — Experience company blocks */}
        <section id="exp" className="py-20 border-t border-zinc-200">
          <SectionLabel num="02" title="Experience" />
          
          <div className="space-y-12">
            {portfolioExperiences.map((exp, idx) => (
              <div key={idx} className="group border-l border-zinc-200 pl-5 relative">
                {/* Visual marker */}
                <div className="absolute w-2 h-2 rounded-full bg-zinc-300 left-[-4.5px] top-1.5 group-hover:bg-zinc-900 transition-colors"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827] uppercase tracking-tight family-sans">
                      {exp.role}
                    </h3>
                    <div className="text-[11px] font-mono text-zinc-500">
                      {exp.company} · {exp.location}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 sm:text-right mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="text-xs text-zinc-600 leading-6 flex items-start gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 select-none mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((s) => (
                    <span key={s} className="text-[9px] font-mono text-zinc-600 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 03 — Skills Directory visually represented as pills */}
        <section id="skills" className="py-20 border-t border-zinc-200">
          <SectionLabel num="03" title="Skills Directory" />
          
          <div className="space-y-8">
            {portfolioSkills.map((cat, idx) => (
              <div key={idx} className="border border-zinc-150 rounded-lg p-5">
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-4">
                  {cat.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 rounded text-[10px] font-mono text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04 — Recommendations stacked quote blocks */}
        <section id="quotes" className="py-20 border-t border-zinc-200">
          <SectionLabel num="04" title="Recommendations" />
          
          <div className="space-y-8">
            {portfolioRecommendations.map((rec, idx) => (
              <div key={idx} className="border-l-2 border-zinc-900 pl-4 py-1 italic text-zinc-600 font-sans text-xs leading-relaxed">
                <p className="mb-3">
                  "{rec.quote}"
                </p>
                <div className="font-mono text-[10px] tracking-tight text-zinc-500 not-italic">
                  — {rec.author}, <span className="font-semibold text-zinc-800">{rec.role}</span> at {rec.company}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
              * Sourced from LinkedIn Recommendations
            </span>
          </div>
        </section>

        {/* Section 05 — Contact Ready together form */}
        <section id="contact" className="py-20 border-t border-zinc-100">
          <SectionLabel num="05" title="Get in Touch" />
          
          <div className="mb-10">
            <h2 className="text-xl font-medium uppercase tracking-tight text-zinc-900 mb-2">
              Ready to construct together?
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              I am open for contract, hybrid, or full-time opportunities in Tel Aviv tech hubs or remote teams worldwide. Let's start the dialogue.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-5 rounded border border-[#059669]/30 bg-[#059669]/5 text-zinc-800 text-xs font-mono flex flex-col items-center gap-2">
              <Check size={16} className="text-[#059669]" />
              <div className="font-bold uppercase text-[#059669]">Transmission Received</div>
              <p className="text-[10px] font-sans text-zinc-500 text-center">
                Your coordinates have been cached. I will review work bounds and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">
                  Your coordinates (email)
                </label>
                <input 
                  type="email" 
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@enterprise.com"
                  className="w-full bg-white border border-zinc-200 rounded px-3 py-2 text-xs text-zinc-900 font-mono outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">
                  Project / Role parameters
                </label>
                <textarea 
                  required
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Tell me about the stack, contract structure, and target timeline..."
                  className="w-full bg-white border border-zinc-200 rounded px-3 py-2 text-xs text-zinc-900 font-sans outline-none focus:border-zinc-900 resize-none leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-mono uppercase bg-zinc-900 hover:bg-zinc-800 text-white transition-colors rounded cursor-pointer outline-none"
              >
                Transmit Inquiries <ArrowRight size={10} />
              </button>
            </form>
          )}

          {/* Social Links Monospace Underlined */}
          <div className="mt-14 pt-8 border-t border-zinc-150 flex flex-wrap gap-5 text-xs font-mono">
            <a 
              href="mailto:MaTaN2288@gmail.com"
              className="text-zinc-650 hover:text-zinc-900 underline underline-offset-4 flex items-center gap-1.5"
            >
              MaTaN2288@gmail.com <ArrowUpRight size={12} />
            </a>
            <a 
              href="https://www.linkedin.com/in/matan2288" 
              target="_blank" 
              rel="noreferrer" 
              className="text-zinc-650 hover:text-zinc-900 underline underline-offset-4 flex items-center gap-1.5"
            >
              LinkedIn <ArrowUpRight size={12} />
            </a>
          </div>
        </section>

      </main>

      {/* Editorial Footer */}
      <footer className="bg-white border-t border-zinc-100 py-10 text-center text-zinc-400">
        <div className="max-w-[42rem] mx-auto px-6 text-[9px] font-mono tracking-widest uppercase">
          © 2026 MATAN2288. MINIMALIST EDITORIAL INTEGRITY. ALL CONSTRAINTS APPLIED.
        </div>
      </footer>

    </div>
  );
}
