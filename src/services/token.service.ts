import { Token } from '~/entities/token.entity.js'
import { TokenRepository } from '~/repository/token.repository.js'


export class SessionService {

	constructor(sessionRepo: TokenRepository) {
		this.repo = sessionRepo
	}

	private repo: TokenRepository;

	async upsertSession(payload: {
		userId: number
		accessKey: string
		refreshKey: string
		refreshToken: string
	}): Promise<Token | null> {
		return await this.repo.createOrUpdateToken(payload)
	}

	async getAccessKey(userId: number): Promise<string | null> {
		return await this.repo.findAccessKey(userId)
	}

	async removeSession(userId: number): Promise<number> {
		return await this.repo.removeKey(userId)
	}
}