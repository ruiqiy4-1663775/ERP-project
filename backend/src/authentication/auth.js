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
      return res.sendStatus(403);
    }
    verify(token, (err, user) => {
      if (err) {
        // If verification fails, send a 403 status code (Forbidden)
        return res.sendStatus(403);
      }
      // If verification is successful, store the user info in the request
      req.user = user;
      // Go to the next middleware or route handler
      next();
    });
  }

// Verify a JWT
function verify(token, callback) {
    try {
        const decoded = jwt.verify(token, secretKey);
        // console.log('Decoded payload:', decoded);
        callback(null, decoded);
      } catch (err) {
        console.log('Token verification failed');
        callback(err);
      }
}