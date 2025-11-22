// app/dashboard/chat/page.tsx
"use client";

import React from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, ArrowRight } from 'lucide-react';

const chatHistory = [
  { id: 1, topic: "ICN Node Latency Issue", lastMessage: "Packet loss at edge router...", date: "Nov 18", status: "Resolved", variant: "success" },
  { id: 2, topic: "AR Asset Rendering", lastMessage: "Check GLB file size limits...", date: "Nov 17", status: "Open", variant: "warning" },
  { id: 3, topic: "Project Deployment", lastMessage: "Deployment successful...", date: "Nov 15", status: "Closed", variant: "secondary" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function ChatHistoryPage() {
  return (
    <Container fluid className="p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Chat History</h2>
          <p className="text-muted">Technical support and consultation</p>
        </div>
        <Button variant="primary" className="shadow-sm">Start New Chat</Button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Card className="border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          {/* Removed 'index' from the map arguments below */}
          {chatHistory.map((chat) => (
            <motion.div key={chat.id} variants={itemVariants}>
              <div 
                className="p-4 border-bottom d-flex align-items-center justify-content-between cursor-pointer bg-white"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle p-3 rounded-circle text-primary">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>{chat.topic}</h6>
                    <p className="text-muted small mb-1">{chat.lastMessage}</p>
                    <div className="d-flex align-items-center gap-2">
                      <Badge bg={chat.variant} pill className="fw-normal">{chat.status}</Badge>
                      <small className="text-muted d-flex align-items-center gap-1">
                        <Clock size={12} /> {chat.date}
                      </small>
                    </div>
                  </div>
                </div>
                <ArrowRight className="text-muted" size={20} />
              </div>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </Container>
  );
}