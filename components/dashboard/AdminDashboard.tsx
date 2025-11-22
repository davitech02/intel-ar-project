// components/dashboard/AdminDashboard.tsx
'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Container fluid>
      <h1 className="h2 text-danger">Admin Dashboard</h1>
      <p>Welcome, Admin {user?.name}!</p>
      <Row>
        <Col md={6}>
          <Card className="card-custom mb-4 border-danger">
            <Card.Body>
              <Card.Title>Pending Job Applications</Card.Title>
              <Card.Text>There are 5 new applications to review.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="card-custom mb-4 border-danger">
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              <Card.Text>You have 25 active users.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;