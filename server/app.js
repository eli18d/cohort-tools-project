const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")
const Student = require('./models/students')
const Cohort = require('./models/cohort')


mongoose
  .connect('mongodb://127.0.0.1:27017/cohort-tools-api')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .then(students => {
      res.status(200).json(students)
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students :P'})
    });
  });

  app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students :P'})
    });
  });
 





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});