import { OTP } from "~/entities/otp.entity.js";
import { OtpRepository } from "~/repository/otp.repository.js";


export class OTPService {

    constructor(otpRepo: OtpRepository) {
        this.otpRepo = otpRepo;
    }
    private otpRepo: OtpRepository;

    // create new otp ==============================================
    public createOtp = async (otp: Partial<OTP>) => {
        return await this.otpRepo.create(otp);
    }

    // find otp by token ==============================================
    public findByToken = async (token: string) => {
        return await this.otpRepo.findByToken(token);
    }

    // find otp by email ==============================================
    public findByEmail = async (email: string) => {
        return await this.otpRepo.findByEmail(email);
    }

    // delete otp by token ==============================================
    public deleteByToken = async (token: string) => {
        return await this.otpRepo.deleteByToken(token);
    }

    
}