require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// PORT
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
