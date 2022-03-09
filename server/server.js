/**
 * @file
 * Contains the server side code for the poker application.
 */

const express = require("express");
const fs = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

const app = express();
require("dotenv").config()

const options = {
  key: fs.readFileSync(process.env.SERVER_KEY_PATH),
  cert: fs.readFileSync(process.env.SERVER_CERT_PATH)
};

const httpsServer = createServer(options, app);
let origin = process.env.APP_PROTOCOL + '://' + process.env.APP_HOST + ':' + process.env.APP_PORT;

const io = new Server(httpsServer, {
  cors: {
    origin: origin || '*',
    methods: ["GET", "POST"]
  }
});

// Main Socket operations.
io.on("connection", (socket) => {

});

// Serve the request.
httpsServer.listen(process.env.APP_PORT || 3000, () => {
  console.log('listening on *:' + process.env.APP_PORT);
});
