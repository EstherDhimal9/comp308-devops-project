import { useQuery, useMutation } from '@apollo/client/react';
import { GET_UPCOMING_TOURNAMENTS, GET_MY_HISTORY } from '../graphql/queries';
import { JOIN_TOURNAMENT } from '../graphql/mutations';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

function PlayerDashboard() {
  const { data, refetch } = useQuery(GET_UPCOMING_TOURNAMENTS);
  const { data: historyData } = useQuery(GET_MY_HISTORY);
  const [joinTournament] = useMutation(JOIN_TOURNAMENT);

  const handleJoin = async (id) => {
    try {
      await joinTournament({ variables: { tournamentId: id } });
      alert('Joined tournament');
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Upcoming Tournaments</h2>
      <Row>
        {data?.upcomingTournaments?.map((t) => (
          <Col md={4} key={t.id} className="mb-3">
            <Card className="p-3 shadow">
              <h4>{t.name}</h4>
              <p>Game: {t.game}</p>
              <p>Date: {new Date(t.date).toLocaleDateString()}</p>
              <p>Status: {t.status}</p>
              <Button onClick={() => handleJoin(t.id)}>Join</Button>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5">My Tournament History</h2>
      <Row>
        {historyData?.myTournamentHistory?.map((t) => (
          <Col md={4} key={t.id} className="mb-3">
            <Card className="p-3 shadow">
              <h4>{t.name}</h4>
              <p>Game: {t.game}</p>
              <p>Date: {new Date(t.date).toLocaleDateString()}</p>
              <p>Status: {t.status}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlayerDashboard;