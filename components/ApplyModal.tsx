"use client";

import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';

interface ApplyModalProps {
  show: boolean;
  handleClose: () => void;
  roleTitle: string;
}

export default function ApplyModal({ show, handleClose, roleTitle }: ApplyModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'danger'|'', msg: string}>({type: '', msg: ''});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setStatus({ type: 'danger', msg: 'Please upload your CV/Resume.' });
      return;
    }

    setLoading(true);
    setStatus({type: '', msg: ''});

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', roleTitle);
    formData.append('message', message);
    formData.append('resume', resume);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/careers/apply', {
        method: 'POST',
        body: formData, // No Content-Type header needed (browser sets it for FormData)
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Application sent to recrutement@intel-ar.ca!' });
        setTimeout(() => {
             handleClose();
             setStatus({type:'', msg:''});
        }, 2000);
      } else {
        setStatus({ type: 'danger', msg: 'Failed to submit application.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'danger', msg: 'Server error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for {roleTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control required onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Resume / CV (PDF)</Form.Label>
            <Form.Control 
                type="file" 
                required 
                accept=".pdf,.doc,.docx"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setResume(e.target.files[0]);
                  }
                }} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cover Letter (Optional)</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Submit Application"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}