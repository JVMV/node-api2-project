// implement your posts router here
const express = require('express')

const Posts = require('./posts-model')

const router = express.Router()

router.get('/api/posts', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

router.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    const post = await Posts.findById(id)
    try {
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(post)
        }
    } catch(err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

router.post('/api/posts', async (req, res) => {
    const { title, contents } = req.body
    const newPost = await Posts.insert(req.body)
    try {
        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            res.status(200).json(newPost)
        }
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

router.put('/api/posts/:id', async () => {
    const { id } = req.params
    const { title, contents } = req.body
    const updateedPost = await Posts.update(id, req.body)
    try {
        if(!updateedPost) {
            if(!title || !contents) {
                res.status(400).json({ message: "Please provide title and contents for the post" })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        } else {
            res.status(200).json(updateedPost)
        }
    } catch(err) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})






module.exports = router