// components/layout/sections/homepage/Team.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { teamData } from '@/lib/data';
import { motion } from 'framer-motion';

const Team = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Rencontrez Notre Équipe d\'Experts',
      subtitle: 'Des leaders passionnés qui stimulent l\'innovation.',
    },
    en: {
      title: 'Meet Our Expert Team',
      subtitle: 'Passionate leaders driving innovation.',
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
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
          {teamData.map((member, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                {/* We use our custom card with a subtle shadow */}
                <Card className="card-custom text-center overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={800}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                  {/* The blue overlay for name and role */}
                  <Card.Footer className="text-white" style={{ backgroundColor: 'var(--midnight-blue)' }}>
                    <h5 className="mb-1">{member.name}</h5>
                    <p className="mb-0 text-info">{member.role[language]}</p>
                  </Card.Footer>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Team;