const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/Users.js");
const path = require("path");
const fs = require("fs");
exports.signin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ phoneEn: phone });

    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Login Information!" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    existingUser.password = undefined;
    const token_data = existingUser._id;
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Login Information!" });
    const token = jwt.sign({ token_data }, process.env.JWT_SECRET, {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Successfully Logged in!",
      data: existingUser,
      token: token,
    });
  } catch (err) {
    console.log("signin err: ", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      error: err,
    });
  }
};

exports.signup = async (req, res) => {
  const { phone, password, confirmPassword, name } = req.body;

  try {
    const maxId = await User.findOne().sort({ memberId: -1 });
    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(404).json({ message: "Phone Number already exists !" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Password doesn't exits !" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      phone,
      password: hashedPassword,
      name: name,
      memberId: maxId ? maxId.memberId + 1 : 1,
    });

    // const token = jwt.sign(
    // 	{ email: result.email, id: result._id },
    // 	'jwtscreat',
    // 	{ expiresIn: '360000000000' }
    // );
    // res.status(200).json({ result, token });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong !" });
  }
};

// Get all users
exports.getUser = async (req, res) => {
  try {
    let memberId = req.query.id;
    const userDetails = await User.find({ memberId: memberId });

    res.status(200).json({ Status: "Success", userDetails: userDetails });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong !" });
  }
};

// get commettee  list
exports.getCommittee = async (req, res) => {
  try {
    let year = new Date().getFullYear();
    const committeeMembers = await User.find({ "committee.year": year }); //"committee.year": year
    console.log("year: ", year);
    res.status(200).json({ status: "Success", data: committeeMembers });
  } catch (error) {
    console.log("Error from getCommittee", error);
    res.status(500).json({ message: "Something went wrong !", error });
  }
};

// member Searchs
exports.memberSearch = async (req, res) => {
  const { query } = req;
  const name = query.name || "";
  const phone = query.phone || "";
  const memberID = query.memberID || "";
  const bloodGroup = query.bloodGroup || "";

  console.log(name, phone);
  try {
    const nameField =
      name && name !== ""
        ? {
            name: { $regex: name, $options: "i" },
          }
        : {};
    console.log(name, nameField, phone);
    const users = await User.find({
      $or: [nameField, { phone }],
    });
    res.status(200).send({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong !" });
  }
};

// admin Actions
exports.addMember = async (req, res) => {
  res.json({ msg: "addMember" });
};

exports.uploadProfileCover = async (req, res) => {
  const { id } = req.params;

  console.log("user id: ", id);
  try {
    const _user = await User.findOne({ _id: id });
    let extension = "";

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads");
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname);
        console.log("extension: ", extension);
        callback(null, "profile-cover-" + id + extension);
      },
    });

    const upload = multer({ storage: storage }).single("doc");

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err);
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Cover Photo.",
        });
        return;
      }
      if (extension != _user.coverExtension) {
        const dirName = path.join(
          __basedir,
          `/uploads/profile-cover-${_user._id}${_user.coverExtension}`
        );

        fs.unlink(dirName, (err) => {
          if (err) {
            console.log("File not removed",err);
          }else{
            

          console.log("File delete Success!");
          }
        });
      }
      const _profile = await User.findOneAndUpdate(
        { _id: id },
        { coverExtension: extension }
      );
      res.status(200).json({
        success: true,
        code: 200,
        message: "Cover Photo Uploaded Successfully!!",
      });
    });
  } catch (error) {
    console.log("uploading catch error: ", error);
    res.status(500).json({
      success: false,
      code: 500,
      error,
    });
  }
};

exports.uploadProfile = async (req, res) => {
  const { id } = req.params;

  console.log("user id: ", id);
  try {
    const _user = await User.findOne({ _id: id });
    let extension = "";

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads");
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname);
        console.log("extension: ", extension);
        callback(null, "profile-" + id + extension);
      },
    });

    const upload = multer({ storage: storage }).single("doc");

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err);
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Profile Photo.",
        });
        return;
      }
      if (extension != _user.profileExtension) {
        const dirName = path.join(
          __basedir,
          `/uploads/profile-${_user._id}${_user.profileExtension}`
        );

        fs.unlink(dirName, (err) => {
          if (err) {
            console.log("File not removed",err);
          }else{
            

          console.log("File delete Success!");
          }
        });
      }

      const _profile = await User.findOneAndUpdate(
        { _id: id },
        { profileExtension: extension }
      );
      res.status(200).json({
        success: true,
        code: 200,
        message: "Cover Photo Uploaded Successfully!!",
      });
    });
  } catch (error) {
    console.log("uploading catch error: ", error);
    res.status(500).json({
      success: false,
      code: 500,
      error,
    });
  }
};

const updateUserData=async (req,res)=>{
  const {}=req.body;
  try {

    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Update failed",
    });
  }
}

// exports.provideProfile = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const _profile = await User.findOne({ _id: id });

//     console.log('_profile: ', _profile._id)
//     console.log('__dirname: ', __dirname)
//     if (_profile.coverExtension) {
//       // const path = `./uploads/profile-cover-${id}${_profile.coverExtension}`;
//       const path = `prof.png`;
//       console.log('file path: ', path)
//       const file = fs.createReadStream(path);
//       console.log('file: ', file)
//       const filename = id;
//       res.setHeader(
//         "Content-Disposition",
//         'attachment: filename="' + filename + '"'
//       );
//       file.pipe(res);
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Profile Cover doesn\'t exists',
//         code: 500,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       code: 500,
//       error,
//     });
//   }
// };
