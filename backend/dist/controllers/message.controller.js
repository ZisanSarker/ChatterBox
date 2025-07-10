"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageStats = exports.getMessages = void 0;
const message_storage_1 = require("../storage/message.storage");
const getMessages = async (req, res, next) => {
    try {
        const messages = message_storage_1.messageStorage.getMessages();
        res.json(messages);
    }
    catch (error) {
        next(error);
    }
};
exports.getMessages = getMessages;
const getMessageStats = async (req, res, next) => {
    try {
        const stats = {
            messageCount: message_storage_1.messageStorage.getMessageCount(),
            timestamp: new Date().toISOString()
        };
        res.json(stats);
    }
    catch (error) {
        next(error);
    }
};
exports.getMessageStats = getMessageStats;
