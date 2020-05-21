const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ExercisesController = require('../controllers/exercises');

router.get("/", ExercisesController.exercises_get_all);

router.post("/", ExercisesController.exercises_create_exercise);

router.get("/:exerciseId", ExercisesController.exercises_get_exercise);

router.patch("/:exerciseId", checkAuth, ExercisesController.exercises_update_exercise);

router.delete("/:exerciseId", checkAuth, ExercisesController.exercises_delete);

module.exports = router;