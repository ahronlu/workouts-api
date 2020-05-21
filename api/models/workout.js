const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
});

module.exports = mongoose.model('Workout', workoutSchema);