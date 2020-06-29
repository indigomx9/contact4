import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { userRt } from "./routes/userRt";
import { authRt } from "./routes/authRt";
import { contactsRt } from "./routes/contactsRt";
import { config } from "./config/keys";
import { notFoundError, errorHandler } from "./middleware/ErrorMiddleware";

(async () => {
    const app = express();
    app.use(helmet());
    await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true })
        .then(() => console.log("MongoDB is now connected!"))
        .catch((err) => console.log(err));
    
    // CORS Setup.
    app.use((req, res,next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({ "status message": "OK" });
        }
        next();
    });

    // Routes and Middleware.
    app.use(morgan("dev"));
    app.use(express.json());
    app.use("/api/users", userRt);
    app.use("/api/auth", authRt);
    app.use("/api/contacts", contactsRt);
    app.use(notFoundError, errorHandler);

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();


