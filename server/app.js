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


// STUDENT ROUTES
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

app.post("/api/students", (req, res) => {
    
  const studentsData = req.body;
    Student.create(studentsData)
    .then((createdStudent) => {
        res.status(200).json(createdStudent)
    })
    .catch((error) => {
      console.error('there was an error', error);
        res.status(500).json({ message: "error creating student"})
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId})
    .populate('cohort')
    .then(students => {
      res.status(200).json(students)
    })
    .catch(error => {
      console.error('there was an error', error);
      res.status(500).json({ error: 'no students :P'})
    });
  
})

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .then(student => {
      res.status(200).json(student)
    })
    .catch(error => {
      console.error('cant find student by Id', error);
      res.status(500).json({ error: 'no students by id :P'})
    });
  
})

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then(updatedStudent => {
      res.status(200).json(updatedStudent)
    })
    .catch(error => {
      console.error('error updating student by id', error);
      res.status(500).json({ error: 'no update for student id :P'})
    });

});

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(200).json({ message: "student deleted" })
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students deleted :P'})
    });

});



// COHORT ROUTES  
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

  app.post("/api/cohorts", (req,res) => {
  const cohortData = req.body

  Cohort.create(cohortData)
  .then(newCohort => res.json(newCohort))
  .catch(err => res.status(400).json({error: "Failed to create cohort", details: err}))
})

app.get("/api/cohorts/:cohortId", (req, res) => {
  const {cohortId} = req.params;

  Cohort.findById(cohortId)
  .then(cohort => {
    res.json(cohort)
  })
  .catch(err => res.status(400).json({error:"failed to find id", details: err}))
})

app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const updateData = req.body;

  Cohort.findByIdAndUpdate(cohortId, updateData, { new: true, runValidators: true })
    .then(updatedCohort => {
      res.json(updatedCohort);
    })
    .catch(err => res.status(400).json({ error: "Failed to update cohort", details: err }));
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(deletedCohort => {
      res.json(deletedCohort);
    })
    .catch(err => res.status(500).json({ error: "Failed to delete cohort", details: err }));
});
 





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});