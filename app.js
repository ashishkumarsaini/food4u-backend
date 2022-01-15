require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// PORT
const port = process.env.PORT;
const databasePort = process.env.DATABASE;

mongoose.connect(databasePort)
    .then((() => console.log('DATABASE CONNECTED')))
    .catch(() => console.log('FAILED TO CONNECT TO DATABASE'));

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get('/api/test', (req, res) => {
    res.status(200).json({
        success: true,
    })
});
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/`);
});
