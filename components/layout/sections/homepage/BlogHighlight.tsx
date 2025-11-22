// components/layout/sections/homepage/BlogHighlight.tsx
'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPostsData } from '@/lib/data';
import { motion } from 'framer-motion';

const BlogHighlight = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Derniers Articles du Blog',
      subtitle: 'Explorez nos perspectives sur l\'IA et la transformation numérique.',
      readMore: 'Lire la suite',
    },
    en: {
      title: 'Latest Blog Posts',
      subtitle: 'Explore our insights on AI and digital transformation.',
      readMore: 'Read More',
    },
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--light-gray)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{translations[language].title}</h2>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </div>
        <Row>
          {blogPostsData.map((post, index) => (
            <Col md={6} lg={4} key={post.slug} className="mb-4 d-flex align-items-stretch">
              <motion.div
                className="w-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="h-100 card-custom">
                  <Image
                    src={post.image}
                    alt={post.title[language]}
                    width={800}
                    height={450}
                    style={{
                      borderTopLeftRadius: '1rem',
                      borderTopRightRadius: '1rem',
                      width: '100%',
                      height: '200px', // Fixed height for uniformity
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title as="h4" className="fw-bold flex-grow-1">
                      {post.title[language]}
                    </Card.Title>
                    <Card.Text>{post.excerpt[language]}</Card.Text>
                    <Link href={`/blog/${post.slug}`} passHref>
                      <Button variant="link" className="p-0 fw-bold text-info">
                        {translations[language].readMore} &rarr;
                      </Button>
                    </Link>
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

export default BlogHighlight;