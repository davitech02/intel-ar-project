"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import ApplyModal from '@/components/ApplyModal';

const jobs = [
  { id: 1, title: "AR Network Engineer", type: "Full-time", location: "Montreal, QC", dept: "Engineering" },
  { id: 2, title: "Frontend Developer (React)", type: "Full-time", location: "Remote", dept: "Product" },
  { id: 3, title: "ICN Protocol Researcher", type: "Contract", location: "Lévis, QC", dept: "R&D" },
];

export default function CareersPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleApplyClick = (role: string) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  return (
    <div className="bg-light min-vh-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 text-center">
        <Container>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="fw-bold display-5" 
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Join the Revolution
          </motion.h1>
          <p className="lead opacity-75">Build the future of Augmented Reality on ICN infrastructure.</p>
        </Container>
      </div>

      {/* Job List */}
      <Container className="py-5">
        <Row className="g-4 justify-content-center">
          {jobs.map((job) => (
            <Col md={10} lg={8} key={job.id}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                  <Card.Body className="p-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Badge bg="primary" className="fw-normal">{job.dept}</Badge>
                        <Badge bg="light" text="dark" className="fw-normal border">{job.type}</Badge>
                      </div>
                      <h4 className="fw-bold mb-1">{job.title}</h4>
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="d-flex align-items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill px-4 fw-semibold"
                      onClick={() => handleApplyClick(job.title)}
                    >
                      Apply Now <ArrowRight size={16} className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* The Application Modal */}
      <ApplyModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        roleTitle={selectedRole} 
      />
    </div>
  );
}