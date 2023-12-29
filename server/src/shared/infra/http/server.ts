import 'reflect-metadata'

import express from 'express'
import cors from 'cors'

import { AVAILABLE_CORS_ORIGIN, SERVER_PORT, SERVER_URL } from '@utils/constants'
import { appRoutes } from './routes/index.routes'

import '../../container'

const app = express()

app.use(cors({ origin: AVAILABLE_CORS_ORIGIN }))
app.use(express.json())

app.use('/v1', appRoutes)

app.listen(SERVER_PORT, () => {
  console.log(`===> Server running on ${SERVER_URL}`)
})
