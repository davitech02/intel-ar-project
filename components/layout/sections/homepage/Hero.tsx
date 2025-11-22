// components/sections/homepage/Hero.tsx
'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion'; // We'll add this for animation

const Hero = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      slogan: "L'IA au service de la performance et de l'humanité.",
      description: "Nous aidons les entreprises à naviguer dans la transformation numérique et à intégrer l'intelligence artificielle pour une croissance durable et éthique.",
      cta_services: "Découvrir nos services",
      cta_contact: "Nous contacter",
    },
    en: {
      slogan: "AI at the service of performance and humanity.",
      description: "We help businesses navigate digital transformation and integrate artificial intelligence for sustainable and ethical growth.",
      cta_services: "Discover our services",
      cta_contact: "Contact us",
    },
  };

  return (
    <div style={{ backgroundColor: 'var(--midnight-blue)' }} className="text-white">
      <Container className="text-center py-5">
        <Row className="py-lg-5">
          <Col lg={8} md={10} className="mx-auto">
            <motion.h1 
              className="display-4 fw-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {translations[language].slogan}
            </motion.h1>
            <motion.p 
              className="lead my-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {translations[language].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/services" passHref>
                <Button className="btn-cyan me-2" size="lg">{translations[language].cta_services}</Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="outline-light" size="lg">{translations[language].cta_contact}</Button>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;