const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config()


const db = require("./src/config/dbConfig.js")
const todoRoutes = require("./src/routes/todoRoutes.js")
const userRoutes = require("./src/routes/authRoutes.js")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}));


db.connection()
app.use('/todo',todoRoutes )
app.use('/auth',userRoutes)



app.listen(process.env.Port)