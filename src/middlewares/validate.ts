import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { BadRequestError } from '../utils/error.res.js'

interface ValidationInput {
	body?: z.ZodObject<any, any>;
	query?: z.ZodObject<any, any>;
	params?: z.ZodObject<any, any>;
}

export function validate({ body, query, params }: ValidationInput) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (body) {
			const result = body.safeParse(req.body)
			if (!result.success) {
				throw new BadRequestError(`${result.error.issues.map((i) => i.message).join(', ')}`)
			}
			req.body = result.data
		}

		if (query) {
			const result = query.safeParse(req.query)
			if (!result.success) {
				throw new BadRequestError(`${result.error.issues.map((i) => i.message).join(', ')}`)
			}
			console.log(result)
			req.query = result.data as any
		}

		if (params) {
			const result = params.safeParse(req.params)
			if (!result.success) {
				throw new BadRequestError(`${result.error.issues.map((i) => i.message).join(', ')}`)
			}
			req.params = result.data as any
		}

		next()
	}
}
	