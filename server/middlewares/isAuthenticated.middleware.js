import Jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";

export const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return customError(401, res, "Invalid token");
  }

  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
