// const User = require('../models/User.js');
// const jwt = require('jsonwebtoken');
// const admin = require('../config/firebase.js');

// // Generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRE || '30d' }
//   );
// };

// exports.register = (req, res) => {
//   const { email, password } = req.body;
//   return res.status(201).json({ message: 'User registered successfully' });
// };

// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   if (email === 'test@example.com' && password === 'password') {
//     return res.status(200).json({ message: 'Login successful' });
//   }
//   return res.status(401).json({ message: 'Invalid credentials' });
// };

// exports.firebaseAuth = (req, res) => {
//   return res.status(200).json({ message: 'Firebase authentication successful' });
// };

// exports.getProfile = (req, res) => {
//   // Example logic for fetching user profile
//   return res.status(200).json({ message: 'User profile fetched successfully' });
// };

// exports.updateProfile = (req, res) => {
//   // Example logic for updating user profile
//   return res.status(200).json({ message: 'User profile updated successfully' });
// };

// exports.changePassword = (req, res) => {
//   // Example logic for changing password
//   return res.status(200).json({ message: 'Password changed successfully' });
// };

const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase.js');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// src/controllers/auth.controller.js

exports.register = (req, res) => {
  return res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
  return res.status(200).json({ message: 'Login successful' });
};

exports.firebaseAuth = (req, res) => {
  return res.status(200).json({ message: 'Firebase authentication successful' });
};

exports.getProfile = (req, res) => {
  return res.status(200).json({ message: 'User profile fetched successfully' });
};

exports.updateProfile = (req, res) => {
  return res.status(200).json({ message: 'User profile updated successfully' });
};

exports.changePassword = (req, res) => {
  return res.status(200).json({ message: 'Password changed successfully' });
};