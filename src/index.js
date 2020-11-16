const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'https://expo.io/--/to-exp/exp%3A%2F%2Fexp.host%2F%40raineriojr%2FVouchers'
}))

app.use(express.json());
app.use(routes);    
app.use(errors());

dotenv.config();
app.listen(process.env.PORT || 3333);