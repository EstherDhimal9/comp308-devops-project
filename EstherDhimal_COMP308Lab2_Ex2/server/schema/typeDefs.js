const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Player {
    id: ID!
    user: User!
    ranking: Int
    tournaments: [Tournament]
  }

  type Tournament {
    id: ID!
    name: String!
    game: String!
    date: String!
    players: [Player]
    status: String!
  }

  type AuthPayload {
    user: User
    message: String
  }

  type Query {
    users: [User]
    players: [Player]
    tournaments: [Tournament]
    upcomingTournaments: [Tournament]
    myTournamentHistory: [Tournament]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: String

    createUser(username: String!, email: String!, password: String!, role: String!): User
    createTournament(name: String!, game: String!, date: String!, status: String!): Tournament
    joinTournament(tournamentId: ID!): Tournament
    assignPlayerToTournament(playerId: ID!, tournamentId: ID!): Tournament
  }
`;

module.exports = typeDefs;