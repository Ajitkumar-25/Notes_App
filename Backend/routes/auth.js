const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user using: POST "/api/auth/createuser". No login Required

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

    //check wheater the user with this email  exits already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return resp
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      resp.json(user);
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

module.exports = router;
