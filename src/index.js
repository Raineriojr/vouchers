const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);    
app.use(errors());

dotenv.config();
app.listen(process.env.PORT || 3333);