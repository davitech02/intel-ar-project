// app/blog/[slug]/BlogClientPage.tsx
'use client'; // This component MUST be a client component

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/data'; // Import the type for our prop

// This component is the "display" part. It receives the final post data as a prop.
const BlogClientPage = ({ post }: { post: BlogPost }) => {
  const { language } = useLanguage();

  const translations = {
    fr: { backToBlog: 'Retour au Blog' },
    en: { backToBlog: 'Back to Blog' },
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <article>
            <h1 className="display-4 fw-bold mb-3">{post.title[language]}</h1>
            <div className="mb-4">
              <Image
                src={post.image}
                alt={post.title[language]}
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
                priority
              />
            </div>
            <div className="fs-5 mb-5" style={{ whiteSpace: 'pre-wrap' }}>
              {post.content[language]}
            </div>
            <Link href="/blog" className="fw-bold text-info text-decoration-none">
              &larr; {translations[language].backToBlog}
            </Link>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogClientPage;