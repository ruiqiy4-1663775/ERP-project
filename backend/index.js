import {app} from './app.js'

import os from 'os'

const PORT = process.env.PORT || 8080;
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