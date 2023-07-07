import Jwt from "jsonwebtoken";

const generateToken = (userInfo) => {

    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }

    const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7days"
    })
    return token;
}

export { generateToken };

