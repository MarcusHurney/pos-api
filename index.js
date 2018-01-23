// load environment configurations
require('./api/config/config');

//Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const auth_routes = require('./api/routes/authentication');
// import mongoose with custom settings
const { mongoose } = require('./api/db/mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Express Setup

// morgan logs all incoming requests
app.use(morgan('combined'));

// Cross-Origin Resource Sharing
app.use(cors());

// parses incoming requests into JSON, '*/*' accepts any type of request
app.use(bodyParser.json({ type: '*/*' }));

// attaches all authentication routes to express
auth_routes(app);

//Server Setup and Initialization
const PORT = process.env.PORT;

// creates an http server that can receive requests and forward them to express
const SERVER = http.createServer(app);

SERVER.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
