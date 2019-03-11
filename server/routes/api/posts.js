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
router.get('/esp/', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    res.send(await posts.find({}).toArray());
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
        prior: req.body.bufferTask.prior,
        time: `${req.body.bufferTask.time}/${req.body.bufferTask.date}`,
        textTask: req.body.bufferTask.textTask,
        sensor: req.body.bufferTask.sensor,
        motor: req.body.bufferTask.motor,
        poliv: req.body.bufferTask.poliv,
        sensorValue: 'Null'
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Delete Post
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    await posts.findOneAndUpdate({_id: new mongodb.ObjectID(req.params.id)}, {$set:{poliv:req.body.update}});
    res.status(200).send();
});

router.post('/esp-reload-hum/', async (req, res) => {
    const posts = await loadPostsCollection('posts');
    await posts.findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set:{sensorValue:req.body.sensorValue}});
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