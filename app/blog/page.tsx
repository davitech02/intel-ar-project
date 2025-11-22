// app/blog/page.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap'; // <-- FIX IS HERE
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPostsData } from '@/lib/data';

const BlogPage = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Notre Blog',
      subtitle: 'Explorez nos articles sur l\'IA, la technologie et la transformation des entreprises.',
      readMore: 'Lire la suite',
    },
    en: {
      title: 'Our Blog',
      subtitle: 'Explore our articles on AI, technology, and business transformation.',
      readMore: 'Read More',
    },
  };

  return (
    <>
      <div className="py-5 text-center" style={{ backgroundColor: 'var(--light-gray)' }}>
        <Container>
          <h1 className="display-4 fw-bold">{translations[language].title}</h1>
          <p className="lead text-muted">{translations[language].subtitle}</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {blogPostsData.map((post) => (
            <Col md={6} lg={4} key={post.slug} className="mb-4 d-flex align-items-stretch">
              <Card className="card-custom">
                <Image
                  src={post.image}
                  alt={post.title[language]}
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
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h4" className="fw-bold flex-grow-1">
                    {post.title[language]}
                  </Card.Title>
                  <Card.Text>{post.excerpt[language]}</Card.Text>
                  
                  <Link href={`/blog/${post.slug}`} className="p-0 fw-bold text-info align-self-start text-decoration-none mt-auto">
                    {translations[language].readMore} &rarr;
                  </Link>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;