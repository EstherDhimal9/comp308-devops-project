import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: formData });
      const role = data.login.user.role;

      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/player');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
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

          <Button type="submit">Login</Button>
        </Form>

        <p className="mt-3">
          No account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Login;