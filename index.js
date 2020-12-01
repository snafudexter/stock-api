const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: "50mb"
}));



var admin = require("firebase-admin");

var serviceAccount = require("./pp.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://treee-6e194.firebaseio.com"
});

require('./routes')(app)

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));