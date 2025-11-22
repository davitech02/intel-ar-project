// components/sections/homepage/ServicesHighlight.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data'; // Import our data
import { motion } from 'framer-motion';

const ServicesHighlight = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Nos Services',
      subtitle: 'Nous transformons les défis en opportunités de croissance.',
    },
    en: {
      title: 'Our Services',
      subtitle: 'We turn challenges into growth opportunities.',
    },
  };

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Stagger the animation of each card
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--light-gray)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{translations[language].title}</h2>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </div>
        <Row>
          {servicesData.map((service, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                {/* Here we use our custom CSS class */}
                <Card className="h-100 card-custom">
                  {/* Using Next.js Image for optimization */}
                  <Image
                    src={service.image}
                    alt={service.title[language]}
                    width={800}
                    height={450}
                    style={{ 
                      borderTopLeftRadius: '1rem', 
                      borderTopRightRadius: '1rem',
                      width: '100%',
                      height: 'auto',
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
    </div>
  );
};

export default ServicesHighlight;