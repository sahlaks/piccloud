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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const messages_1 = require("../constants/messages");
const temporaryModel_1 = __importDefault(require("../infrastructure/models/temporaryModel"));
const hashPassword_1 = require("../infrastructure/services/hashPassword");
const mailService_1 = require("../infrastructure/services/mailService");
const otpGenerator_1 = require("../infrastructure/services/otpGenerator");
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    registrationUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, mobile, password } = data;
            console.log(email, mobile, password);
            try {
                //check already existing or not
                const existingUser = yield this.userRepository.findUserByEmail(email);
                console.log(existingUser);
                if (existingUser)
                    return { status: false, message: messages_1.REGISTRATION.USER_EXISTS };
                const otp = (0, otpGenerator_1.generateOTP)();
                console.log(otp);
                password = yield (0, hashPassword_1.generatePassword)(password);
                console.log(password);
                const userData = {
                    email,
                    mobile,
                    password,
                };
                const saved = yield this.userRepository.saveUser(userData);
                const tempUSer = new temporaryModel_1.default({ email, mobile, password, otp });
                yield tempUSer.save();
                const mailOptions = {
                    email,
                    subject: 'OTP for verification',
                    code: otp,
                };
                yield (0, mailService_1.sendEmail)(mailOptions);
                return { status: true, message: messages_1.REGISTRATION.OTP_SENT };
            }
            catch (error) {
                return {
                    status: false,
                    message: messages_1.REGISTRATION.ERROR,
                };
            }
        });
    }
}
exports.UserUseCase = UserUseCase;
