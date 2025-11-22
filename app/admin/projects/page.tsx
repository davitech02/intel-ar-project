"use client";

import React, { useState } from 'react';
import { Container, Card, Table, Badge, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, XCircle, MoreVertical, Server } from 'lucide-react';

// Admin specific mock data - includes Client Name
const allProjects = [
  { id: 1, name: "Downtown AR Nav", client: "Alice Corp", status: "Active", nodes: 12, load: "Low" },
  { id: 2, name: "Museum Guide", client: "Museum of Arts", status: "Pending", nodes: 5, load: "-" },
  { id: 3, name: "City Traffic Vis", client: "Gov Transport", status: "Active", nodes: 45, load: "High" },
  { id: 4, name: "Campus Wayfinding", client: "Tech University", status: "Suspended", nodes: 20, load: "Medium" },
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      variants={pageVariants} 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>Project Oversight</h2>
            <p className="text-muted">Monitor and approve client ICN instances</p>
          </div>
          <Button variant="success" className="d-flex align-items-center gap-2 shadow-sm">
            <Server size={18} /> <span>Provision Node</span>
          </Button>
        </div>

        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
          <Card.Body>
            <Row>
              <Col md={9}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <Search size={18} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search projects or clients..."
                    className="border-start-0 shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                 <Button variant="outline-secondary" className="w-100 d-flex align-items-center justify-content-center gap-2">
                  <Filter size={18} /> Filter Status
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 ps-4">Project Name</th>
                <th className="border-0 py-3">Client</th>
                <th className="border-0 py-3">Nodes</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Load</th>
                <th className="border-0 py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => (
                <tr key={project.id}>
                  <td className="ps-4 fw-bold text-dark">{project.name}</td>
                  <td className="text-secondary">{project.client}</td>
                  <td>
                    <Badge bg="light" text="dark" className="border">
                      {project.nodes} Nodes
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={
                      project.status === 'Active' ? 'success' : 
                      project.status === 'Pending' ? 'warning' : 'danger'
                    } pill>
                      {project.status}
                    </Badge>
                  </td>
                  <td>
                    <span className={`small fw-bold ${
                      project.load === 'High' ? 'text-danger' : 'text-success'
                    }`}>
                      {project.load}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {project.status === 'Pending' ? (
                      <div className="d-flex gap-2 justify-content-end">
                         <Button variant="outline-success" size="sm" title="Approve">
                           <CheckCircle size={16} />
                         </Button>
                         <Button variant="outline-danger" size="sm" title="Reject">
                           <XCircle size={16} />
                         </Button>
                      </div>
                    ) : (
                      <Button variant="link" className="text-muted p-0">
                        <MoreVertical size={18} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </motion.div>
  );
}