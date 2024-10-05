const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'supersecretkey';



const register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = userModel.findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await userModel.createUser({ username, password, email });
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
};


const login = (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = userModel.findUserByUsername(username);
    

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userID: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
};


const getProfile = (req, res) => {
    const userId = req.userId;
    const user = userModel.findUserById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ profile: user });
};

module.exports = { register, login, getProfile };


