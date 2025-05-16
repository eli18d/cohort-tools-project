const router = require("express").Router();

const Student = require("../models/students")

const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/api/students", (req, res) => {
  Student.find({})
    .then(students => {
      res.status(200).json(students)
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students :P'})
    });
  });

router.post("/api/students", isAuthenticated, (req, res) => {
    
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

router.get("/api/students/cohort/:cohortId", (req, res) => {
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

router.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .then(student => {
      res.status(200).json(student)
    })
    .catch(error => {
      console.error('cant find student by Id', error);
      res.status(500).json({ error: 'no students by id :P'})
    });
  
})

router.put("/api/students/:studentId", isAuthenticated, (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then(updatedStudent => {
      res.status(200).json(updatedStudent)
    })
    .catch(error => {
      console.error('error updating student by id', error);
      res.status(500).json({ error: 'no update for student id :P'})
    });

});

router.delete("/api/students/:studentId", isAuthenticated, (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(200).json({ message: "student deleted" })
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students deleted :P'})
    });

});

module.exports = router;