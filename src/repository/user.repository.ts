import { DataSource, Repository } from "typeorm";
import z from "zod";
import { User } from "~/entities/user.entity.js";

 export class UserRepository{
    constructor(appDataSource: DataSource) {
        this.repo = appDataSource.getRepository(User)
    }

    private repo: Repository<User>;

    // find all users ==============================================
    public findAll = async(query: z.infer<typeof UserQuery>) =>{
        const { page, limit, search } = query;
        const [users, total] = await this.repo.findAndCount({
            where: search ? { name: z.string().regex(new RegExp(search, 'i')).parse(search) } : {},
            skip: (page - 1) * limit,
            take: limit,
        });
        return { users, total };
    }

    // find user by id ==============================================
    public findById = async(id: number) =>{
        return await this.repo.findOneBy({ id });
    }


    // find by email ===============================================
    public findByEmail = async (email: string) =>{
        return await this.repo.findOneBy({email})
    }

    // create new user ==============================================
    public create = async(user: Partial<User>) =>{
        const newUser = this.repo.create(user);
        return await this.repo.save(newUser);
    }

    // update user by id ==============================================
    public update = async(id: number, user: Partial<User>) =>{
        await this.repo.update(id, user);
        return await this.repo.findOneBy({ id });
    }

    // delete user by id ==============================================
    public delete = async(id: number) =>{
        return await this.repo.delete(id);
    }

}


export const UserQuery = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
})