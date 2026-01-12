import { customError } from "../utils/customError";

export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.userInfo;

    if (role !== "admin") {
      return customError(
        401,
        res,
        "Unauthorized access, Admin rights required"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
