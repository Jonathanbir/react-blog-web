const bcrypt = require("bcryptjs");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async (req, res, next) => {
  const { fullname, email, password, role } = req.body;
  //check if field is empty
  if (!fullname || !email || !password || !role) {
    return res.status(401).send("每個項目都為必填");
  }
  try {
    //1. check if user exist (email)
    const userFound = await User.findOne({ email });
    //throw an error
    if (userFound) {
      return res.status(401).send("此信箱已經被註冊過了。。。");
    }
    //Hash passsword
    const salt = await bcrypt.genSalt(10);
    const passswordHashed = await bcrypt.hash(password, salt);
    //register user
    const user = await User.create({
      fullname,
      email,
      password: passswordHashed,
      role,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

//login
const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("電子信箱及密碼為必填");
  }
  try {
    //檢查帳號是否存在
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(401).send("無法找到使用者。請確認信箱是否正確。");
    }
    //密碼檢驗
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.status(401).send("密碼錯誤");
    }
    req.session.userAuth = userFound._id;
    res.json({
      status: "success",
      data: userFound,
    });
  } catch (error) {
    return res.status(500).send(err);
  }
};

//details
const userDetailsCtrl = async (req, res) => {
  try {
    //get userId from params
    const userId = req.params.id;
    //find the user
    const user = await User.findById(userId);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

//profile
const profileCtrl = async (req, res) => {
  try {
    //get the login user
    const userID = req.session.userAuth;
    //find the user
    const user = await User.findById(userID)
      .populate("posts")
      .populate("comments");
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

//upload profile photo
const uploadProfilePhotoCtrl = async (req, res, next) => {
  console.log(req.file.path);
  try {
    //1. Find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //2. check if user is found
    if (!userFound) {
      return next(appErr("User not found", 403));
    }
    //5.Update profile photo
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: userUpdated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
//upload cover image
const uploadCoverImgCtrl = async (req, res) => {
  console.log(req.file.path);
  try {
    //1. Find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //2. check if user is found
    if (!userFound) {
      return next(appErr("User not found", 403));
    }
    //5.Update profile photo
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: userUpdated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update password
const updatePasswordCtrl = async (req, res, next) => {
  console.log(req.params);
  const { password } = req.body;
  try {
    //Check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passswordHashed = await bcrypt.hash(password, salt);
      //update user
      await User.findByIdAndUpdate(
        req.params.id,
        {
          password: passswordHashed,
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        user: "Password has been changed successfully",
      });
    }
  } catch (error) {
    return next(appErr("Please provide password field"));
  }
};

//update user
const updateUserCtrl = async (req, res, next) => {
  const { fullname, email, role } = req.body;
  try {
    //Check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }
    //update the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
        role,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(next(appErr(error.message)));
  }
};

//logout
const logoutCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  uploadProfilePhotoCtrl,
  uploadCoverImgCtrl,
  updatePasswordCtrl,
  updateUserCtrl,
  logoutCtrl,
};
