import {pick} from "lodash";
import { Repository } from "typeorm";
import { User } from "~/entities/user.entity.js";
import { UserRepository } from "~/repository/user.repository.js";


export class UserService {

    constructor( repo: UserRepository) {
        this.repo = repo;
    }

    private repo: UserRepository;

    public getAll = async (query: any) => {
        return await this.repo.findAll(query)
    }

    public getById = async (id: number) => {
        const user = await this.repo.findById(id)
        if (!user) throw new Error(`User with id ${id} not found`)
        return user ? pick(user, ['id', 'name', 'email', 'isVerify']) : null
    }

    public getByEmail = async (email: string) => {
        const user = await this.repo.findByEmail(email)
        if (!user) throw new Error(`User with email ${email} not found`)
        return user ? pick(user, ['id', 'name', 'email', 'password', 'isVerify', 'avatar']) : null
    }

    public checkEmailExists = async (email: string) => {
        const user = await this.repo.findByEmail(email)
        return !!user
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

