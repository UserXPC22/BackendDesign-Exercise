
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecretkey';


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No Token is Provided!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid Token Provided!' });
        }
        req.userId = decoded.userID;
        next();
    });
};

module.exports = authMiddleware;

