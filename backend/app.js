import express from 'express';
export const app = express();
import indexRouter from './src/index.js';
import {login} from './src/authentication/auth.js'
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// serve static files.
app.use(express.static('build'));
// Define middlewares
app.use(cors());
app.use(express.json());
// Define your public routes before applying the middleware

// Use the middleware
app.use(responseTimeLogger);

app.post('/login', login);
app.use('/avatar', express.static('public/avatar'));
// protected api route
app.use('/api', indexRouter);

// Catch all handler
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.use((err, req, res, next) => {
    // logic
    console.log(err);
    res.status(500).send(err)
})


import os from 'os'
const PORT = process.env.PORT || 8081;

// Response time logging middleware
function responseTimeLogger(req, res, next){
  const startTime = Date.now();
  res.on('finish', ()=> {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Request to ${req.method} ${req.path} took ${elapsedTime} ms`);
  });

  next();
}

// Listen to the App Engine-specified port, or 8080 otherwise
app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();

  for (let name of Object.keys(networkInterfaces)) {
    for (let net of networkInterfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`Server IP Address on network: http://${net.address}:${PORT}`);
      }
    }
  }
});

