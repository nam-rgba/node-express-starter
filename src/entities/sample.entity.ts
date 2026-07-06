import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import z from 'zod'

@Entity()
 export class Sample {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false
  })
  name!: string

  @Column()
  image?: string

  @Column({
    unique: true,
    nullable: false
  })
  description!: string

  @Column({
    type: 'boolean',
    default: true
  })
  isVerify: boolean = true
}

export const SampleQuery = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
})

export const SampleCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
})

export const SampleParamsSchema = z.object({
    id: z.number().int().min(1, { message: "Invalid sample ID" }),
})







