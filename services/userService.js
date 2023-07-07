import User from "../models/usersModel.js";

const signupService = async (userInfo) => {
    const user = await User.create(userInfo)
    return user;

}
const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

const findUserByTokenService = async (token) => {
    return await User.findOne({ confirmationToken: token });
}

export { signupService, findUserByEmail, findUserByTokenService };

