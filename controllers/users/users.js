const bcrypt = require("bcryptjs");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  //check if field is empty
  if (!fullname || !email || !password) {
    return next(appErr("All fields are required"));
  }
  try {
    //1. check if user exist (email)
    const userFound = await User.findOne({ email });
    //throw an error
    if (userFound) {
      return next(appErr("User already Exists"));
    }
    //Hash passsword
    const salt = await bcrypt.genSalt(10);
    const passswordHashed = await bcrypt.hash(password, salt);
    //register user
    const user = await User.create({
      fullname,
      email,
      password: passswordHashed,
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
    return next(appErr("Email and password fields are required"));
  }
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      //throw an error
      // return res.json({ status: "failed", data: "Invalid login credentials" });
      return next(appErr("Invalid login credentials"));
    }
    //verify password
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      //throw an error
      // return res.json({ status: "failed", data: "Invalid login credentials" });
      return next(appErr("Invalid login credentials"));
    }
    req.session.userAuth = userFound._id;
    res.json({
      status: "success",
      data: userFound,
    });
  } catch (error) {
    res.json(error);
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
    const user = await User.findById(userID);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

//upload profile photo
const uploadProfilePhotoCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User profile image upload",
    });
  } catch (error) {
    res.json(error);
  }
};

//upload cover image
const uploadCoverImgCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User cover image upload",
    });
  } catch (error) {
    res.json(error);
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
  const { fullname, email } = req.body;
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
