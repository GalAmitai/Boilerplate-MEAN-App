const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3001;
const app = express();

// Define Routes
const api = require('./routes/api');

// Handling Cors
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

app.listen(PORT, function() {
    console.log('Server Running On Port: ' + PORT);
});