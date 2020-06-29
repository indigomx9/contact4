import jwt from "jsonwebtoken";
import { config } from "../config/keys";

export const AuthFunc = (req, res, next) => {
    // Get the token from the Header.
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401)
            .json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is NOT valid!" });
        next(error);
    }
};


