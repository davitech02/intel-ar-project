"use client";

import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { User, Bell, Save } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function SettingsPage() {
  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      variants={pageVariants}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Container fluid className="p-4">
        <div className="mb-4">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Settings</h2>
          <p className="text-muted">Manage account preferences</p>
        </div>

        <Row>
          <Col lg={8}>
            {/* Profile Section */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
                <div className="d-flex align-items-center gap-2 text-dark">
                  <User size={20} />
                  <h5 className="mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>Profile Information</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" defaultValue="Alex Johnson" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" defaultValue="alex@example.com" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Notifications Section */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
                <div className="d-flex align-items-center gap-2 text-dark">
                  <Bell size={20} />
                  <h5 className="mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>Notifications</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="email-alerts"
                    label="Email alerts for project updates"
                    defaultChecked 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check 
                    type="switch"
                    id="push-alerts"
                    label="Push notifications for system alerts"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
              <Button variant="primary" className="d-flex align-items-center gap-2 shadow-sm px-4">
                <Save size={18} /> Save Changes
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}