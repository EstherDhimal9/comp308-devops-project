const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Player = require('../models/Player');
const Tournament = require('../models/Tournament');

const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user || user.role !== 'Admin') {
        throw new Error('Not authorized');
      }
      return await User.find();
    },

    players: async (_, __, { user }) => {
      if (!user || user.role !== 'Admin') {
        throw new Error('Not authorized');
      }
      return await Player.find().populate('user').populate('tournaments');
    },

    tournaments: async () => {
      return await Tournament.find().populate({
        path: 'players',
        populate: { path: 'user' }
      });
    },

    upcomingTournaments: async () => {
      return await Tournament.find({ status: 'Upcoming' }).populate({
        path: 'players',
        populate: { path: 'user' }
      });
    },

    myTournamentHistory: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      const player = await Player.findOne({ user: user.id }).populate('tournaments');

      if (!player) {
        return [];
      }

      return player.tournaments;
    }
  },

  Mutation: {
    register: async (_, { username, email, password, role }, { res }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'Player'
      });

      if (newUser.role === 'Player') {
        await Player.create({
          user: newUser._id,
          ranking: 0,
          tournaments: []
        });
      }

      const token = jwt.sign(
        { id: newUser._id, role: newUser.role, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });

      return {
        user: newUser,
        message: 'Registered successfully'
      };
    },

    login: async (_, { email, password }, { res }) => {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: foundUser._id, role: foundUser.role, email: foundUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });

      return {
        user: foundUser,
        message: 'Login successful'
      };
    },

    logout: async (_, __, { res }) => {
      res.clearCookie('token');
      return 'Logged out successfully';
    },

    createUser: async (_, { username, email, password, role }, { user }) => {
      if (!user || user.role !== 'Admin') {
        throw new Error('Only admin can create users');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role
      });

      if (role === 'Player') {
        await Player.create({
          user: newUser._id,
          ranking: 0,
          tournaments: []
        });
      }

      return newUser;
    },

    createTournament: async (_, { name, game, date, status }, { user }) => {
      if (!user || user.role !== 'Admin') {
        throw new Error('Only admin can create tournaments');
      }

      return await Tournament.create({
        name,
        game,
        date,
        status
      });
    },

    joinTournament: async (_, { tournamentId }, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      const player = await Player.findOne({ user: user.id });
      if (!player) {
        throw new Error('Player profile not found');
      }

      const tournament = await Tournament.findById(tournamentId);
      if (!tournament) {
        throw new Error('Tournament not found');
      }

      const alreadyJoinedPlayer = player.tournaments.some(
        (id) => id.toString() === tournamentId
      );

      if (!alreadyJoinedPlayer) {
        player.tournaments.push(tournamentId);
        await player.save();
      }

      const alreadyInTournament = tournament.players.some(
        (id) => id.toString() === player._id.toString()
      );

      if (!alreadyInTournament) {
        tournament.players.push(player._id);
        await tournament.save();
      }

      return await Tournament.findById(tournamentId).populate({
        path: 'players',
        populate: { path: 'user' }
      });
    },

    assignPlayerToTournament: async (_, { playerId, tournamentId }, { user }) => {
      if (!user || user.role !== 'Admin') {
        throw new Error('Only admin can assign players');
      }

      const player = await Player.findById(playerId);
      const tournament = await Tournament.findById(tournamentId);

      if (!player || !tournament) {
        throw new Error('Player or tournament not found');
      }

      const playerHasTournament = player.tournaments.some(
        (id) => id.toString() === tournamentId
      );

      if (!playerHasTournament) {
        player.tournaments.push(tournamentId);
        await player.save();
      }

      const tournamentHasPlayer = tournament.players.some(
        (id) => id.toString() === playerId
      );

      if (!tournamentHasPlayer) {
        tournament.players.push(playerId);
        await tournament.save();
      }

      return await Tournament.findById(tournamentId).populate({
        path: 'players',
        populate: { path: 'user' }
      });
    }
  }
};

module.exports = resolvers;