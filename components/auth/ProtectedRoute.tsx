// components/auth/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Container, Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the auth state is done loading and there is still no user, redirect to login
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // While the auth state is loading, show a spinner to prevent flicker
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  // If a user is logged in, show the page content
  if (user) {
    return <>{children}</>;
  }

  // If no user is logged in after loading, return null (the redirect will happen)
  return null;
};

export default ProtectedRoute;