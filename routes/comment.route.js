const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.get("/posts/:post_ID/comments", commentController.getCommentsByPosts);

router.get("/posts/:post_ID/comments/:id", commentController.getComment);

router.put(
    "/posts/:post_ID/comments/:id",
    commentController.updateComment
);

router.post(
    "/posts/:post_ID/comments/",
    commentController.createComment
);

router.delete("/posts/:post_ID/comments/:id", commentController.deleteComment);

module.exports = router;
