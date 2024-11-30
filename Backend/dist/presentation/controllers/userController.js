"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const messages_1 = require("../../constants/messages");
const statusCode_1 = require("../../constants/statusCode");
class UserController {
    constructor(UserUseCase) {
        this.UserUseCase = UserUseCase;
    }
    /*...............................signup...............................*/
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserUseCase.registrationUser(req.body);
                if (result.status)
                    return res.status(statusCode_1.ENUM.OK).json({ success: true, message: messages_1.REGISTRATION.OTP_SENT });
                else
                    return res.json({ success: false, message: result.message });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
