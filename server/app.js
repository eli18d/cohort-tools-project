require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")



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


// Mount Routes

app.use("/", require("./routes/students.routes"))
app.use("/", require("./routes/cohorts.routes"))
app.use("/", require("./routes/auth.routes"))
app.use("/", require("./routes/user.routes"))






// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});