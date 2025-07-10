"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const rateLimiter_middleware_1 = require("./middlewares/rateLimiter.middleware");
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Rate limiting
app.use('/api/messages', rateLimiter_middleware_1.messageRateLimit);
// Routes
app.use('/api/messages', message_route_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: { message: 'Route not found' } });
});
// Error handler middleware (must be last)
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
