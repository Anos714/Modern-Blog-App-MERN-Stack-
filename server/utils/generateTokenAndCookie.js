import Jwt from "jsonwebtoken";
export const generateTokenAndCookie = (statusCode, res, user, msg) => {
  const accessToken = Jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(statusCode).json({
    success: true,
    msg,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
