const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

//create
const createPostCtrl = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  const { title, description, category, user } = req.body;
  try {
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }
    //Find the user
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);

    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      category,
      user: userFound._id,
      image: req.file.path,
    });
    //push the post created into the array of user's posts
    userFound.posts.push(postCreated._id);
    //re save
    await userFound.save();

    res.json({
      status: "success",
      user: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//all
const fetchPostsCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      user: posts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//details
const fetchPostCtrl = async (req, res, next) => {
  try {
    //get the id form params
    const id = req.params.id;
    //find the post
    const post = await Post.findById(id);
    res.json({
      status: "success",
      user: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//delete
const deletePostCtrl = async (req, res, next) => {
  try {
    //find the post
    // const deletePost = await Post.findByIdAndDelete(req.params.id); 會有不同人誤刪狀況
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("您沒有刪除此post的權限", 403));
    }
    res.json({
      status: "success",
      user: "Post 已被刪除成功",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update
const updatepostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //find the post
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("您沒有更改此post的權限", 403));
    }
    //update
    const postUpdated = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        image: req.file.path,
      },
      { new: true }
    );
    res.json({
      status: "success",
      data: postUpdated,
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
