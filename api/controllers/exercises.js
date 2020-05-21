const mongoose = require("mongoose");
const Exercise = require("../models/exercise");

exports.exercises_get_all = (req, res, next) => {
  Exercise.find()
    .select("title videoId _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        exercises: docs.map(doc => {
          return {
            title: doc.title,
            videoId: doc.videoId,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/exercises/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.exercises_create_exercise = (req, res, next) => {
  const exercise = new Exercise({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    videoId: req.body.videoId,
  });
  exercise
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created exercise successfully",
        createdExercise: {
          title: result.title,
          videoId: result.videoId,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/exercises/" + result._id
          }
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

exports.exercises_get_exercise = (req, res, next) => {
  const id = req.params.exerciseId;
  Exercise.findById(id)
    .select("title videoId")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          exercise: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/exercises"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.exercises_update_exercise = (req, res, next) => {
  const id = req.params.exerciseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Exercise.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Exercise updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/exercises/" + id
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

exports.exercises_delete = (req, res, next) => {
  const id = req.params.exerciseId;
  Exercise.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Exercise deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/exercises",
          body: { title: "String", videoId: "String" }
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