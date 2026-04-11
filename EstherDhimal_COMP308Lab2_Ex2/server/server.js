require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { getUserFromToken } = require('./middleware/auth');

const startServer = async () => {
  const app = express();

  connectDB();

  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));

  app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const user = getUserFromToken(req);
        return { req, res, user };
      }
    })
  );

  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/graphql`);
  });
};

startServer();