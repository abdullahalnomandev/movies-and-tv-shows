import Jwt from "jsonwebtoken";

const generateToken = (userInfo) => {

    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }

    const token = Jwt.sign(payload, 'e4454', {
        expiresIn: "90days"
    })
    return token;
}

export default generateToken

