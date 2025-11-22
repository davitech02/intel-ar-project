"use client";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, InputGroup, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Search, Plus, MoreVertical, MapPin, Layers } from 'lucide-react'; // Removed 'Filter'

// 1. Define the shape of a Project
interface ProjectData {
  id: number;
  name: string;
  status: string;
  location: string;
  progress: number;
  nodes: number;
  client?: string;
  load?: string;
}

// Helper to get token
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // 2. Use the Interface here instead of <any[]>
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Projects from Flask
  useEffect(() => {
    const fetchProjects = async () => {
      const token = getToken();
      // If no token, stop loading (or redirect)
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://127.0.0.1:5000/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600' }}>My Projects</h2>
            <p className="text-muted">Manage your AR instances and ICN nodes</p>
          </div>
          <Button variant="primary" className="d-flex align-items-center gap-2 shadow-sm">
            <Plus size={18} /> <span>New Project</span>
          </Button>
        </div>

        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
          <Card.Body>
            <Row>
              <Col md={10}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <Search size={18} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search projects..."
                    className="border-start-0 shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {filteredProjects.length === 0 ? (
           <div className="text-center text-muted mt-5">No projects found.</div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="border-0 shadow-sm mb-3 hover-shadow" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={6}>
                    <div className="d-flex align-items-center gap-3">
                      <div className={`p-3 rounded-circle ${
                        project.status === 'Active' ? 'bg-success-subtle text-success' :
                        project.status === 'Pending' ? 'bg-warning-subtle text-warning' :
                        'bg-secondary-subtle text-secondary'
                      }`}>
                        <Layers size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '500' }}>
                          {project.name}
                        </h5>
                        <div className="text-muted small d-flex align-items-center gap-2">
                          <MapPin size={14} /> {project.location} • {project.nodes} ICN Nodes
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={4} className="mt-3 mt-md-0">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <ProgressBar 
                      now={project.progress} 
                      variant={project.progress === 100 ? "success" : "primary"} 
                      style={{ height: '8px', borderRadius: '4px' }} 
                    />
                  </Col>

                  <Col md={2} className="text-end mt-3 mt-md-0">
                     <Button variant="link" className="text-muted p-0">
                       <MoreVertical size={20} />
                     </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </motion.div>
  );
}