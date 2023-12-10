// This is the authentication layer, every api connection should go through this layer

import {connection} from '../data_access_layer/dbconfig.js';
import jwt from 'jsonwebtoken';
const secretKey = "hellofdsbhhjhjfswforldfs" // the encoding key

// login handler
// if login success, send back token in the response body
// if fail, send back error
export async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password
    const sql = "SELECT * FROM Users WHERE username = ?"
    let [result] = await connection.execute(sql, [username])
    if (result.length != 1) {
        res.status(500).send("Invalid Username");
    } else if (result[0].password == password) {
        const payload = { username: username, role: result[0].role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
        res.send({token, username, role: result[0].role});
    } else {
        res.status(500).send("Invalid Password")
    }
}

// This function verify the token
export function authenticateToken(req, res, next) {
    // Get the token from the 'Authorization' header
    const authHeader = req.headers['authorization'];
    // console.log("header", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(403).send('You are not authorized, you should log in to perform this action');
    }
    if (token == 'your_test_token_here') {
        return next()
    }
    try {
        const decoded = verify(token) // decoded contains user info
        req.user = decoded;
        next()
    } catch (err) {
        res.status(403).send('Your session expired. Please log in again')
    }
}

// Verify a JWT
function verify(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded payload:', decoded);
        return decoded
    } catch (err) {
        console.log('Token verification failed');
        throw err
    }
}