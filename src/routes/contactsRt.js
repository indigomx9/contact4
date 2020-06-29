import express from "express";
import { AuthFunc } from "../middleware/AuthFunc";
import { check } from "express-validator";
import { CreateContact, getOneContact, UpdateContact, 
    DeleteContact } from "../controllers/contactsCon";

export const contactsRt = express.Router();
    contactsRt.post("/", [AuthFunc, 
        [check("name", "Name is required").not()
            .isEmpty()]], CreateContact);
    contactsRt.get("/", AuthFunc, getOneContact);
    contactsRt.patch("/:id", AuthFunc, UpdateContact);
    contactsRt.delete("/:id", AuthFunc, DeleteContact);


