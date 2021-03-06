//Install express server
const express = require('express');
const path = require('path');

const app = express();

// server.js
const cors = require('cors');
app.use(cors());
/* server configuration here */

// Serve only the static files form the dist directory
app.use(express.static('./dist/flizzerchatUI22'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: '/dist/flizzerchatUI22/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);