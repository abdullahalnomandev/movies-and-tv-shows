import Jwt from "jsonwebtoken";
import { promisify } from "util";
/**
 * 1.Check if token exists
 * 2. If not token send res
 * 3. decode the token
 * 4. If valid t next
 */

export default async (req, res, next) => {
  try {

    const token = req.headers?.authorization.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in"
      })
    }

    const decoded = await promisify(Jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;
    // const User = User.findOne({email:decoded.email})
    next();

  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      error: "invalid token"
    })
  }

}