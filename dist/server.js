"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var verifyToken = require('./utils/verify_token').verifyToken;
// const signUpRoute = require('./MVC/routes/signup')
// const loginRoute =  require('./MVC/routes/login')
// const logOutRoute = require('./MVC/routes/logout')
var router = express.Router();
var app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
//initialize a simple http server
// const server = http.createServer(app)
//initialize the WebSocket server instance
// const wss = new WebSocket.Server({ app });
// wss.on('connection', (ws: WebSocket) => {
//     //connection is up, let's add a simple simple event
//     ws.on('message', (message: string) => {
//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });
//     //send immediatly a feedback to the incoming connection    
//     ws.send('Hi there, I am a WebSocket server');
// });
var port = process.env.PORT || 5000;
//start our server
app.listen(port, function () {
    console.log("Server started on port " + port + " :)");
});
module.exports = app;
