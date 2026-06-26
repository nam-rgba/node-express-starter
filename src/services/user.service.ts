import userRepository from "~/repository/user.repository.js";
import {pick} from "lodash";


class UserService {

    private repo = userRepository;


    public getAll = async (query: any) => {
        return await this.repo.findAll(query)
    }

    public getById = async (id: number) => {
        const user = await this.repo.findById(id)
        if (!user) throw new Error(`User with id ${id} not found`)
        return user ? pick(user, ['id', 'name', 'email', 'isVerify']) : null
    }

    public create = async (user: any) => {
        return await this.repo.create(user)
    }

    public update = async (id: number, user: any) => {
        return await this.repo.update(id, user)
    }

    public delete = async (id: number) => {
        return await this.repo.delete(id)
    }


}

const userService = new UserService();
export default userService;