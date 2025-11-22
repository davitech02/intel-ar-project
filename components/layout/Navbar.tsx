// components/layout/Navbar.tsx
'use client';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext'; // Import the authentication hook

const AppNavbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth(); // Get user state and logout function from the context

  const translations = {
    fr: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      blog: 'Blog',
      careers: 'Carrières',
      contact: 'Contact',
      dashboard: 'Espace Client',
      login: 'Connexion', // Added login translation
      logout: 'Déconnexion', // Added logout translation
      langToggle: 'EN',
    },
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      blog: 'Blog',
      careers: 'Careers',
      contact: 'Contact',
      dashboard: 'Client Dashboard',
      login: 'Login', // Added login translation
      logout: 'Logout', // Added logout translation
      langToggle: 'FR',
    },
  };

  const navLinks = [
    { href: '/', label: translations[language].home },
    { href: '/about', label: translations[language].about },
    { href: '/services', label: translations[language].services },
    { href: '/blog', label: translations[language].blog },
    { href: '/careers', label: translations[language].careers },
    { href: '/contact', label: translations[language].contact },
  ];

  return (
    <Navbar expand="lg" variant="dark" sticky="top" style={{ backgroundColor: 'var(--midnight-blue)' }}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
            <Image
              src="/logo.png" // Using .svg as preferred, change to .png if needed
              alt="Intel-Ar Inc. Logo"
              width={35}
              height={35}
              priority
            />
            <span className="ms-2 fw-bold" style={{ color: 'var(--cyan)' }}>
              Intel-Ar Inc.
            </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((link) => (
              <Nav.Link as={Link} key={link.href} href={link.href}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="d-flex align-items-center">
            {user ? (
              <>
                <Nav.Link as={Link} href="/dashboard" className="fw-bold text-white">
                  {translations[language].dashboard}
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={logout} className="ms-2">
                  {translations[language].logout}
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} href="/login">
                <Button variant="outline-secondary" size="sm" className="text-white">
                  {translations[language].login}
                </Button>
              </Nav.Link>
            )}
            <Button variant="outline-info" size="sm" onClick={toggleLanguage} className="ms-3">
              {translations[language].langToggle}
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;