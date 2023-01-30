//create
const createCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment created",
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
  try {
    res.json({
      status: "success",
      user: "comment deleted",
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
