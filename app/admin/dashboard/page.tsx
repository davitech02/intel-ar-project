"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { motion, Variants } from 'framer-motion'; // <--- Added 'Variants' here
import { Users, Server, Activity, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; 

interface AdminStats {
  total_users: number;
  total_projects: number;
  active_nodes: number;
  open_tickets: number;
}

export default function AdminDashboardPage() {
  const { user } = useAuth(); 
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      try {
        const res = await fetch('https://intel-ar-backend.onrender.com/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data); 
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // --- THE FIX IS HERE ---
  // We explicitly tell TypeScript that these objects are 'Variants'
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
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
        
        {/* 1. Welcome Message Section */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="fw-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Welcome to Admin Page
          </h1>
          <p className="text-muted">
            Hello, <span className="fw-bold text-dark">{user?.name || 'Administrator'}</span>.
          </p>
        </motion.div>

        {/* 2. System Overview Header */}
        <motion.div variants={itemVariants} className="mb-3">
          <h5 className="fw-bold text-secondary border-bottom pb-2">System Overview</h5>
        </motion.div>

        {/* 3. Real Stats Grid */}
        <Row className="g-4 mb-5">
          {/* Users Count */}
          <Col md={6} lg={3}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                    <Users size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Registered Users</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats?.total_users || 0}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Projects Count */}
          <Col md={6} lg={3}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                    <Server size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Total Projects</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats?.total_projects || 0}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Active Nodes */}
          <Col md={6} lg={3}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Active Nodes</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats?.active_nodes || 0}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Open Tickets */}
          <Col md={6} lg={3}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="d-flex align-items-center gap-3 p-4">
                  <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small fw-bold text-uppercase">Open Tickets</h6>
                    <h2 className="fw-bold mb-0 text-dark">{stats?.open_tickets || 0}</h2>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* 4. Management Links */}
        <motion.div variants={itemVariants}>
          <h4 className="mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Management Actions</h4>
        </motion.div>
        
        <Row className="g-3">
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Link href="/admin/projects" style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 text-center py-4" style={{ borderRadius: '12px', cursor: 'pointer' }}>
                  <Card.Body>
                    <Server size={32} className="text-primary mb-3" />
                    <h5 className="text-dark">Manage Projects</h5>
                    <p className="text-muted small">Approve or reject client project requests</p>
                    <Button variant="outline-primary" size="sm" className="mt-2 rounded-pill px-4">
                      Go to Projects <ArrowRight size={14} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          </Col>
          
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Link href="/admin/chat" style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 text-center py-4" style={{ borderRadius: '12px', cursor: 'pointer' }}>
                  <Card.Body>
                    <MessageSquare size={32} className="text-success mb-3" />
                    <h5 className="text-dark">Support Queue</h5>
                    <p className="text-muted small">Respond to client technical issues</p>
                    <Button variant="outline-success" size="sm" className="mt-2 rounded-pill px-4">
                      View Tickets <ArrowRight size={14} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          </Col>
          
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Link href="/admin/settings" style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 text-center py-4" style={{ borderRadius: '12px', cursor: 'pointer' }}>
                  <Card.Body>
                    <Activity size={32} className="text-warning mb-3" />
                    <h5 className="text-dark">System Config</h5>
                    <p className="text-muted small">Adjust Global ICN node parameters</p>
                    <Button variant="outline-warning" size="sm" className="mt-2 rounded-pill px-4">
                      Open Settings <ArrowRight size={14} />
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