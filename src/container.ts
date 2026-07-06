import { AppDataSource } from "./data-source.js";
import { OtpRepository } from "./repository/otp.repository.js";
import { TokenRepository } from "./repository/token.repository.js";
import { UserRepository } from "./repository/user.repository.js";
import { AuthService } from "./services/auth.service.js";
import { OTPService } from "./services/otp.service.js";
import { SessionService } from "./services/token.service.js";
import { UserService } from "./services/user.service.js";

// for singleton pattern

// OTP
const OTPRepo = new OtpRepository(AppDataSource);
export const OtpService = new OTPService(OTPRepo);

// user
const userRepo = new UserRepository(AppDataSource);
export const userService = new UserService(userRepo);

// auth
export const authService = new AuthService();

// session
const tokenRepo = new TokenRepository(AppDataSource);
export const sessionService = new SessionService(tokenRepo);