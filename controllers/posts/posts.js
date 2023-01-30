const Post = require("../../models/post/Post");
const User = require("../../models/user/User");

//create
const createPostCtrl = async (req, res) => {
  const { title, description, category, user } = req.body;

  //Find the user
  const userId = req.session.userAuth;
  const userFound = await User.findById(userId);

  //Create the post
  const postCreated = await Post.create({
    title,
    description,
    category,
    user: userFound._id,
  });
  //push the post created into the array of user's posts
  userFound.posts.push(postCreated._id);
  //re save
  await userFound.save();
  try {
    res.json({
      status: "success",
      user: postCreated,
    });
  } catch (error) {
    res.json(error);
  }
};

//all
const fetchPostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Posts list",
    });
  } catch (error) {
    res.json(error);
  }
};

//details
const fetchPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post details",
    });
  } catch (error) {
    res.json(error);
  }
};

//delete
const deletePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post deleted",
    });
  } catch (error) {
    res.json(error);
  }
};

//update
const updatepostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post updated",
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  deletePostCtrl,
  updatepostCtrl,
};
