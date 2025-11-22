"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; 
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      // Fix: Log the error so the variable 'err' is used
      console.error("Login failed:", err);
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>Intel AR</h2>
                <p className="text-muted">Sign in to manage your ICN nodes</p>
              </div>

              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  {error && <Alert variant="danger" className="py-2 text-center">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="name@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-secondary">Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100 py-2 fw-bold shadow-sm"
                      disabled={loading}
                    >
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : "Sign In"}
                    </Button>
                  </Form>

                  <div className="text-center mt-4 pt-2 border-top">
                    <p className="small text-muted mb-0">
                      Dont have an account?{' '}
                      <Link href="/register" className="text-decoration-none fw-bold">
                        Create Access
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}