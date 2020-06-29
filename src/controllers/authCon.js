import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config/keys";
import { validationResult } from "express-validator";

export const getUserLogin = async (req, res, next) => {
    try {
        // We don't want to return the password.
        const user = await (User.findById(req.user.id))
            .select("-password");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};

export const postUserLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const payload = {
            user: { id: user.id }
        };

        jwt.sign(
            payload,
            config.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};

