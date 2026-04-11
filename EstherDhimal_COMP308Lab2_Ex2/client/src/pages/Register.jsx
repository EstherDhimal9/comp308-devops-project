import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { REGISTER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Player'
  });

  const [register] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({ variables: formData });
      alert('Registered successfully');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Player">Player</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit">Register</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;