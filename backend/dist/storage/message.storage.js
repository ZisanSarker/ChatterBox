"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageStorage = void 0;
const uuid_1 = require("uuid");
class MessageStorage {
    constructor() {
        this.messages = [];
    }
    addMessage(username, text) {
        const message = {
            id: (0, uuid_1.v4)(),
            username,
            text,
            createdAt: new Date().toISOString()
        };
        this.messages.push(message);
        return message;
    }
    getMessages() {
        return [...this.messages];
    }
    clearMessages() {
        this.messages = [];
    }
    getMessageCount() {
        return this.messages.length;
    }
}
exports.messageStorage = new MessageStorage();
