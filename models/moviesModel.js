import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    runtime: {
        type: Number,
        required: [true, "Runtime is required"]
    },
    actors: {
        type: [String],
        required: [true, "Actor is required"]
    },
    director: {
        type: String,
        required: [true, "Director is required"]
    },
    producer: {
        type: String,
        required: [true, "Producer is required"]
    },
    release_date: {
        type: Date,
        required: [true, "Release date is required"]
    },
    poster_image: {
        type: String,
        required: [true, "image is required"]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
