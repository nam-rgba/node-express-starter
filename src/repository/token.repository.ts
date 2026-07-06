import { DataSource, Repository } from 'typeorm'
import { Token } from '~/entities/token.entity.js'

interface ITokenPayload {
	userId: number
	accessKey: string
	refreshKey: string
	refreshToken: string
}

export class TokenRepository {

    constructor(appDataSource: DataSource) {
        this.repo = appDataSource.getRepository(Token)
    }
	private repo : Repository<Token>

	async createOrUpdateToken({ userId, accessKey, refreshKey, refreshToken }: ITokenPayload): Promise<Token | null> {
		try {
			// Kiểm tra session cũ
			const existing = await this.repo.findOneBy({ userId })

			if (existing) {
				existing.accessKey = accessKey
				existing.refreshKey = refreshKey
				existing.refreshToken = refreshToken
				return await this.repo.save(existing)
			}

			const newToken = this.repo.create({ userId, accessKey, refreshKey, refreshToken })
			return await this.repo.save(newToken)
		} catch (error) {
			console.error('Error creating new token:', error)
			throw new Error('Failed to create new token')
		}
	}

	async findAccessKey(userId: number): Promise<string | null> {
		const session = await this.repo.findOne({
			where: { userId },
			select: {
                accessKey: true
            }
		})
		return session?.accessKey ?? null
	}

	async removeKey(userId: number): Promise<number> {
		const result = await this.repo.delete({ userId })
		return result.affected ?? 0
	}
}