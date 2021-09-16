import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // checks the token in the header then continues
  try {
    if (!req.headers.authorization)
      return res.status(401).send({ message: "No Authorization header" });

    // recieves "Bearer token", so split to get token
    const token = req.headers.authorization.split(" ")[1];

    if (token === undefined)
      return res.status(401).send({ message: "No Token" });

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
    next();
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json({ message: "Sorry you are not authenticated", error: err });
  }
};
