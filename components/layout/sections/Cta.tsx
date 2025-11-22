// components/layout/sections/Cta.tsx
'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const Cta = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: "Prêt à transformer votre entreprise ?",
      subtitle: "Discutons de la manière dont l'IA et la transformation numérique peuvent propulser votre croissance. Contactez-nous dès aujourd'hui pour une consultation gratuite.",
      button: "Planifier une consultation",
    },
    en: {
      title: "Ready to transform your business?",
      subtitle: "Let's discuss how AI and digital transformation can fuel your growth. Contact us today for a free consultation.",
      button: "Schedule a Consultation",
    },
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--midnight-blue)' }}>
      <Container>
        <Row className="justify-content-center text-center text-white">
          <Col md={10} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="display-5 fw-bold mb-3">{translations[language].title}</h2>
              <p className="lead mb-4">{translations[language].subtitle}</p>
              <Link href="/contact" passHref>
                <Button size="lg" className="btn-cyan fw-bold">
                  {translations[language].button}
                </Button>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cta;