/**
 * Mock Authentication Store
 * For development without MongoDB
 * Stored in-memory (resets when server restarts)
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory user store
const users = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Admin User',
    email: 'admin@axentralab.com',
    password: '$2a$12$J8m0L60QpRBhKvReCl.TCOKvFvS/2Y4dZWK0t8lzxlAJHBscXZv2e', // admin123!
    role: 'admin',
    company: 'Axentralab',
    phone: '+8801700000000',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: process.env.JWT_EXPIRE || '7d' });

/**
 * Register a new user (in-memory)
 */
const register = async (name, email, password, company, referralCode) => {
  // Check if user exists
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = {
    _id: `507f1f77bcf86cd799${Math.random().toString().slice(2, 11)}`,
    name,
    email,
    password: hashedPassword,
    role: 'client',
    company: company || '',
    phone: '',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(user);

  const token = signToken(user._id);
  return {
    success: true,
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, company: user.company },
  };
};

/**
 * Login user (in-memory)
 */
const login = async (email, password) => {
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account suspended');
  }

  const token = signToken(user._id);
  return {
    success: true,
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, company: user.company },
  };
};

/**
 * Get user by ID
 */
const findUserById = (id) => {
  return users.find(u => u._id === id);
};

/**
 * Update user
 */
const updateUser = (id, updates) => {
  const user = users.find(u => u._id === id);
  if (!user) return null;

  Object.assign(user, updates, { updatedAt: new Date() });
  return user;
};

/**
 * Change password
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = users.find(u => u._id === userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password incorrect');

  user.password = await bcrypt.hash(newPassword, 12);
  user.updatedAt = new Date();

  return { success: true, message: 'Password updated' };
};

module.exports = {
  register,
  login,
  findUserById,
  updateUser,
  changePassword,
};
