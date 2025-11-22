// app/about/page.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '@/contexts/LanguageContext';
import { aboutData } from '@/lib/data';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'À Propos de Intel-Ar Inc.',
      subtitle: "Pionniers de l'intelligence, partenaires de votre croissance.",
    },
    en: {
      title: 'About Intel-Ar Inc.',
      subtitle: 'Pioneers of intelligence, partners in your growth.',
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

      {/* Mission, Vision, Values Section */}
      <Container className="py-5">
        <Row>
          {aboutData.map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Reusing our custom card style for consistency */}
                <Card className="h-100 card-custom text-center">
                  <Card.Body className="p-4">
                    <h3 className="fw-bold mb-3">{item.title[language]}</h3>
                    <p>{item.content[language]}</p>
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

export default AboutPage;