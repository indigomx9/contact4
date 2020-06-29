import { Contact } from "../models/Contact";
import { validationResult } from "express-validator";

export const CreateContact = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });
        const contact = await newContact.save().res.json(contact);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const contacts = await Contact.find(
            { user: req.user.id }
            ).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};

export const UpdateContact = async (req, res, next) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {};  // Build contact object.
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404)
            .json({ msg: "Contact not found!" });
        if (contact.user.toString() !== req.user.id) {
            return res.status(401)
                .json({ msg: "Not Authorized!" });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};

export const DeleteContact = async (req, res, next) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404)
            .json({ msg: "Contact not found" });
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized!" });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact Removed!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
        next(error);
    }
};


