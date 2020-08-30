import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';


const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// const {verifyToken} = require('./utils/verify_token')


// const signUpRoute = require('./MVC/routes/signup')
// const loginRoute =  require('./MVC/routes/login')
// const logOutRoute = require('./MVC/routes/logout')

const router = express.Router();
const app = express();

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }


app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/signup', require('./MVC/routes/signup.ts'))
app.use('/login', require('./MVC/routes/login.ts'))
app.use('/user', require('./MVC/routes/user/user'))
app.use('/personal_projects', require('./MVC/routes/personal_projects/personal_project'))

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

const port = process.env.PORT || 5000

//start our server
app.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});

module.exports = app