import { findUserByEmail, findUserByTokenService, signupService } from "../services/userService.js";
import { sendMailWIthEmail } from "../utils/email.js";
import { generateToken } from "../utils/token.js";
import AppError from './../utils/appError.js';


const signUp = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });

    const mailData = {
      to: user.email,
      subject: "Verify your account",
      text: token,
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${token}`
    }

    sendMailWIthEmail(mailData)
    // transaction ==> form multiple items mongodb
    res.status(201).json({
      status: "success",
      message: "Successfully signed up"
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. If not user send res
 * 4. compare password
 * 5. If password not correct send res
 * 6. Check if user is active
 * 7. If not active send res
 * 8. Generate token
 * 9. send user and token
*/

const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credentials"
      })
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found. Please create an account"
      })
    }

    const isPasswordValid = user.comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "Password is not correct"
      })
    }

    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
        message: "Your account is not activated"
      })

    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(201).json({
      status: "success",
      data: {
        user: others,
        token
      }
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

};


const getMe = async (req, res, next) => {
  try {

    const user = await findUserByEmail(req.user?.email)
    res.status(200).json({
      status: 'success',
      data: user
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

}

const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await findUserByTokenService(token);
    if (!user) {
      return res.status(403).send({
        status: 'fail',
        error: "Invalid token"
      })
    }
    const expired = new Date() > new Date(user.confirmationTokenExpires);
    if (expired) {
      return res.status(401).json({
        status: 'fail',
        error: "Token expired"
      })
    }
    user.status = 'active';
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;
    user.save({ validateBeforeSave: false })

    res.status(200).json({
      status: 'success',
      message: "Successfully activated your account."
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

}
export { signUp, login, getMe, confirmEmail };

