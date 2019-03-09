const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const client = await mongodb.MongoClient.connect('mongodb+srv://sergey_admin_22:5VAs8wkFx5fXTrr@cluster0-whxsz.gcp.mongodb.net/vue_express?retryWrites=true', {
    useNewUrlParser: true
});
// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/:text', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.params.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    

    return client.db('vue_express').collection('posts');
}


module.exports = router;