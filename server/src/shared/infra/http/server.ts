import express from 'express'

import { appRoutes } from './routes/index.routes'

const SERVER_PORT = 3333
const SERVER_URL = `http://localhost:${SERVER_PORT}`

const app = express()

app.use(express.json())

app.use('/v1', appRoutes)

app.listen(SERVER_PORT, () => {
  console.log(`===> Server running on ${SERVER_URL}`)
})
