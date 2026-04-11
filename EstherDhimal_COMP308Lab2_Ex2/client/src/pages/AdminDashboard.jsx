import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_USER, CREATE_TOURNAMENT } from '../graphql/mutations';
import { GET_ALL_PLAYERS, GET_ALL_TOURNAMENTS } from '../graphql/queries';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

function AdminDashboard() {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Player'
  });

  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    game: '',
    date: '',
    status: 'Upcoming'
  });

  const [createUser] = useMutation(CREATE_USER);
  const [createTournament] = useMutation(CREATE_TOURNAMENT);
  const { data: playersData, refetch: refetchPlayers } = useQuery(GET_ALL_PLAYERS);
  const { data: tournamentsData, refetch: refetchTournaments } = useQuery(GET_ALL_TOURNAMENTS);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser({ variables: userForm });
      alert('User created');
      refetchPlayers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    try {
      await createTournament({ variables: tournamentForm });
      alert('Tournament created');
      refetchTournaments();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="p-3 shadow mb-4">
            <h3>Create User</h3>
            <Form onSubmit={handleCreateUser}>
              <Form.Control
                className="mb-2"
                placeholder="Username"
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                placeholder="Email"
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              />
              <Form.Select
                className="mb-2"
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="Player">Player</option>
                <option value="Admin">Admin</option>
              </Form.Select>
              <Button type="submit">Create User</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow mb-4">
            <h3>Create Tournament</h3>
            <Form onSubmit={handleCreateTournament}>
              <Form.Control
                className="mb-2"
                placeholder="Tournament Name"
                onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                placeholder="Game"
                onChange={(e) => setTournamentForm({ ...tournamentForm, game: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                type="date"
                onChange={(e) => setTournamentForm({ ...tournamentForm, date: e.target.value })}
              />
              <Form.Select
                className="mb-2"
                onChange={(e) => setTournamentForm({ ...tournamentForm, status: e.target.value })}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </Form.Select>
              <Button type="submit">Create Tournament</Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <h3>All Players</h3>
      <Row>
        {playersData?.players?.map((p) => (
          <Col md={4} key={p.id} className="mb-3">
            <Card className="p-3 shadow">
              <p><strong>{p.user.username}</strong></p>
              <p>{p.user.email}</p>
              <p>Ranking: {p.ranking}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mt-4">All Tournaments</h3>
      <Row>
        {tournamentsData?.tournaments?.map((t) => (
          <Col md={4} key={t.id} className="mb-3">
            <Card className="p-3 shadow">
              <p><strong>{t.name}</strong></p>
              <p>{t.game}</p>
              <p>{new Date(t.date).toLocaleDateString()}</p>
              <p>{t.status}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;