const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const WorkoutsController = require('../controllers/workouts');

// Handle incoming GET requests to /workouts
router.get("/", WorkoutsController.workouts_get_all);

router.post("/", WorkoutsController.workouts_create_workout);

router.get("/:workoutId", WorkoutsController.workouts_get_workout);

router.delete("/:workoutId", checkAuth, WorkoutsController.workouts_delete_workout);

module.exports = router;