const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    videoId: { type: String, required: true }
});

module.exports = mongoose.model('Exercise', exerciseSchema);