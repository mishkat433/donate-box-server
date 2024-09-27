"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contact_interface_1 = require("./contact.interface");
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is missing"]
    },
    email: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is missing"]
    },
    subject: {
        type: String,
        required: [true, "Subject is missing"]
    },
    message: {
        type: String,
        required: [true, "message is missing"]
    },
    resolverId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: contact_interface_1.CONTACT_STATUS,
        default: contact_interface_1.CONTACT_STATUS.PENDING,
    },
    resolverMessage: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
