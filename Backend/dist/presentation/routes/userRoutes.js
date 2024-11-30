"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepository_1 = require("../../infrastructure/repositories/userRepository");
const userUsecases_1 = require("../../usecases/userUsecases");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
const userRepository = new userRepository_1.UserRepository();
const userUsecase = new userUsecases_1.UserUseCase(userRepository);
const controller = new userController_1.UserController(userUsecase);
userRouter.post('/signup', (req, res, next) => { controller.createUser(req, res, next); });
exports.default = userRouter;
