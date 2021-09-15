const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "abcdef123456";

//Route<==>1:Create a User using : POST ==> "/api/auth" <---- No Login Required
router.post(
  "/createuser",
  [
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("email", "Enter A Valid e-mail").isEmail(),
    body("password", "Password must be atleast of 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //If there are errors return bad requset and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry A User With This Email Already Exists" });
      }
      //Create a new user
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);

      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occurred");
    }
  }
);

// Route<->2 ::: Authenticating a User using : POST ==> "/api/auth/login" <---- No Login Required
router.post(
  "/login",
  [
    body("email", "Enter A Valid e-mail").isEmail(),
    body("password", "Password should not be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occurred");
    }
  }
);

//Route<==>3 : Get Logged In User Details using ==> POST "api/auth/getuser" <-- Login Required
router.post("/getuser", fetchuser,async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
});

module.exports = router;
