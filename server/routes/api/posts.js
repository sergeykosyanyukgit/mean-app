const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
let client;
let connect = false;


//Esp32S Server
router.post('/esp/', async (req, res) => {
    const posts = await loadPostsCollection('esp');
    await posts.insertOne({
        text: req.body.text,
        type: req.body.type
    });
    res.status(201).send();
});

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(collect){
    if(!connect) {
        client = await mongodb.MongoClient.connect('mongodb+srv://sergey_admin_22:5VAs8wkFx5fXTrr@cluster0-whxsz.gcp.mongodb.net/vue_express?retryWrites=true', {
            useNewUrlParser: true
        });
        connect = true;
    }

    return client.db('vue_express').collection(collect);
}


module.exports = router;