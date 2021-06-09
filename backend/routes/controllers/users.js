import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import user from "../../models/user.js";
import User from "../../models/user.js";

export const getUsernames = (req, res) => {
  // Returns a list of all the usernames
  User.find()
    .then((users) => {
      res.status(200).json({ usernames: users.map((user) => user.username) });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching usernames failed", error: err })
    );
};

export const getEmail = (req, res) => {
  // to check if an email is in the db or not
  // takes in email

  User.find({ email: req.body.email.toLowerCase() })
    .then((email) => {
      if (email.length !== 0) return res.status(200).json({ message: "Found" });
      else res.json({ message: "Not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching email failed", error: err })
    );
};

export const signup = (req, res) => {
  // For signing up new users
  // Recieves username, email and password

  // Check if user is already in database
  User.find({
    email: req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
  }).then((email) => {
    if (email.length !== 0 || username.length !== 0)
      return res
        .status(400)
        .json({ message: "Sorry email or username already exists" });
  });

  // Encrypypts the password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // Create a new user with the information provided
    // and hashed password
    const user = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Sorry creating user failed",
          error: err,
        });
      });
  });
};

export const login = (req, res) => {
  // To login already existing users
  // Takes in either username or email and password
  let loggedInUser = new User();

  // if request doesn't come with password
  if (!req.body.password)
    return res.status(400).json({ message: "Put full login details" });

  user
    .findOne({
      $or: [
        { username: req.body.username.toLowerCase() },
        { email: req.body.email.toLowerCase() },
      ],
    })
    .then((user) => {
      // if user is not found
      if (!user) return res.status(404).json({ message: "user not found" });
      // if user found
      loggedInUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      // If passwords don't match
      if (!result)
        return res
          .status(401)
          .json({ message: "Invalid Password or Username/email" });

      // If passwords match
      // Create jwt token
      const token = jwt.sign(
        {
          email: loggedInUser.email,
          username: loggedInUser.name,
          userId: loggedInUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      // Send response
      res.status(200).json({
        message: "logged in successefuly",
        token: token,
        expiresIn: 3600,
        userId: loggedInUser._id,
      });
    })
    .catch((err) => {
      console.log(err),
        res
          .status(500)
          .json({ message: "Sorry logging in unsuccesseful", error: err });
    });
};
