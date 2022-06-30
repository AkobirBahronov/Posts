const express = require("express");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const postController = require("../controllers/post.controller");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/posts");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    },
});

const fileUpload = multer({ storage: storage });

router.get("/", postController.getPosts);

router.get("/:id", postController.getPosts);


router.put(
    "/:id",
    fileUpload.array("image", 1),
    postController.updatePost
);

router.post(
    "/",
    fileUpload.array("image", 1),
    postController.createPosts
);

router.delete("/:id", postController.deletePost);

module.exports = router;
