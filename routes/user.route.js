const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.put(
    "/:id",
    userController.updateUser
);

router.post(
    "/",
    userController.createUser
);

router.delete("/:id", userController.deleteUser);

module.exports = router;
