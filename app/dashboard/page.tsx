"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { motion, Variants } from 'framer-motion';
import { Layers, MapPin, MessageSquare, Plus, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// 1. Define the shape of a Project
interface Project {
  id: number;
  name: string;
  nodes?: number; // The '?' means it might be null/undefined
}

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    projectCount: 0,
    activeNodes: 0,
    ticketCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      // Check for token safely
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      try {
        // 1. Fetch Projects
        const projRes = await fetch('https://intel-ar-backend.onrender.com/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const projects = await projRes.json();

        // 2. Fetch Tickets
        const ticketRes = await fetch('https://intel-ar-backend.onrender.com/api/tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const tickets = await ticketRes.json();

        // 3. Calculate Stats
        // FIX IS HERE: We replaced 'curr: any' with 'curr: Project'
        const totalNodes = Array.isArray(projects) 
          ? projects.reduce((acc: number, curr: Project) => acc + (curr.nodes || 0), 0) 
          : 0;

        setStats({
          projectCount: Array.isArray(projects) ? projects.length : 0,
          activeNodes: totalNodes,
          ticketCount: Array.isArray(tickets) ? tickets.length : 0
        });

      } catch (error) {
        console.error("Failed to load client data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Container fluid className="p-4">
        
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="fw-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Client Dashboard
          </h1>
          <p className="text-muted fs-5">
            Welcome back, <span className="fw-bold text-dark">{user?.name || 'User'}</span>. Here is an overview of your AR deployments.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                    <Layers size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">My Projects</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats.projectCount}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Active Nodes</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats.activeNodes}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Active Inquiries</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats.ticketCount}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h4 className="mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Quick Actions</h4>
        </motion.div>
        
        <Row className="g-3">
          <Col md={6}>
            <motion.div variants={itemVariants}>
              <Link href="/dashboard/projects" style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 text-center py-4" style={{ borderRadius: '12px', cursor: 'pointer' }}>
                  <Card.Body>
                    <div className="mb-3 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                        <Plus size={30} />
                    </div>
                    <h5 className="text-dark">Create New Project</h5>
                    <p className="text-muted small">Deploy a new AR instance to the ICN network</p>
                    <Button variant="outline-primary" className="mt-2 rounded-pill px-4">
                      Start Deployment <ArrowRight size={14} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          </Col>
          
          <Col md={6}>
            <motion.div variants={itemVariants}>
              <Link href="/dashboard/chat" style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 text-center py-4" style={{ borderRadius: '12px', cursor: 'pointer' }}>
                  <Card.Body>
                    <div className="mb-3 mx-auto bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                        <MessageSquare size={30} />
                    </div>
                    <h5 className="text-dark">Technical Support</h5>
                    <p className="text-muted small">Chat with our engineering team</p>
                    <Button variant="outline-success" className="mt-2 rounded-pill px-4">
                      Open Chat <ArrowRight size={14} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}