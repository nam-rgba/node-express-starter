import { DataSource, Repository } from "typeorm";
import { OTP } from "~/entities/otp.entity.js";


export class OtpRepository {
    constructor(appDataSource: DataSource) {
        this.repo = appDataSource.getRepository(OTP)
    }

    private repo: Repository<OTP>;

    // create new otp ==============================================
    public create = async(otp: Partial<OTP>) =>{
        const newOtp = this.repo.create(otp);
        return await this.repo.save(newOtp);
    }

    // find otp by token ==============================================
    public findByToken = async (token: string) =>{
        return await this.repo.findOneBy({token})
    }

    // find otp by email ==============================================
    public findByEmail = async (email: string) =>{
        return await this.repo.findOneBy({email})
    }

    // delete otp by token ==============================================
    public deleteByToken = async (token: string) =>{
        return await this.repo.delete({token})
    }

}

