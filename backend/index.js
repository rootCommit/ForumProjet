const express = require('express');

const cors =  require('cors');

const userRoute = require('./route/userRoutes');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/forumProjet", { useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(cors());


app.use('/user', userRoute);

app.get('/', (req, res) => {
    console.log('test');
    res.send('test');
});

app.listen(3000, ()=>{
    console.log("demarrage");
});