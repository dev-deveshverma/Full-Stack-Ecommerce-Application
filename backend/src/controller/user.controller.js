require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const Address = require("../model/address.model");
const { uploadSingle } = require("../middleware/upload");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { sendPasswordResetVerificationEmail } = require("../utils/utils");
const { response } = require("express");
const { hashPassword, comparePassword } = require("../utils/password.utils");
const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
//** relationship start */

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ include: Address });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// find user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});
// *? update single user information with profile pictue
router.patch("/profile", uploadSingle("profile_pic"), async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.body.user_Id);
    // const {firstName,lastName,email,phone,gender}=req.body;
    const user = await User.update(
      { profile_pic: req.file.filename },
      { where: { user_Id: req.body.user_Id } }
    );
    if (user[0] === 1) {
      const updatedUser = await User.findByPk(req.body.user_Id, {
        attributes: [
          "user_Id",
          "firstName",
          "lastName",
          "email",
          "gender",
          "profile_pic",
          "createdAt",
          "updatedAt",
        ],
      });
      if (currentUser.profile_pic !== null) {
        const deletePath = "../uploads/" + currentUser.profile_pic;
        fs.unlinkSync(path.join(__dirname, deletePath));
      }
      return res.status(200).send(updatedUser);
    }

    return res
      .status(200)
      .send({ message: "User not found", isUpdated: user[0] });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

// *? update single user information without profile pictue
router.patch("", async (req, res) => {
  try {
    const user = await User.update(
      { ...req.body },
      { where: { user_Id: req.body.user_Id } }
    );
    if (user[0] === 1) {
      const updatedUser = await User.findByPk(req.body.user_Id,{ attributes: [
        "user_Id",
        "firstName",
        "lastName",
        "email",
        "gender",
        "profile_pic",
        "createdAt",
        "updatedAt",
      ],});
      return res.status(200).send(updatedUser);
    }

    return res.status(200).send({ message: "User not found", isUpdated: user });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

//! forget password reset link request route
router.post("/register/verify", async (req, res) => {
  try {
    //! first verifying if the user exists with the requested email address
    const { dataValues } = await User.findOne({
      where: { email: req.body.email },
    });
    //  console.log('user exist ',dataValues)
    if (dataValues.user_Id) {
      //! creating password reset token that will valid for next 10 minitues
      const passwordResetToken = jwt.sign(
        { user_Id: dataValues.user_Id },
        process.env.RESET_PASSWORD_SECRET_KEY,
        { expiresIn: "10m" }
      );
      // console.log('token generated',passwordResetToken)
      //! now updating the resetPasswordToken filed in user table to verify user by sending email
      const updateUserResetPasswordToken = await User.update(
        { resetPasswordToken: passwordResetToken },
        { where: { user_Id: dataValues.user_Id } }
      );
      // console.log('resetPasswordToken filed status',updateUserResetPasswordToken)
      //? chekcing if the reset password token is updated
      if (updateUserResetPasswordToken[0] == 1) {
        //! sending password reset link with the passwordReset token
        await sendPasswordResetVerificationEmail({
          from: "wp.ecom.application@gmail.com",
          to: `${req.body.email}`,
          email: req.body.email,
          token: passwordResetToken,
        });
        return res
          .status(200)
          .send({ message: "Password reset mail successfully sent" });
      }
      return res.status(400).send({ message: "Something went wrong " });
    }
    return res
      .status(400)
      .send({ message: "No user exists with the email address?" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: error });
  }
});

//! update password request handler ;
router.post("/register/verify/updatePassword", async (req, res) => {
  try {
    //?? exctracting token and new password from the request body
    const { token, password } = req.body;
    //! verifying the send token during the verification process
    if (token) {
      jwt.verify(
        token,
        process.env.RESET_PASSWORD_SECRET_KEY,
        async (err, user) => {
          if (err) {
            return res
              .status(400)
              .send({ message: "Token is expired or not valid" });
          }
          //? verifying the token with updated resetPasswordToken field in the user table
          const { dataValues } = await User.findOne({
            where: { resetPasswordToken: token },
          });
          if (dataValues) {
            //** now update the new password with the user's old password */
            const isPasswordUpdated = await User.update(
              { password: hashPassword(password) },
              { where: { user_Id: dataValues.user_Id } }
            );
            //! checking if updation is successful
            if (isPasswordUpdated[0] === 1) {
              return res
                .status(200)
                .send({ message: "Password updated successfully" });
            }
            return res
              .status(400)
              .send({ message: "Error while updating the password" });
          }
          return res
            .status(400)
            .send({
              message: "Token is not matched with the resetPasswordToken?",
            });
        }
      );
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: error });
  }
});

//!! Email verification after registration
router.get("/register/emailVerification/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //! if token is available then verifying it
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
          return res.status(400).send({ message: "Token has expired" });
        }
        //? if token is valid then email verificatoin is done and update the user account status to active mode
        const { user_Id } = user.user; //! extracting user object inside user token object
        const isUserAccountActive = await User.update(
          { is_Active: 1 },
          { where: { user_Id } }
        );
        if (isUserAccountActive[0] === 1) {
          res.redirect(`${process.env.CLIENT_URL}/login`);
          // return res.status(200).send({message:'Your account has been activated.'})
          return;
        }

        return res.status(400).send({ message: "User account is not found?" });
      });
    } else {
      return res.status(400).send({ message: "Token is not valid" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: error });
  }
});

//! change password request handler
router.post(
  "/change-password",
  authenticate(),
  authorization(["user"]),
  async (req, res) => {
    try {
      //! checking if user is exist with the
      let { dataValues } = await User.findOne({
        where: { email: req.body.email, is_Active: 1 },
      });

      if (!dataValues) {
        return res
          .status(400)
          .send({ message: "User with this email is not exist!!" });
      }
      //! compare entered oldpassword with already stored password
      if (!comparePassword(req.body.oldPassword, dataValues.password)) {
        return res.status(400).send({ message: "Old password is invalid ?" });
      }
      //! else we will hashed new password and replace stored password in  the user's table
      const isPasswordChanged = await User.update(
        { password: hashPassword(req.body.newPassword) },
        { where: { email: req.body.email, user_Id: req.body.user_Id } }
      );

      if (isPasswordChanged[0] === 1) {
        return res
          .status(200)
          .send({ message: "Your password has been changed" });
      }
      return res
        .status(400)
        .send({ message: "Something went wrong?Please try again later" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
);
module.exports = router;
