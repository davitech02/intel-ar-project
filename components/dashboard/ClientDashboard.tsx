// components/dashboard/ClientDashboard.tsx
'use client';

import { Card, Col, Container, Row, ProgressBar, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { clientProjectsData } from '@/lib/data'; // Using our mock data

const ClientDashboard = () => {
  const { user } = useAuth();

  return (
    <Container fluid>
      <h1 className="h2 mb-4">Client Dashboard</h1>
      <p className="lead">Welcome back, {user?.name}!</p>
      
      <h3 className="h4 mt-5 mb-3">Projects Overview</h3>
      <Row>
        {clientProjectsData.map(project => (
          <Col md={6} key={project.id} className="mb-4">
            <Card className="h-100 card-custom">
              <Card.Body>
                <Card.Title className="fw-bold">{project.name}</Card.Title>
                <Card.Text>
                  Status: <span className="fw-bold">{project.status}</span>
                </Card.Text>
                <ProgressBar 
                  now={project.progress} 
                  label={`${project.progress}%`} 
                  variant="info" 
                  animated 
                />
              </Card.Body>
              <Card.Footer>
                {/* This link will work once we create the project detail page */}
                <Link href={`/dashboard/projects/${project.id}`} passHref>
                  <Button variant="link" className="p-0">View Details</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="h4 mt-5 mb-3">Quick Actions</h3>
      <Row>
        <Col md={6}>
          <Card className="card-custom">
            <Card.Body className="text-center">
              <Card.Title>View Chat History</Card.Title>
              <Card.Text>Review your past conversations with our AI Advisor.</Card.Text>
              <Link href="/dashboard/chat-history" passHref>
                <Button className="btn-cyan">Go to History</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default ClientDashboard;