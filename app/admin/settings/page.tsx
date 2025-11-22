"use client";

import React from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Shield, Database, Activity, Save } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function AdminSettingsPage() {
  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      variants={pageVariants} 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Container fluid className="p-4">
        <div className="mb-4">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>System Configuration</h2>
          <p className="text-muted">Global ICN parameters and user access control</p>
        </div>

        <Row>
          <Col lg={8}>
            {/* Global ICN Configuration */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
                <div className="d-flex align-items-center gap-2 text-dark">
                  <Database size={20} className="text-primary" />
                  <h5 className="mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>Global ICN Node Defaults</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Alert variant="info" className="small mb-3">
                  Changes here will affect newly provisioned nodes only.
                </Alert>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Default Content Store Size (MB)</Form.Label>
                      <Form.Control type="number" defaultValue="1024" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Forwarding Strategy</Form.Label>
                      <Form.Select defaultValue="best-route">
                        <option value="best-route">Best Route (/localhost/nfd/strategy/best-route)</option>
                        <option value="multicast">Multicast</option>
                        <option value="ncc">NCC</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Security & Access */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
                <div className="d-flex align-items-center gap-2 text-dark">
                  <Shield size={20} className="text-danger" />
                  <h5 className="mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>Security & Access</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="switch"
                        id="mfa-force"
                        label="Enforce MFA for all Client Admin Accounts"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="switch"
                        id="new-reg"
                        label="Allow New User Registrations"
                        defaultChecked
                    />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Maintenance */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
               <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
                <div className="d-flex align-items-center gap-2 text-dark">
                  <Activity size={20} className="text-warning" />
                  <h5 className="mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>Maintenance</h5>
                </div>
              </Card.Header>
              <Card.Body>
                 <div className="d-flex gap-3">
                    <Button variant="outline-secondary" size="sm">Clear System Cache</Button>
                    <Button variant="outline-secondary" size="sm">Download Server Logs</Button>
                 </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
              <Button variant="primary" className="d-flex align-items-center gap-2 shadow-sm px-4">
                <Save size={18} /> Save System Changes
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}