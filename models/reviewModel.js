import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

const Review = mongoose.model('Review', movieSchema);

export default Review;
