'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Outfit, DM_Sans } from 'next/font/google';
import { motion, Variants, AnimatePresence } from 'framer-motion'; 
import { Menu, X, Globe, ArrowRight, ChevronRight, Plus, ShieldCheck, Handshake, CheckCircle, Moon, Sun } from 'lucide-react';

// --- CONFIGURACIÓN DE FUENTES ---
const fontHeading = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'] });
const fontBody = DM_Sans({ subsets: ['latin'], weight: ['400', '500'] });

// --- TIPOS DE DATOS ---
type Language = 'es' | 'en';
type Theme = 'dark' | 'light';

// Color institucional (Cyan)
const accentColor = '#00B3FF';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

const langSwitchVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } }
};

interface Content {
  nav: { cta: string; };
  hero: { 
      badge: string;
      titleLine1: string; 
      titleLine2: string; 
      description: string; 
      ctaPrimary: string; 
      trust: string; 
  };
  features: { title: string; items: string[] };
  faq: { 
      title: string; 
      subtitle: string; 
      items: Array<{ question: string; answer: string; }>; 
      cta: string; 
      ctaButton: string; 
  };
  footer: { copyright: string; };
}

// --- DICCIONARIO DE IDIOMAS ---
const content: Record<Language, Content> = {
  es: {
    nav: { cta: "Descargar App", },
    hero: {
      badge: "ALIANZA EXCLUSIVA CROFT + BLXCK PAY",
      titleLine1: "RECIBE Y USA TU PAGO",
      titleLine2: "SEGURO Y SIN FRONTERAS",
      description: "La forma más segura y fácil de recibir tu sueldo en EE. UU. desde el primer día. Envía dinero a casa con Félix Pago y usa tu tarjeta en cualquier lugar. Tu esfuerzo, protegido.",
      ctaPrimary: "Obtener mi Tarjeta Gratis",
      trust: "Recomendado por Croft para trabajadores H2A",
    },
    features: {
        title: "TU NUEVA VIDA FINANCIERA",
        items: [
            "Sin Seguro Social (SSN) requerido",
            "Envíos a Latam con Félix Pago (WhatsApp)",
            "Depósito directo de tu empleador",
            "Cero comisiones mensuales",
        ]
    },
    faq: {
      title: "PREGUNTAS FRECUENTES",
      subtitle: "RESOLVEMOS TUS DUDAS ANTES DE VIAJAR",
      items: [
        { question: "¿Por qué Croft me recomienda Blxck Pay?", answer: "Porque queremos que llegues a EE. UU. con una solución financiera lista. Blxck Pay está diseñada para trabajadores H2A: fácil de abrir, en español y sin los requisitos complicados de los bancos tradicionales." },
        { question: "¿Cómo envío dinero a mi familia?", answer: "Es facilísimo. Gracias a nuestra integración con Félix Pago, puedes enviar remesas directamente desde WhatsApp de forma instantánea y segura a México, Guatemala y toda Latinoamérica." },
        { question: "¿Necesito SSN para activar mi tarjeta?", answer: "No. Sabemos que acabas de llegar o estás en proceso. Puedes activar tu cuenta usando solo tu Pasaporte vigente y tu visa H2A." },
        { question: "¿Tiene algún costo recibir mi nómina aquí?", answer: "Ninguno. Puedes darle tu número de cuenta a tu empleador para que deposite tu pago directamente. Es más seguro que el efectivo y llega rápido." },
        { question: "¿Dónde puedo retirar efectivo?", answer: "Tienes acceso a una red de más de 40,000 cajeros automáticos (Moneypass) sin comisiones. Además, puedes usar tu tarjeta para pagar en cualquier tienda que acepte Visa." },
        { question: "¿Mi dinero está seguro en EE. UU.?", answer: "Totalmente. Tu cuenta está asegurada por la FDIC hasta $250,000 a través de nuestro banco socio. Tu dinero es tuyo y está protegido bajo las leyes estadounidenses." }
      ],
      cta: "¿Tienes más dudas sobre BlxckPay?",
      ctaButton: "Contactar Soporte"
    },
    footer: { copyright: "© 2026 Blxck Pay en colaboración con Croft.", },
  },
  en: {
    nav: { cta: "Get App", },
    hero: {
      badge: "EXCLUSIVE PARTNERSHIP CROFT + BLXCK PAY",
      titleLine1: "A SAFE, EASY WAY TO",
      titleLine2: "RECEIVE & USE YOUR PAY",
      description: "Receive your H2A wages safely from day one. Send money home instantly with Felix Pago and use your card everywhere everyday. Your hard work, secured.",
      ctaPrimary: "Get my Free Card",
      trust: "Recommended by Croft for H2A Workers",
    },
    features: {
        title: "YOUR FINANCIAL FREEDOM",
        items: [
            "No Social Security (SSN) needed",
            "Send to Latam via Felix Pago (WhatsApp)",
            "Direct deposit from your employer",
            "Zero monthly maintenance fees",
        ]
    },
    faq: {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "WE GOT ANSWERS FOR YOUR JOURNEY",
      items: [
        { question: "Why does Croft recommend Blxck Pay?", answer: "Because we want you to arrive in the US with a financial solution ready. Blxck Pay is tailored for H2A workers: easy to open, Spanish support, and no complex requirements like traditional banks." },
        { question: "How do I send money to my family?", answer: "It's incredibly easy. Thanks to our partnership with Felix Pago, you can send remittances directly via WhatsApp instantly and securely to Mexico, Guatemala, and all of Latin America." },
        { question: "Do I need an SSN to activate my card?", answer: "No. We know you are just arriving. You can activate your account using just your valid Passport and H2A visa." },
        { question: "Is there a cost to receive my payroll?", answer: "None. You can provide your account number to your employer for direct deposit. It is safer than cash and arrives quickly." },
        { question: "Where can I withdraw cash?", answer: "You have access to a network of over 40,000 fee-free ATMs (Moneypass). Plus, you can use your card to pay anywhere Visa is accepted." },
        { question: "Is my money safe in the US?", answer: "Absolutely. Your account is FDIC insured up to $250,000 through our partner bank. Your money is yours and protected under US laws." }
      ],
      cta: "Have more questions about BlxckPay?",
      ctaButton: "Contact Support"
    },
    footer: { copyright: "© 2026 Blxck Pay in partnership with Croft.", },
  },
};

// --- COMPONENTE FAQ ITEM ---
const FAQItem = ({ question, answer, theme }: { question: string, answer: string, theme: Theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Estilos dinámicos según el tema
  const borderClass = theme === 'dark' ? 'border-zinc-800' : 'border-gray-200';
  const hoverClass = theme === 'dark' ? 'hover:bg-zinc-900/50' : 'hover:bg-gray-50';
  const textTitleClass = theme === 'dark' ? (isOpen ? 'text-[#00B3FF]' : 'text-white') : (isOpen ? 'text-[#00B3FF]' : 'text-black');
  const iconContainerClass = theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-black';
  const iconActiveClass = isOpen ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : '';
  const textBodyClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div variants={fadeInUp} className={`border-b last:border-0 ${borderClass}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center w-full py-6 text-left group px-4 rounded-lg transition-colors ${hoverClass}`}
      >
        <h3 className={`text-lg font-semibold pr-8 transition-colors duration-300 ${textTitleClass}`}>
          {question}
        </h3>
        <div 
          className={`transform transition-transform duration-300 ease-in-out rounded-full p-2 ${iconContainerClass} ${iconActiveClass} ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          {isOpen ? <X size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className={`${textBodyClass} leading-relaxed text-sm md:text-base`}>
          {answer}
        </p>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function CroftLandingPage() {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark'); // Estado inicial Dark Mode
  
  const t = content[lang];

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // --- CLASES DINÁMICAS GENERALES ---
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const navBgClass = theme === 'dark' ? 'bg-black/90 border-zinc-800' : 'bg-white/90 border-gray-200';
  const borderClass = theme === 'dark' ? 'border-zinc-900' : 'border-gray-200';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const badgeBgClass = theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200';
  const cardBgClass = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
  const cardBorderClass = theme === 'dark' ? 'border-zinc-800' : 'border-gray-200';
  const cardInnerBgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const buttonSecondaryClass = theme === 'dark' ? 'text-white border-zinc-700 hover:bg-zinc-800' : 'text-black border-black hover:bg-black hover:text-white';
  
  // Selección de Logo según tema
  const logoSrc = theme === 'dark' ? "/logoblxckpay_white.png" : "/logoblxckpay.png";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} ${fontBody.className} selection:bg-[#00B3FF] selection:text-white overflow-x-hidden transition-colors duration-500`}>
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-500 ${navBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             {/* Logo Cambiante */}
             <div className="relative w-28 h-8 md:w-36 md:h-10">
                <Image 
                    key={theme} // Fuerza re-render al cambiar tema
                    src={logoSrc} 
                    alt="Blxck Pay" 
                    fill 
                    className="object-contain object-left" 
                    priority 
                />
             </div>
             <div className={`h-6 w-[1px] ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}></div>
             <span className={`${textClass} font-bold tracking-widest text-sm md:text-lg`}>CROFT</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón Idioma */}
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-2 border px-3 py-1.5 rounded-full transition uppercase text-xs tracking-wider ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              <Globe size={14} />
              <AnimatePresence mode='wait'>
                <motion.span
                  key={lang}
                  variants={langSwitchVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {lang}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Botón Tema (Dark/Light) */}
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-colors duration-300 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800 text-yellow-400' : 'border-gray-300 hover:bg-gray-100 text-zinc-600'}`}
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- HERO DE VENTA --- */}
      <section className={`pt-32 pb-16 px-6 relative overflow-hidden border-b transition-colors duration-500 ${borderClass}`}>
        
        {/* Fondo sutil (Solo en dark mode para dar profundidad) */}
        {theme === 'dark' && (
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B3FF]/10 rounded-full blur-[120px] -z-0 pointer-events-none opacity-50"></div>
        )}

        <div className="max-w-4xl mx-auto text-center relative z-10">
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-8 ${badgeBgClass}`}
            >
                <Handshake size={16} className="text-[#00B3FF]" />
                <span className="text-[#00B3FF] text-xs font-bold tracking-widest uppercase">{t.hero.badge}</span>
            </motion.div>

            <motion.h1 
                key={`title-${lang}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${fontHeading.className} text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 ${textClass}`}
            >
              {t.hero.titleLine1} <br />
              <span className="text-[#00B3FF]">
                {t.hero.titleLine2}
              </span>
            </motion.h1>

            <motion.p 
                key={`desc-${lang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${secondaryTextClass} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10`}
            >
              {t.hero.description}
            </motion.p>

            {/* --- FEATURES CON BORDER BEAM --- */}
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-left md:text-center"
            >
                {t.features.items.map((item, i) => (
                    <motion.div 
                        key={i} 
                        variants={fadeInUp} 
                        className={`group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl shadow-lg ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white border border-gray-100'}`}
                    >
                        {/* Animación de luz giratoria */}
                        <div className="absolute inset-[-100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00B3FF_15%,transparent_30%)] opacity-100" />
                        
                        {/* Capa interior (Tapa el centro para dejar solo el borde) */}
                        <div className={`relative flex h-[calc(100%-3px)] w-[calc(100%-3px)] flex-col items-center justify-center gap-2 rounded-xl p-4 ${cardInnerBgClass}`}>
                            <CheckCircle size={24} className="text-[#00B3FF]" />
                            <span className={`${textClass} text-xs md:text-sm font-semibold leading-tight`}>{item}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4"
            >
                {/* Botón Principal (Cambia según tema para contraste óptimo) */}
                <button 
                    className={`w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-[#00B3FF] text-black hover:opacity-90' : 'bg-black text-white hover:bg-zinc-800'}`}
                >
                    {t.hero.ctaPrimary} <ArrowRight size={20} />
                </button>
                <div className={`flex items-center gap-2 text-sm ${secondaryTextClass}`}>
                    <ShieldCheck size={16} />
                    <span>{t.hero.trust}</span>
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className={`py-20 px-6 relative transition-colors duration-500 ${bgClass}`}>
         <motion.div 
           key={`faq-${lang}`}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={staggerContainer}
           className="max-w-3xl mx-auto"
         >
            <div className="text-center mb-12">
               <motion.h2 variants={fadeInUp} className={`${fontHeading.className} text-3xl md:text-4xl font-bold mb-3 ${textClass}`}>
                   {t.faq.title}
               </motion.h2>
               <motion.p variants={fadeInUp} className="text-[#00B3FF] font-medium tracking-wide uppercase text-sm">
                   {t.faq.subtitle}
               </motion.p>
            </div>

            <div className="space-y-3">
                {t.faq.items.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} theme={theme} />
                ))}
            </div>

            <motion.div variants={fadeInUp} className={`mt-16 text-center pt-10 border-t ${borderClass}`}>
                <p className={`${secondaryTextClass} mb-6`}>{t.faq.cta}</p>
                <button className={`border-2 font-bold px-8 py-3 rounded-full transition inline-flex items-center gap-2 ${buttonSecondaryClass}`}>
                    {t.faq.ctaButton} <ChevronRight size={18} />
                </button>
            </motion.div>
         </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`border-t py-10 px-6 text-center transition-colors duration-500 ${borderClass} ${bgClass}`}>
          <p className={`${secondaryTextClass} text-sm`}>{t.footer.copyright}</p>
      </footer>
    </div>
  );
}