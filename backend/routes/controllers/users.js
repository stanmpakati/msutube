import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

// ------------------------------------------------GetUsernames----------------------------------------------
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

// ---------------------------------------search email----------------------------------------
export const getEmail = (req, res) => {
  // to check if an email is in the db or not
  // takes in email

  User.find({
    $or: [
      { email: req.body.email.toLowerCase() },
      { username: req.body.email.toLowerCase() },
    ],
  })
    .then((email) => {
      console.log(email);
      if (email.length !== 0) return res.status(200).json({ message: "Found" });
      else res.status(200).json({ message: "Not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching email failed", error: err })
    );
};

// --------------------------------------------------Search User--------------------------------------
export const searchUser = (req, res) => {
  // To search for a user in the database
  console.log(req.body.query);

  // Check is there is a query parameter
  if (!req.body.query)
    return res
      .status(400)
      .json({ message: "Sorry there is no query parameter" });

  User.findOne({
    $or: [
      { username: req.body.query.toLowerCase() },
      { regnumber: req.body.query.toLowerCase() },
      { _id: req.body.query },
    ],
  })
    .then((user) => {
      // If the user was not found
      if (!user)
        return res.status(404).json({ message: "Sorry User does not exist" });

      // User object to be sent to client
      res.status(200).json({ message: "User found", user: user });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          message: "Sorry there was a problem quering the user",
          error: err,
        });
    });
};

// ---------------------------------------------Sign Up-------------------------------------------
export const signup = (req, res) => {
  // For signing up new users
  // Recieves username, email and password
  let carryOn = true;
  let formData = { ...req.body };
  const url = req.protocol + "://" + req.get("host");

  const ppPath = `${url}/${req.file.path}`;

  // Ensure all strings are lowercase
  formData = Object.assign(
    ...Object.keys(formData).map((key) => {
      if (
        typeof formData[key] === "string" &&
        key != "bio" &&
        key != "password"
      ) {
        return { [key]: formData[key].toLowerCase() };
      }
      return { [key]: formData[key] };
    })
  );

  // Check if formdata has all the required fields
  if (!formData.username || !formData.email || !formData.password)
    return res
      .status(400)
      .json({ message: "Sorry incomplete details, try again", reset: true });

  // Check if user is already in database
  User.find({
    email: formData.email.toLowerCase(),
    username: formData.username.toLowerCase(),
  })
    .then((result) => {
      if (result.length !== 0) {
        carryOn = false;
        return res
          .status(400)
          .json({ message: "Sorry email or username already exists" });
      }
    })
    .then(() => {
      if (!carryOn) return;

      // Encrypypts the password
      bcrypt.hash(formData.password, 10).then((hash) => {
        // Create a new user with the information provided
        // and hashed password
        const user = new User({
          ...formData,
          name: {
            first: formData.firstname,
            last: formData.lastname,
          },
          location: {
            city: formData.city,
            country: formData.country,
          },
          password: hash,
          profilePicUrl: ppPath,
        });

        console.log(user);

        // Save user
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "User Created",
              result: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Sorry creating user failed",
              error: err,
            });
          });
      });
    });
};

// --------------------------------------------------Login---------------------------------------
export const login = (req, res) => {
  // To login already existing users
  // Takes in either username or email and password
  let loggedInUser = new User();
  let errorState = false;

  // if request doesn't come with password
  if (!req.body.password)
    return res.status(400).json({ message: "Put full login details" });

  User.findOne({
    $or: [
      { username: req.body.username.toLowerCase() },
      { email: req.body.email.toLowerCase() },
    ],
  })
    .select("+password")
    .then((user) => {
      // if user is not found
      if (!user) {
        errorState = true;
        return res.status(404).json({ message: "User not found" });
      }
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

      // If passwords match
      // Create jwt token
      const token = jwt.sign(
        {
          email: loggedInUser.email,
          username: loggedInUser.username,
          userId: loggedInUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      // Send response
      res.status(200).json({
        message: "Logged in successefuly",
        token: token,
        expiresIn: 3600,
        userId: loggedInUser._id,
        user: {
          email: loggedInUser.email,
          username: loggedInUser.username,
          userId: loggedInUser._id,
          profilePicUrl: loggedInUser.profilePicUrl,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res
          .status(500)
          .json({ message: "Invalid Password or Username/email", error: err });
    });
};
