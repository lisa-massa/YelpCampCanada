const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewImageSchema = new Schema({
    url: String,
    filename: String
});

reviewImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };


const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: [reviewImageSchema]
});

module.exports = mongoose.model('Review', reviewSchema);