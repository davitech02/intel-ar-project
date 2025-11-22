// components/sections/homepage/Testimonials.tsx
'use client';

import { Container, Row, Col, Card, Image as BootstrapImage } from 'react-bootstrap';
import { useLanguage } from '@/contexts/LanguageContext';
import { testimonialsData } from '@/lib/data';
import { motion, Variants } from 'framer-motion'; // <-- FIX: Import 'Variants' type

const Testimonials = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Ce que nos clients disent',
      subtitle: 'Notre succès se mesure à la satisfaction de nos partenaires.',
    },
    en: {
      title: 'What Our Clients Say',
      subtitle: 'Our success is measured by the satisfaction of our partners.',
    },
  };

  // FIX: Explicitly define the type for our variants object using 'Variants'.
  // This removes the red underline.
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{translations[language].title}</h2>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </div>
        <Row>
          {testimonialsData.map((testimonial, index) => (
            <Col md={6} key={index} className="mb-4">
              <motion.div
                className="h-100"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                <Card className="h-100 card-custom text-center">
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-3">
                      <BootstrapImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        roundedCircle
                        width={80}
                        height={80}
                        // FIX: Pass all Bootstrap utility classes via the 'className' prop.
                        // This removes the yellow underlines.
                        className="border border-2 border-info"
                      />
                    </div>
                    {/* FIX: Use 'className' for flex-grow-1 as well. */}
                    <blockquote className="blockquote mb-0 flex-grow-1">
                      <p>{testimonial.quote[language]}</p>
                    </blockquote>
                    <footer className="mt-3">
                      <strong className="d-block">{testimonial.name}</strong>
                      <small className="text-muted">{testimonial.company[language]}</small>
                    </footer>
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

export default Testimonials;