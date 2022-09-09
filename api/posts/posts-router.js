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
    const newPost = req.body
    const { title, contents } = newPost
    try {
        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            const createdPostId = await Posts.insert(newPost)
            const createdPost = {...newPost, ...createdPostId}
            res.status(201).json(createdPost)
        }
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

router.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    const postUpdate = req.body
    const { title, contents } = postUpdate
    try {
        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            const TruthyFalsy = await Posts.update(id, postUpdate)
            if(TruthyFalsy === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
                newPostId = {id: Number(id)}
                newPost = {...postUpdate, ...newPostId}
                res.status(200).json(newPost)
            }
        }
    } catch(err) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    const postToDelete = await Posts.findById(id) 
    const deletedPostId = await Posts.remove(id)
    try {
        if(!deletedPostId) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(postToDelete)
        }
    } catch(err) {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

router.get('/api/posts/:id/comments', async (req, res) => {
    const { id } = req.params
    const post = await Posts.findCommentById(id)
    try {
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(post)
        }
    } catch(err) {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})






module.exports = router