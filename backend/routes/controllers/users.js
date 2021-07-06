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
      else res.status(200).json({ message: "Not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching email failed", error: err })
    );
};

export const signup = (req, res) => {
  // For signing up new users
  // Recieves username, email and password

  console.log("signing in");
  // Check if user is already in database
  User.find({
    email: req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
  }).then((result) => {
    console.log("email: " + result);
    if (result.length !== 0)
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
      firstname: "",
      lastname: "",
      regnumber: "",
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

export const searchUser = (req, res) => {
  // To search for a user in the database

  // Check is there is a query parameter
  if (!req.body.query)
    return res
      .status(400)
      .json({ message: "Sorry there is no query parameter" });

  user
    .findOne({
      $or: [
        { username: req.body.query.toLowerCase() },
        { regnumber: req.body.query.toLowerCase() },
      ],
    })
    .then((user) => {
      // If the user was not found
      if (!user)
        return res.status(404).json({ message: "Sorry User does not exsist" });

      // User object to be sent to client
      const foundUser = {
        username: user.username,
        email: user.email,
        regnumber: user.regnumber,
        profilePicUrl: user.profilePicUrl,
      };
      res.status(200).json({ message: "User found", user: foundUser });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          message: "Sorry there was a problem quering the user",
          error: err,
        });
    });
};

export const login = (req, res) => {
  // To login already existing users
  // Takes in either username or email and password
  let loggedInUser = new User();
  let errorState = false;

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
      if (!user) {
        errorState = true;
        return res.status(404).json({ message: "User not found" });
      }

      console.log("USER: " + user);
      // if user found
      loggedInUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      // Stop function from continuing when error occured
      if (errorState) return;

      if (!loggedInUser)
        if (!result)
          // If passwords don't match
          return res
            .status(401)
            .json({ message: "Invalid Password or Username/email" });

      console.log("result" + result);

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

      console.log("token: " + token);

      // Send response
      res.status(200).json({
        message: "Logged in successefuly",
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
