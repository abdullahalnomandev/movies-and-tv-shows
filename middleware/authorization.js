import AppError from "../utils/appError.js";

export default (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            next(new AppError("You are not authorized to access this", 403))
        }
        next();
    }


}