// components/layout/sections/homepage/Faq.tsx
'use client';

import { Container, Row, Col, Accordion } from 'react-bootstrap';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqData } from '@/lib/data';
import { motion } from 'framer-motion';

const Faq = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Questions Fréquentes',
      subtitle: 'Trouvez des réponses aux questions les plus courantes.',
    },
    en: {
      title: 'Most Common Questions',
      subtitle: 'Find answers to the most common questions.',
    },
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--light-gray)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{translations[language].title}</h2>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </div>
        <Row className="align-items-center">
          {/* Image Column - Hidden on small screens */}
          <Col md={5} className="d-none d-md-block">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Image
                src="/images/faq-image.png"
                alt="FAQ illustration"
                width={800}
                height={900}
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          </Col>

          {/* Accordion Column */}
          <Col md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Using the flush variant for a modern, borderless look */}
              <Accordion defaultActiveKey="0" flush>
                {faqData.map((item, index) => (
                  <Accordion.Item 
                    key={index} 
                    eventKey={String(index)} 
                    className="mb-3 card-custom" // Reusing our custom card style!
                  >
                    <Accordion.Header>{item.question[language]}</Accordion.Header>
                    <Accordion.Body>
                      {item.answer[language]}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Faq;