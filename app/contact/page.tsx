"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{type: 'success'|'danger'|'', msg: string}>({type: '', msg: ''});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({type: '', msg: ''});

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      await res.json();

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Thank you! Your message has been sent to infos@intel-ar.ca.' });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setStatus({ type: 'danger', msg: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error(error); // Log error to console
      setStatus({ type: 'danger', msg: 'Server error. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5">
          <h1 className="fw-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>Get in Touch</h1>
          <p className="text-muted">Have questions about our ICN solutions? We are here to help.</p>
        </motion.div>

        <Row className="g-5">
          {/* Contact Info Side */}
          <Col lg={5}>
            <div className="bg-primary text-white p-4 p-lg-5 rounded-4 shadow-sm h-100">
              <h3 className="fw-bold mb-4">Contact Information</h3>
              <div className="d-flex align-items-start gap-3 mb-4">
                <Mail className="mt-1" />
                <div>
                  <h6 className="fw-bold mb-0">Email Us</h6>
                  <p className="mb-0 opacity-75">infos@intel-ar.ca</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 mb-4">
                <Phone className="mt-1" />
                <div>
                  <h6 className="fw-bold mb-0">Call Us</h6>
                  <p className="mb-0 opacity-75">(581) 909-4291</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <MapPin className="mt-1" />
                <div>
                  <h6 className="fw-bold mb-0">Visit Us</h6>
                  <p className="mb-0 opacity-75">910 rue de l Amont, Lévis, QC</p>
                </div>
              </div>
            </div>
          </Col>

          {/* Form Side */}
          <Col lg={7}>
            <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm">
              {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Subject</Form.Label>
                      <Form.Control 
                        required 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                      {loading ? <Spinner size="sm" /> : <><Send size={18} className="me-2"/> Send Message</>}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}