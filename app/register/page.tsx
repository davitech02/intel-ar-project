"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Note: We explicitly map the fields to match what app.py expects
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName, // Backend expects 'fullName'
          email: formData.email,       // Backend expects 'email'
          password: formData.password, // Backend expects 'password'
          role: 'client'               // Default role
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please log in.");
        router.push('/login');
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Intel AR</h2>
                <p className="text-muted">Create your client account</p>
              </div>

              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        required 
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        required 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        required 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        required 
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                      {loading ? <Spinner size="sm" /> : "Register Account"}
                    </Button>
                  </Form>
                  
                  <div className="text-center mt-3">
                    <Link href="/login" className="text-decoration-none">Already have an account? Login</Link>
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