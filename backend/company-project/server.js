const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

app.use(cors());

//call router
const user = require('./routes/user');
const company = require('./routes/company');
connectDB();

dotenv.config({path:'./config/config.env'});

PORT = process.env.PORT || 5000;

//mount routes
app.use('/v1.0', user);
app.use('/v1.0', company);

app.listen(PORT, function () {
    console.log("Server started at", PORT);
});