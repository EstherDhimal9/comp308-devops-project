import { gql } from '@apollo/client';

export const GET_UPCOMING_TOURNAMENTS = gql`
  query {
    upcomingTournaments {
      id
      name
      game
      date
      status
    }
  }
`;

export const GET_ALL_TOURNAMENTS = gql`
  query {
    tournaments {
      id
      name
      game
      date
      status
    }
  }
`;

export const GET_ALL_PLAYERS = gql`
  query {
    players {
      id
      ranking
      user {
        username
        email
      }
    }
  }
`;

export const GET_MY_HISTORY = gql`
  query {
    myTournamentHistory {
      id
      name
      game
      date
      status
    }
  }
`;