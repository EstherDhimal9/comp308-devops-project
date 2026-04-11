import { ApolloProvider } from '@apollo/client/react';
import client from './apollo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayerDashboard from './pages/PlayerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AppNavbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/player" element={<PlayerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

// fix tournamnet bug
