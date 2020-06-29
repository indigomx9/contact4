import express from "express";
import { AuthFunc } from "../middleware/AuthFunc";
import { getUserLogin, postUserLogin } from "../controllers/authCon";
import { check } from "express-validator";

export const authRt = express.Router();
    authRt.get("/", AuthFunc, getUserLogin);
    authRt.post("/", [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ], postUserLogin);


    