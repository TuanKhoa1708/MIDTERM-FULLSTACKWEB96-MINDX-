import bcrypt from 'bcrypt';

import User from '../models/User.js';

import { buildApiKey } from '../utils/generateApiKey.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      apiKey: buildApiKey(),
    });

    res.status(201).json({ message: 'User registered successfully', apiKey: user.apiKey });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const apiKey = buildApiKey(user._id, user.email);

        user.apiKey = apiKey;
        await user.save();

        res.status(200).json({ message: 'Login successful', apiKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}