  const router = require("express").Router();

  const { isAuthenticated } = require("../middleware/jwt.middleware");

  const Cohort = require("../models/cohort");
  
  router.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(error => {
      console.error('bla bla bla', error);
      res.status(500).json({ error: 'no students :P'})
    });
  });

  router.post("/api/cohorts", isAuthenticated, (req,res) => {
  const cohortData = req.body

  Cohort.create(cohortData)
  .then(newCohort => res.json(newCohort))
  .catch(err => res.status(400).json({error: "Failed to create cohort", details: err}))
})

router.get("/api/cohorts/:cohortId", (req, res) => {
  const {cohortId} = req.params;

  Cohort.findById(cohortId)
  .then(cohort => {
    res.json(cohort)
  })
  .catch(err => res.status(400).json({error:"failed to find id", details: err}))
})

router.put("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  const { cohortId } = req.params;
  const updateData = req.body;

  Cohort.findByIdAndUpdate(cohortId, updateData, { new: true, runValidators: true })
    .then(updatedCohort => {
      res.json(updatedCohort);
    })
    .catch(err => res.status(400).json({ error: "Failed to update cohort", details: err }));
});

router.delete("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(deletedCohort => {
      res.json(deletedCohort);
    })
    .catch(err => res.status(500).json({ error: "Failed to delete cohort", details: err }));
});

module.exports = router;
 