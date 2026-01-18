'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Outfit, DM_Sans } from 'next/font/google';
import { motion, Variants, AnimatePresence } from 'framer-motion'; 
import { Menu, X, Globe, ArrowRight, CreditCard, Send, Smartphone, Users, ChevronRight, Plus, CheckCircle } from 'lucide-react';

// --- CONFIGURACIÓN DE FUENTES ---
const fontHeading = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'] });
const fontBody = DM_Sans({ subsets: ['latin'], weight: ['400', '500'] });

// --- TIPOS DE DATOS ---
type Language = 'es' | 'en';

// Color institucional (Cyan)
const accentColor = '#00B3FF';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Variantes para el texto del botón de idioma
const langSwitchVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } }
};

interface Content {
  nav: { home: string; about: string; features: string; card: string; faq: string; cta: string; };
  hero: { tagline: string; titleLine1: string; titleLine2: string; description: string; ctaPrimary: string; ctaSecondary: string; trust: string; };
  features: { title: string; subtitle: string; cards: Array<{ title: string; desc: string; icon: React.ReactNode; }>; };
  cardSection: { title: string; subtitle: string; desc: string; list: string[]; cta: string; };
  faq: { title: string; subtitle: string; items: Array<{ question: string; answer: string; }>; cta: string; ctaButton: string; };
  footer: { copyright: string; };
}

// --- DICCIONARIO DE IDIOMAS ---
const content: Record<Language, Content> = {
  es: {
    nav: { home: "Inicio", about: "Nosotros", features: "Beneficios", card: "Tarjeta", faq: "Ayuda", cta: "Obtener App", },
    hero: {
      tagline: "TU DINERO, TUS REGLAS",
      titleLine1: "EL FUTURO DE",
      titleLine2: "TUS FINANZAS",
      description: "Diseñada para latinos que triunfan. Abre tu cuenta en EE. UU. solo con tu pasaporte. Sin SSN, sin comisiones sorpresa y con el control total de tu esfuerzo.",
      ctaPrimary: "Abrir Cuenta Gratis",
      ctaSecondary: "Cómo funciona",
      trust: "Más de 1M de latinos confían en nosotros",
    },
    features: {
      title: "MÁS QUE UN BANCO, TU ALIADO",
      subtitle: "POTENCIA TU ECONOMÍA",
      cards: [
        { title: "Tu pago llega antes", desc: "Cobra tu sueldo hasta 2 días antes. Tu dinero disponible cuando realmente lo necesitas.", icon: <Smartphone className="w-8 h-8" /> },
        { title: "Conecta con casa", desc: "Envía dinero a Latinoamérica al instante y con la mejor tasa de cambio del mercado.", icon: <Send className="w-8 h-8" /> },
        { title: "Libertad financiera", desc: "Una tarjeta Visa aceptada en todo el mundo. Compra en línea o en tiendas sin trabas.", icon: <CreditCard className="w-8 h-8" /> },
      ],
    },
    cardSection: {
        subtitle: "PODER EN TU BOLSILLO",
        title: "LA TARJETA QUE SIGUE TU RITMO",
        desc: "Maneja tus gastos con una cuenta y tarjeta de débito en EE. UU. Olvídate de los cargos por mantenimiento o saldos mínimos. Tú decides cómo usar tu plata.",
        list: ["Aceptación global con respaldo Visa", "Cero comisiones ocultas por uso", "Congela y descongela desde la App"],
        cta: "Solicítala sin costo"
    },
    faq: {
      title: "PREGUNTAS FRECUENTES",
      subtitle: "TE AYUDAMOS",
      items: [
        { question: "¿Por qué Blxck Pay es diferente?", answer: "Porque entendemos lo que es empezar de cero. Somos la app financiera inclusiva, sin letra chica y en tu idioma. Te damos acceso bancario real en EE. UU. sin las barreras de los bancos tradicionales." },
        { question: "¿De verdad no necesito SSN?", answer: "Totalmente cierto. Puedes abrir tu cuenta usando solo tu pasaporte vigente o matrícula consular. Validamos tu identidad en minutos desde tu celular." },
        { question: "¿Mi dinero está protegido?", answer: "Seguridad total. Tu cuenta reside en un banco asociado asegurado por la FDIC (hasta $250,000) y la app está blindada con biometría y encriptación avanzada." },
        { question: "¿Hay costos escondidos?", answer: "Ninguno. Odiamos las comisiones fantasma tanto como tú. No cobramos por apertura, ni mensualidad, ni te exigimos mantener un saldo mínimo." },
        { question: "¿Qué tanto puedo hacer con la App?", answer: "Todo. Desde recibir tu nómina más rápido, pagar servicios, usar tu tarjeta física o virtual, hasta enviar remesas a tu familia en segundos." }
      ],
      cta: "¿Te quedó alguna duda? Visita nuestro centro de ayuda.",
      ctaButton: "Ver más respuestas"
    },
    footer: { copyright: "© 2026 Blxck Pay. Todos los derechos reservados.", },
  },
  en: {
    nav: { home: "Home", about: "About", features: "Benefits", card: "Debit Card", faq: "Support", cta: "Get the App", },
    hero: {
      tagline: "BANKING WITHOUT BORDERS",
      titleLine1: "YOUR MONEY,",
      titleLine2: "EVOLVED.",
      description: "The financial super-app built for the modern earner. Open a US bank account in minutes with just your Passport. No SSN required, zero hidden fees.",
      ctaPrimary: "Start for Free",
      ctaSecondary: "Watch Video",
      trust: "Trusted by 1M+ users nationwide",
    },
    features: {
      title: "NEXT-GEN FINANCIAL TOOLS",
      subtitle: "THE DIGITAL EDGE",
      cards: [
        { title: "Get Paid Faster", desc: "Access your paycheck up to 2 days early. Why wait for your own money?", icon: <Smartphone className="w-8 h-8" /> },
        { title: "Send Global, Instantly", desc: "Cross-border transfers to 17+ countries in seconds, not days.", icon: <Send className="w-8 h-8" /> },
        { title: "Spend Anywhere", desc: "A Visa debit card that works correctly everywhere. Online, offline, worldwide.", icon: <CreditCard className="w-8 h-8" /> },
      ],
    },
    cardSection: {
        subtitle: "YOUR PHYSICAL CASH",
        title: "THE CARD THAT KEEPS UP",
        desc: "Seamlessly manage your finances with a premium US checking account. No maintenance fees, no minimum balance requirements. Just total control.",
        list: ["Worldwide Visa acceptance", "No hidden transaction fees", "Instantly freeze card in-app"],
        cta: "Get your Free Card"
    },
    faq: {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "WE GOT ANSWERS",
      items: [
        { question: "Why choose Blxck Pay?", answer: "Because we are building the most inclusive financial platform. We give you access to a fully functional US bank account without the red tape of traditional institutions." },
        { question: "Do I really not need an SSN?", answer: "Correct. We accept international Passports and Consular IDs. Our identity verification technology allows you to open an account in minutes from your phone." },
        { question: "Is it safe?", answer: "Bank-level security. Your funds are held at an FDIC-insured partner bank (up to $250,000) and your app is protected by FaceID and advanced encryption." },
        { question: "What about fees?", answer: "We believe in transparency. No opening fees, no monthly maintenance fees, and absolutely no minimum balance requirements." },
        { question: "What features are included?", answer: "Everything you need: Early direct deposit, physical and virtual debit cards, bill pay, and instant international transfers." }
      ],
      cta: "Have more questions? Check our Help Center.",
      ctaButton: "View more"
    },
    footer: { copyright: "© 2026 Blxck Pay. All rights reserved.", },
  },
};

// --- COMPONENTE FAQ ITEM ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="border-b border-zinc-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-8 text-left group hover:bg-zinc-900/30 transition-colors px-4 rounded-lg"
      >
        <h3 className={`text-lg md:text-xl font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-[#00B3FF]' : 'text-white'}`}>
          {question}
        </h3>
        <div 
          className={`transform transition-transform duration-300 ease-in-out bg-zinc-800 rounded-full p-2 ${isOpen ? 'rotate-90 bg-white text-black' : 'rotate-0 text-white'}`}
        >
          {isOpen ? <X size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${isOpen ? 'max-h-60 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function LandingPage() {
  const [lang, setLang] = useState<Language>('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang];

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); 
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-black text-black ${fontBody.className} selection:bg-[#00B3FF] selection:text-white overflow-x-hidden`}>
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-white/95 border-b border-gray-100 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center cursor-pointer">
            <div className="relative w-44 h-12 md:w-64 md:h-20">
                <Image src="/logoblxckpay.png" alt="Blxck Pay Logo" fill className="object-contain object-left" priority />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
            {/* key={lang} para animar el texto del menú al cambiar idioma */}
            <AnimatePresence mode="wait">
              <motion.div key={lang} variants={staggerContainer} initial="hidden" animate="visible" className="flex gap-8">
                <motion.a variants={fadeInUp} href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-black transition-colors">{t.nav.home}</motion.a>
                <motion.a variants={fadeInUp} href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-black transition-colors">{t.nav.features}</motion.a>
                <motion.a variants={fadeInUp} href="#card" onClick={(e) => scrollToSection(e, 'card')} className="hover:text-black transition-colors">{t.nav.card}</motion.a>
                <motion.a variants={fadeInUp} href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-black transition-colors">{t.nav.faq}</motion.a>
              </motion.div>
            </AnimatePresence>
            
            {/* Switch de Idioma Animado */}
            <motion.button 
              onClick={toggleLang}
              whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md transition uppercase text-xs tracking-wider overflow-hidden min-w-[80px] justify-center relative"
            >
              <Globe size={14} className="absolute left-3"/>
              <AnimatePresence mode='wait'>
                <motion.span
                  key={lang}
                  variants={langSwitchVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="pl-4"
                >
                  {lang}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button 
              key={`cta-${lang}`} // Reinicia animación al cambiar idioma
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-3 rounded-md font-bold hover:opacity-90 transition shadow-lg shadow-blue-500/20" 
              style={{ backgroundColor: accentColor }}
            >
              {t.nav.cta}
            </motion.button>
          </div>

          <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 absolute w-full shadow-xl top-[70px]"
          >
            {/* Menú móvil animado al cambiar idioma */}
            <AnimatePresence mode="wait">
                <motion.div key={lang} variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
                    <motion.a variants={fadeInLeft} href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-xl font-bold">{t.nav.home}</motion.a>
                    <motion.a variants={fadeInLeft} href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-xl font-bold">{t.nav.features}</motion.a>
                    <motion.a variants={fadeInLeft} href="#card" onClick={(e) => scrollToSection(e, 'card')} className="text-xl font-bold">{t.nav.card}</motion.a>
                    <motion.a variants={fadeInLeft} href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-xl font-bold">{t.nav.faq}</motion.a>
                </motion.div>
            </AnimatePresence>

            <motion.button 
                onClick={toggleLang} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 font-bold text-xl"
            >
              <Globe size={24} /> 
              <AnimatePresence mode="wait">
                <motion.span
                    key={lang}
                    variants={langSwitchVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {lang === 'es' ? 'Cambiar a English' : 'Switch to Español'}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="pt-36 pb-12 md:pb-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Con Key={lang} para animar todo el bloque al cambiar idioma */}
          <motion.div 
            key={lang}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 relative z-20"
          >
            <motion.div variants={fadeInLeft} className="flex items-center gap-3">
              <span className="w-12 h-[2px]" style={{ backgroundColor: accentColor }}></span>
              <span className="text-sm font-bold tracking-widest uppercase text-gray-500">{t.hero.tagline}</span>
            </motion.div>
            
            <motion.h1 variants={fadeInLeft} className={`${fontHeading.className} text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-black`}>
              {t.hero.titleLine1} <br />
              <span style={{ color: accentColor }}>{t.hero.titleLine2}</span>
            </motion.h1>
            
            <motion.p variants={fadeInLeft} className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
              {t.hero.description}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="bg-black text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-zinc-800 transition flex justify-center items-center gap-2">
                {t.hero.ctaPrimary} <ArrowRight size={20} />
              </button>
              <button className="bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-md font-bold text-lg hover:border-black transition">
                {t.hero.ctaSecondary}
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-6 border-t border-gray-100">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                       <Users size={16} className="text-gray-400"/>
                    </div>
                  ))}
               </div>
               <span className="text-sm font-semibold text-gray-500">{t.hero.trust}</span>
            </motion.div>
          </motion.div>

          {/* HERO IMAGE CONTAINER & BACKGROUND (ESTÁTICO) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center md:h-[800px] z-10 mt-10 md:mt-0"
          >
            {/* --- FONDO DE FIGURAS GEOMÉTRICAS ESTÁTICAS --- 
                Sin animación de rotación, pero conservando los estilos.
            */}
            
            {/* Anillo grande exterior */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-[400px] h-[400px] md:w-[600px] md:h-[600px] 
                            rounded-full border-2 border-[#00B3FF]/40 -z-10"></div>
            
            {/* Anillo mediano descentrado */}
            <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 
                            w-[300px] h-[300px] md:w-[450px] md:h-[450px] 
                            rounded-full border-2 border-[#00B3FF]/50 -z-10"></div>
            
            {/* Círculo sólido central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-[250px] h-[250px] md:w-[350px] md:h-[350px] 
                            rounded-full bg-[#00B3FF]/15 -z-10"></div>

            {/* Pequeño círculo decorativo */}
             <div className="absolute bottom-[10%] left-[20%] 
                            w-24 h-24 rounded-full bg-[#00B3FF]/25 -z-10"></div>

            
            {/* Contenedor del Celular */}
            <div className="relative z-10 w-full max-w-[280px] md:max-w-none md:w-[550px] lg:w-[650px] transform hover:scale-[1.02] transition-transform duration-700 ease-in-out mx-auto">
                <Image src="/heroblxckpay.png" alt="Blxck Pay App Interface" width={650} height={1300} className="drop-shadow-2xl object-contain h-auto w-full" priority />
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="bg-black py-24 px-6 text-white border-t border-zinc-900">
         <motion.div 
           key={lang} // Animación al cambiar idioma
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={staggerContainer}
           className="max-w-7xl mx-auto"
         >
            <div className="mb-20">
              <motion.span variants={fadeInUp} className="text-[#00B3FF] font-bold tracking-widest uppercase text-sm mb-4 block">
                {t.features.subtitle}
              </motion.span>
              <motion.h2 variants={fadeInUp} className={`${fontHeading.className} text-4xl md:text-5xl font-bold`}>
                {t.features.title}
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.features.cards.map((card, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-[#00B3FF] transition-colors duration-300"
                >
                  <div className="w-14 h-14 bg-black border border-zinc-800 rounded-xl flex items-center justify-center mb-6 text-[#00B3FF]">
                    {card.icon}
                  </div>
                  <h3 className={`${fontHeading.className} text-2xl font-bold mb-3`}>{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
         </motion.div>
      </section>

      {/* --- CARD SECTION --- */}
      <section id="card" className="bg-black py-24 px-6 text-white border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
             
             {/* Card Image */}
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={scaleIn}
               className="order-2 md:order-1 relative flex justify-center"
             >
                 {/* Decorative element behind card */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border-2 border-[#00B3FF]/30 rounded-full"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00B3FF]/10 rounded-full"></div>
                 
                 <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-all duration-700 w-[300px] md:w-[500px]">
                    <Image src="/cardblxckpay.png" alt="Blxck Pay Debit Card" width={600} height={400} className="drop-shadow-2xl object-contain h-auto w-full" />
                 </div>
             </motion.div>

             {/* Text Content - Con Key={lang} */}
             <motion.div 
               key={lang}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
               className="order-1 md:order-2 space-y-8"
             >
                 <motion.span variants={fadeInRight} className="text-[#00B3FF] font-bold tracking-widest uppercase text-sm">
                    {t.cardSection.subtitle}
                 </motion.span>
                 <motion.h2 variants={fadeInRight} className={`${fontHeading.className} text-4xl md:text-5xl font-bold leading-tight`}>
                    {t.cardSection.title}
                 </motion.h2>
                 <motion.p variants={fadeInRight} className="text-gray-400 text-lg leading-relaxed">
                    {t.cardSection.desc}
                 </motion.p>
                 
                 <ul className="space-y-4">
                    {t.cardSection.list.map((item, i) => (
                        <motion.li key={i} variants={fadeInRight} className="flex items-center gap-3 text-gray-300 font-medium">
                            <CheckCircle size={20} style={{ color: accentColor }} />
                            {item}
                        </motion.li>
                    ))}
                 </ul>

                 <motion.button variants={fadeInUp} className="mt-4 px-8 py-4 rounded-md font-bold text-black transition hover:opacity-90 shadow-lg shadow-cyan-500/20" style={{ backgroundColor: accentColor }}>
                     {t.cardSection.cta}
                 </motion.button>
             </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="bg-zinc-950 py-24 px-6 text-white border-t border-zinc-900">
         <motion.div 
           key={lang}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={staggerContainer}
           className="max-w-3xl mx-auto"
         >
            <div className="text-center mb-16">
               <motion.h2 variants={fadeInUp} className={`${fontHeading.className} text-4xl font-bold mb-4`}>{t.faq.title}</motion.h2>
               <motion.p variants={fadeInUp} className="text-gray-400">{t.faq.subtitle}</motion.p>
            </div>

            <div className="space-y-2">
                {t.faq.items.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-16 text-center pt-10 border-t border-zinc-900">
                <p className="text-gray-400 mb-6">{t.faq.cta}</p>
                <button className="text-black font-bold px-8 py-3 rounded-full hover:opacity-90 transition inline-flex items-center gap-2" style={{ backgroundColor: accentColor }}>
                    {t.faq.ctaButton} <ChevronRight size={18} />
                </button>
            </motion.div>
         </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6 text-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
              <div className={`${fontHeading.className} text-3xl font-bold tracking-tight`}>
                Blxck Pay.
              </div>
              <div className="flex gap-4">
                 <button className="bg-white text-black px-6 py-3 rounded-md font-bold text-sm">App Store</button>
                 <button className="bg-zinc-900 text-white border border-zinc-800 px-6 py-3 rounded-md font-bold text-sm">Google Play</button>
              </div>
            </div>
            <div className="text-center md:text-left text-gray-600 text-sm">
              <p>{t.footer.copyright}</p>
            </div>
         </div>
      </footer>
    </div>
  );
}