import express from "express";
import { UserRegister } from "../controllers/userCon";
import { check } from "express-validator";

export const userRt = express.Router();
    userRt.post("/", [
        check("name", "Please add the Name").not().isEmpty(),
        check("email", "Please include a valid Email").isEmail(),
        check("password", "Password must have at least 6").isLength({ min: 6 }),
    ], UserRegister);



    