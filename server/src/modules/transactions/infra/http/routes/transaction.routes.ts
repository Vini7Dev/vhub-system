import { Router } from 'express'

export const transactionRoutes = Router()

transactionRoutes.get('/', (_, res) => res.json({ message: 'HELLO WORLD!' }))
