const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('./database');


const app = express();
app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3333);