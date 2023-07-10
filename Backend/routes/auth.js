const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../Middleware/fetchuser");

const JWT_SECRET = "Ajit Kumar is a studious person";

// Route 2 : create a user using: POST "/api/auth/createuser". No login Required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, resp) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    try {
      //check wheater the user with this email  exits already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return resp
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //create a new user
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);
      resp.json({ authtoken });

      // resp.json(user);
    } catch (error) {
      //catch errors
      console.error(error.message);
      resp.status(500).send("Some error occured");
    }

    //   .then((user) => resp.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     resp.json({ error: "Please enter a unique value for email", err });
    //   });
  }
);

// Route 2: authenticate a user using: POST "/api/auth/login". No login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, resp) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //   console.log(user);
      if (!user) {
        return resp
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return resp
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      resp.send({authtoken});
    } catch (error) {
      console.error(error.message);
      resp.status(500).send("Internal Server Error");
    }
  }
);



// Route 3: Get logged in Details using: POST "/api/auth/getuser". login Required
router.post("/getuser", fetchuser, async (req, resp) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    resp.send(user);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
});
module.exports = router;
