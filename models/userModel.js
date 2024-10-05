const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const dataFilePath = path.join(__dirname, '../data/user.json');

let users = require(dataFilePath);


const saveUsers = () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};


const findUserByUsername = (username) => users.find(user => user.username === username);


const findUserById = (id) => users.find(user => user.id === id);


const createUser = async ({ username, password, email }) => {
    const hashedPassword = await bcrypt.hash(password, 10); // 
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword, 
        email,
    };
    users.push(newUser);
    saveUsers();
    return newUser;
};



const verifyPassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = { findUserByUsername, findUserById, createUser, verifyPassword };



