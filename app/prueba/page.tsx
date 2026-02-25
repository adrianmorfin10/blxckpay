'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Componente de partículas (sólidas) ---
function FloatingParticles({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      
      const targetX = mouseX * 1.5;
      const targetY = -mouseY * 1.2;
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3}>
      <PointMaterial
        color="#ffffff"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </Points>
  );
}



// --- Componente principal 3D ---
function Scene3D({ mouseX, mouseY, scrollY }: { mouseX: number; mouseY: number; scrollY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 18 + scrollY * 0.003;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
      
      <FloatingParticles mouseX={mouseX} mouseY={mouseY} />
     
      
      {/* Esferas decorativas sólidas */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * 0.8) * 6,
          Math.cos(i * 1.2) * 4,
          Math.cos(i * 1.5) * 3
        ]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </>
  );
}

// --- Landing Page con GSAP ---
export default function Home() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Refs para animaciones
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseX(x);
      setMouseY(y);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Animaciones GSAP
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(heroTitleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
      gsap.from(heroTextRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
      gsap.from(heroButtonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)'
      });

      // Features
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
          });
        });
      }

      // How it works
      if (howRef.current) {
        const steps = howRef.current.querySelectorAll('.how-step');
        steps.forEach((step, index) => {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'back.out(1.2)'
          });
        });
      }

      // Testimonials
      if (testimonialsRef.current) {
        const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        });
      }

      // Contact
      if (contactRef.current) {
        gsap.from(contactRef.current.querySelector('h2'), {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1
        });
        gsap.from(contactRef.current.querySelector('.contact-form'), {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          delay: 0.3,
          duration: 0.8
        });
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <main style={{ position: 'relative', backgroundColor: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Canvas 3D de fondo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <Canvas
          camera={{ position: [0, 0, 18], fov: 60 }}
          style={{ background: '#000' }}
        >
          <Scene3D mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Overlay sutil (opcional, ayuda a la legibilidad) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Contenido de la página */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Navbar */}
        <nav style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: 10
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '2px' }}>BLXCKPAY</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#features" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Características</a>
            <a href="#how" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Cómo funciona</a>
            <a href="#testimonials" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Testimonios</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Contacto</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1 ref={heroTitleRef} style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            BLXCKPAY
          </h1>
          <p ref={heroTextRef} style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            fontWeight: 300,
            margin: '1.5rem 0 2.5rem',
            maxWidth: '800px',
            opacity: 0.9
          }}>
            La nueva era de la banca digital, minimalista y segura.
          </p>
          <button ref={heroButtonRef} style={{
            padding: '1rem 3rem',
            fontSize: '1.2rem',
            fontWeight: 400,
            color: '#000',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '40px',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255,255,255,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            Comenzar
          </button>
        </section>

        {/* Características */}
        <section id="features" style={{
          padding: '6rem 2rem',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, textAlign: 'center', marginBottom: '4rem' }}>Características</h2>
          <div ref={featuresRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { titulo: 'Seguridad avanzada', desc: 'Tus datos protegidos con cifrado de grado militar.' },
              { titulo: 'Sin comisiones ocultas', desc: 'Total transparencia en cada transacción.' },
              { titulo: 'Interfaz minimalista', desc: 'Diseño limpio y fácil de usar.' },
              { titulo: 'Soporte 24/7', desc: 'Estamos para ayudarte en todo momento.' }
            ].map((item, i) => (
              <div key={i} className="feature-card" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1rem' }}>{item.titulo}</h3>
                <p style={{ opacity: 0.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="how" style={{
          padding: '6rem 2rem',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, textAlign: 'center', marginBottom: '4rem' }}>Cómo funciona</h2>
          <div ref={howRef} style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { paso: '1', texto: 'Regístrate en minutos' },
              { paso: '2', texto: 'Vincula tu cuenta bancaria' },
              { paso: '3', texto: 'Comienza a operar' }
            ].map((item) => (
              <div key={item.paso} className="how-step" style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  margin: '0 auto 1.5rem'
                }}>{item.paso}</div>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{item.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section id="testimonials" style={{
          padding: '6rem 2rem',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, textAlign: 'center', marginBottom: '4rem' }}>Lo que dicen nuestros clientes</h2>
          <div ref={testimonialsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {[
              { nombre: 'Ana G.', texto: 'La mejor experiencia bancaria que he tenido. Simple y segura.' },
              { nombre: 'Carlos R.', texto: 'Por fin una fintech que entiende el diseño minimalista.' },
              { nombre: 'Lucía M.', texto: 'Las transferencias son instantáneas y el soporte excelente.' }
            ].map((item, i) => (
              <div key={i} className="testimonial-card" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{item.texto}"</p>
                <p style={{ fontWeight: 300, opacity: 0.7 }}>— {item.nombre}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section id="contact" style={{
          padding: '6rem 2rem',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '2rem' }}>¿Listo para empezar?</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem' }}>Recibe novedades y ofertas exclusivas.</p>
          <div ref={contactRef} className="contact-form" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Tu email" style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '40px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              minWidth: '280px'
            }} />
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              borderRadius: '40px',
              border: 'none',
              background: '#fff',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 500
            }}>Suscribirme</button>
          </div>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem', opacity: 0.6 }}>
            <a href="#" style={{ color: '#fff' }}>Términos</a>
            <a href="#" style={{ color: '#fff' }}>Privacidad</a>
            <a href="#" style={{ color: '#fff' }}>Cookies</a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ opacity: 0.5 }}>© 2025 BLXCKPAY. Todos los derechos reservados.</p>
        </footer>
      </div>
    </main>
  );
}