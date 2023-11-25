import express from 'express'

const SERVER_PORT = 3333
const SERVER_URL = `http://localhost:${SERVER_PORT}`

const server = express()

server.use(express.json())

server.get('/', (_, res) => res.json({ message: 'HELLO WORLD!' }))

server.listen(SERVER_PORT, () => {
  console.log(`===> Server started on ${SERVER_URL}`)
})
