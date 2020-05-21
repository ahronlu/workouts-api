const mongoose = require("mongoose");

const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

exports.workouts_get_all = (req, res, next) => {
  Workout.find()
    .select("exercise quantity _id")
    .populate("exercise", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        workouts: docs.map(doc => {
          return {
            _id: doc._id,
            exercise: doc.exercise,
            request: {
              type: "GET",
              url: "http://localhost:3000/workouts/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.workouts_create_workout = (req, res, next) => {
  Exercise.findById(req.body.exerciseId)
    .then(exercise => {
      if (!exercise) {
        return res.status(404).json({
          message: "exercise not found"
        });
      }
      const workout = new Workout({
        _id: mongoose.Types.ObjectId(),
        exercise: req.body.exerciseId
      });
      return workout.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Workout stored",
        createdWorkout: {
          _id: result._id,
          exercise: result.exercise,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/workouts/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.workouts_get_workout = (req, res, next) => {
  Workout.findById(req.params.workoutId)
    .populate("exercise")
    .exec()
    .then(workout => {
      if (!workout) {
        return res.status(404).json({
          message: "Workout not found"
        });
      }
      res.status(200).json({
        workout: workout,
        request: {
          type: "GET",
          url: "http://localhost:3000/workouts"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.workouts_delete_workout = (req, res, next) => {
  Workout.remove({ _id: req.params.workoutId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Workout deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/workouts",
          body: { exerciseId: "ID"}
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};