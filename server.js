require("dotenv").config();
const express = require("express");
require("./config/dbConnect");
const app = express();

//middlewares
//-------
//users route
//------
//POST/api/v1/users/register
app.post("/api/v1/users/register", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User registered",
    });
  } catch (error) {
    res.json(error);
  }
});

//POST/api/v1/users/login
app.post("/api/v1/users/login", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User login",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/users/:id
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User Details",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/users/profile/:id
app.get("/api/v1/users/profile/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User profile",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/profile-photo-upload/:id
app.put("/api/v1/users/profile-photo-upload/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User profile image upload",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/cover-photo-upload/:id
app.put("/api/v1/users/cover-photo-upload/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User cover image upload",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/update-password/:id
app.put("/api/v1/users/update-password/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User password update",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/update/:id
app.put("/api/v1/users/update/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User update",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/users/logout
app.get("/api/v1/users/logout", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
});

//-------
//posts route
//------
//POST/api/v1/posts
app.post("/api/v1/posts", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Posts list",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/posts/:id
app.get("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post details",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/posts/:id
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post deleted",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/posts/:id
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post updated",
    });
  } catch (error) {
    res.json(error);
  }
});
//-------
//comments
//------
//POST/api/v1/comments
app.post("/api/v1/comments", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/comments/:id
app.get("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post comments",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment deleted",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment updated",
    });
  } catch (error) {
    res.json(error);
  }
});

//Error handler middlewares
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Servver is running on PORT ${PORT}`));
