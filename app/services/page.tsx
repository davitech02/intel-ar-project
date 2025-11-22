// app/services/page.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Nos Services',
      subtitle: 'Des solutions complètes pour votre transformation IA et numérique.',
    },
    en: {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions for your AI and digital transformation.',
    },
  };

  return (
    <>
      {/* Page Header */}
      <div className="py-5 text-center" style={{ backgroundColor: 'var(--light-gray)' }}>
        <Container>
          <h1 className="display-4 fw-bold">{translations[language].title}</h1>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </Container>
      </div>

      {/* Services Grid */}
      <Container className="py-5">
        <Row>
          {servicesData.map((service, index) => (
            <Col md={6} lg={4} key={service.id} className="mb-4 d-flex align-items-stretch">
              <motion.div
                className="w-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Reusing our custom card style for consistency */}
                <Card className="h-100 card-custom">
                  <Image
                    src={service.image}
                    alt={service.title[language]}
                    width={800}
                    height={450}
                    style={{
                      borderTopLeftRadius: '1rem',
                      borderTopRightRadius: '1rem',
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body>
                    <Card.Title as="h4" className="fw-bold">{service.title[language]}</Card.Title>
                    <Card.Text>{service.description[language]}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ServicesPage;