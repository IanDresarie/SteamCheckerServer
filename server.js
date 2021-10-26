const steamServerStatus = require('steam-server-status-challenge-fix');

'use strict';

const express = require('express');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// Constants
const PORT = 1234;
const HOST = '127.0.0.1';

// App
const app = express();

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    var ports = [];
    // up to 10 Servers can be checked with this.
    if (req.query.server0 != null) ports.push(req.query.server0)
    if (req.query.server1 != null) ports.push(req.query.server1)
    if (req.query.server2 != null) ports.push(req.query.server2)
    if (req.query.server3 != null) ports.push(req.query.server3)
    if (req.query.server4 != null) ports.push(req.query.server4)
    if (req.query.server5 != null) ports.push(req.query.server5)
    if (req.query.server6 != null) ports.push(req.query.server6)
    if (req.query.server7 != null) ports.push(req.query.server7)
    if (req.query.server8 != null) ports.push(req.query.server8)
    if (req.query.server9 != null) ports.push(req.query.server9)
    console.log(ports);
    var response = [];
    ports.forEach(port => {
        steamServerStatus.getServerStatus(
            req.query.serverUrl, port, function(serverInfo) {
                if (serverInfo.error) {
                    response.push(serverInfo.error);
                    console.log(serverInfo.error);
                } else {
                    response.push(serverInfo);
                    console.log(serverInfo);
                }
            })
    })
    setTimeout(() => {
        res.send(response);
    }, 5000);
    //res.send(response);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);