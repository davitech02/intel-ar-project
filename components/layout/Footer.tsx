// components/layout/Footer.tsx
'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      slogan: "L'IA au service de la performance et de l'humanité.",
      quickLinks: 'Liens Rapides',
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      contactUs: 'Contactez-nous',
      address: '910 rue de l’Amont, Lévis, QC', // <-- CORRECTED ADDRESS
      rightsReserved: 'Tous droits réservés.',
    },
    en: {
      slogan: 'AI at the service of performance and humanity.',
      quickLinks: 'Quick Links',
      home: 'Home',
      about: 'About',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      contactUs: 'Contact Us',
      address: '910 rue de l’Amont, Lévis, QC', // <-- CORRECTED ADDRESS
      rightsReserved: 'All rights reserved.',
    },
  };

  return (
    <footer className="text-white pt-5 pb-4" style={{ backgroundColor: 'var(--midnight-blue)' }}>
      <Container>
        <Row>
          {/* Column 1: Logo and Slogan */}
          <Col md={4} className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/logo.png" // Make sure this matches your logo file (.svg or .png)
                alt="Intel-Ar Inc. Logo"
                width={35}
                height={35}
              />
              <span className="ms-2 fs-5 fw-bold">Intel-Ar Inc.</span>
            </div>
            <p className="text-white-50">{translations[language].slogan}</p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={2} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">{translations[language].quickLinks}</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="text-white-50 text-decoration-none">{translations[language].home}</Link></li>
              <li className="mb-2"><Link href="/about" className="text-white-50 text-decoration-none">{translations[language].about}</Link></li>
              <li className="mb-2"><Link href="/services" className="text-white-50 text-decoration-none">{translations[language].services}</Link></li>
              <li className="mb-2"><Link href="/blog" className="text-white-50 text-decoration-none">{translations[language].blog}</Link></li>
            </ul>
          </Col>

          {/* Column 3: Contact */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">{translations[language].contactUs}</h5>
            <p className="text-white-50 mb-1">infos@intel-ar.ca</p> {/* <-- CORRECT EMAIL */}
            <p className="text-white-50 mb-1">(581) 909-4291</p> {/* <-- ADDED PHONE NUMBER */}
            <p className="text-white-50">{translations[language].address}</p>
          </Col>

          {/* Column 4: Social Media */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Suivez-nous / Follow Us</h5>
            <div>
              <a href="#" className="text-white me-3 fs-4"><FaLinkedin /></a>
              <a href="#" className="text-white me-3 fs-4"><FaTwitter /></a>
              <a href="#" className="text-white fs-4"><FaFacebook /></a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center text-white-50">
          <p>&copy; {new Date().getFullYear()} Intel-Ar Inc. {translations[language].rightsReserved}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;