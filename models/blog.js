const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Making Schema which is the structure of the Blog Collection
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Making Model based on blogScheme Schema
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;