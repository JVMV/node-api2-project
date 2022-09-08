// implement your server here
// require your posts router and connect it here
const express = require('express')
const postsRouter = require('./posts/posts-router.js')

const server = express()

server.listen(9000, () => console.log(`listening on port 9000`))

server.use(express.json())
server.use(postsRouter)


server.use('/api/posts', postsRouter)
