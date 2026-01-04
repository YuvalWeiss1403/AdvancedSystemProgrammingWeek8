const express = require('express');
const app = express();
const cors = require('cors'); 
const jwt = require("jsonwebtoken");


app.use(cors());
app.use(express.json());

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

const index = (req, res) => {
    res.json({ data: 'this is the secret message from the server' });
};

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7, authHeader.length) : authHeader;

        try {
            const data = jwt.verify(token, key);
            console.log('The logged in user is: ' + data.username);
            return next();
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else {
        return res.status(403).send('Token required');
    }
};

const processLogin = (req, res) => {
    if (req.body.username === 'guest' && req.body.password === '123456') {
        const data = { username: req.body.username };
        const token = jwt.sign(data, key, { expiresIn: '1h' });
        res.status(201).json({ token });
    } else {
        res.status(404).json({ message: 'Invalid username and/or password' });
    }
};

app.post('/login', processLogin); 
app.get('/', isLoggedIn, index);

app.listen(89, () => console.log("Backend server running on port 89"));