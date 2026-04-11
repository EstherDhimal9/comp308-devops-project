import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String) {
    register(username: $username, email: $email, password: $password, role: $role) {
      message
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $role: String!) {
    createUser(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!, $game: String!, $date: String!, $status: String!) {
    createTournament(name: $name, game: $game, date: $date, status: $status) {
      id
      name
      game
      date
      status
    }
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($tournamentId: ID!) {
    joinTournament(tournamentId: $tournamentId) {
      id
      name
    }
  }
`;