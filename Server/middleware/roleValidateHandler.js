//Models
import UserRole from "../enums/UserRole.js";

//middleware for admin
export const isAdmin = (req, res, next) => {
    if (req.user.roleId != UserRole.ADMIN) {
        return res.status(401).send({ message: "Unauthorized Access! " });
    }
    next();
}

//middleware for user
export const isUser = (req, res, next) => {
    if (req.user.roleId != UserRole.POSTER) {
        return res.status(401).send({ message: "Unauthorized Access!" });
    }
    next();
}
