const express = require("express");
const blogController = require("./../controllers/blogController");
const router = express.Router();

router.param('id',blogController.checkID);

router
    .route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.checkBody, blogController.createBlog);

router
    .route('/:id')
    .get(blogController.getOneBlog)
    .patch(blogController.checkBody,blogController.updateBlog)
    .delete(blogController.deleteBlog);

module.exports = router;