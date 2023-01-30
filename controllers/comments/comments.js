const Comment = require("../../models/comment/Comment");
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

//create
const createCommentCtrl = async (req, res) => {
  const { message } = req.body;
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //create the comment
    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
    });
    //push the comment to post
    post.comments.push(comment._id);
    //find the user
    const user = await User.findById(req.session.userAuth);
    //push the comment into
    user.comments.push(comment._id);
    //disable validation
    //save
    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    console.log("comment", comment);
    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.json(error);
  }
};

//single
const commentDetailsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post comments",
    });
  } catch (error) {
    res.json(error);
  }
};

//delete
const deleteCommentCtrl = async (req, res) => {
  //find the post
  const comment = await Comment.findById(req.params.id);
  if (comment.user.toString() !== req.session.userAuth.toString()) {
    return next(appErr("您沒有刪除此comment的權限", 403));
  }
  await Comment.findByIdAndDelete(req.params.id);
  try {
    res.json({
      status: "success",
      data: "Comment 已經被刪除",
    });
  } catch (error) {
    res.json(error);
  }
};

//Update
const upddateCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment updated",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createCommentCtrl,
  commentDetailsCtrl,
  deleteCommentCtrl,
  upddateCommentCtrl,
};
