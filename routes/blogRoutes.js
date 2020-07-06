const express = require('express');
const blogController = require('../controllers/blogControllers')
const router = express.Router();


// These are the blog routes

// fetch all blogs
router.get('/', blogController.blog_index) 

// create a new blog
router.post('/', blogController.blog_create_post)

// create new blog
router.get('/create', blogController.blog_create_get)

// get blog by id
router.get('/:id', blogController.blog_details)

// delete blog by id
router.delete('/:id', blogController.blog_delete)



module.exports = router;