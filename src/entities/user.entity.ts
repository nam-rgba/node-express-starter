import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import z from 'zod'

@Entity()
 export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false
  })
  name!: string

  @Column({
    unique: true,
    nullable: false
  })
  email!: string

  @Column({
    type: 'boolean',
    default: true
  })
  isVerify: boolean = true
}

export const UserQuery = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
})

export const UserCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
})

export const UserParamsSchema = z.object({
    id: z.number().int().min(1, { message: "Invalid user ID" }),
})







