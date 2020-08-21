const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);
app.use(errorHandler);

module.exports = app;

