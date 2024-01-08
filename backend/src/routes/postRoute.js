const express = require("express");
const postController = require("../controllers/postController");
const authMiddlware = require("../middlware/authMiddlware");
const postRoute = express();
postRoute.post("/", authMiddlware.authenticateUser,postController.createPost);
postRoute.put("/:id",authMiddlware.authenticateUser , postController.updatePost);
postRoute.get("/",authMiddlware.authenticateUser , postController.getPostUsingLatitudeLongitude);
postRoute.delete("/:id", authMiddlware.authenticateUser,postController.deletePost);
module.exports = postRoute;