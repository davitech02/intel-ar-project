"use client";

import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MessageCircle, User, AlertCircle, Check } from 'lucide-react';

const supportTickets = [
  { id: 1, client: "Alice Corp", topic: "Packet Loss on Node 4", message: "We are seeing dropped packets...", time: "10 min ago", priority: "High" },
  { id: 2, client: "Tech University", topic: "Requesting Node Increase", message: "Need 5 more nodes for campus event.", time: "2 hours ago", priority: "Medium" },
  { id: 3, client: "Museum Arts", topic: "Login Issues", message: "Cannot access dashboard...", time: "1 day ago", priority: "Low" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export default function AdminChatPage() {
  return (
    <Container fluid className="p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Support Queue</h2>
          <p className="text-muted">Manage incoming client requests</p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Row>
            <Col lg={12}>
                {supportTickets.map((ticket) => (
                    <motion.div key={ticket.id} variants={itemVariants} className="mb-3">
                        <Card className="border-0 shadow-sm hover-shadow" style={{ borderRadius: '12px' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex gap-3">
                                        <div className={`rounded-circle p-3 d-flex align-items-center justify-content-center ${
                                            ticket.priority === 'High' ? 'bg-danger-subtle text-danger' : 'bg-primary-subtle text-primary'
                                        }`} style={{ width: '50px', height: '50px' }}>
                                            {ticket.priority === 'High' ? <AlertCircle size={24} /> : <MessageCircle size={24} />}
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>{ticket.topic}</h6>
                                            <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                                                <User size={14} /> {ticket.client} • {ticket.time}
                                            </div>
                                            <p className="text-secondary mb-0">{ticket.message}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-col gap-2">
                                        <Button variant="primary" size="sm" className="px-3">Reply</Button>
                                        <Button variant="outline-success" size="sm" title="Mark Resolved"><Check size={16} /></Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                ))}
            </Col>
        </Row>
      </motion.div>
    </Container>
  );
}