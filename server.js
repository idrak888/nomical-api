const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Post} = require('./db/Post');
const {mongoose} = require('./db/mongoose');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('Hello world');
});

app.get('/posts', (req, res) => {
	Post.find().sort({postNumber: -1}).then(posts => {
        res.send(posts);
    }).catch(e => {
		res.send(e);
	});
});

app.post("/posts", (req, res) => {
	var NewPost = new Post({
		writer: req.body.writer,
		dateCreated: req.body.date,
		title: req.body.title,
		subtitle: req.body.subtitle,
		content: req.body.content,
		postNumber: req.body.postNumber,
		mainImg: req.body.mainImg
	});

	NewPost.save().then((doc) => {
		res.send(doc);
	});
});

app.get('/posts/:limit', (req, res) => {
	var limit = JSON.parse(req.params.limit);

	Post.find().sort({postNumber: -1}).limit(limit).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.get('/post/:id', (req, res) => {
	var _id = req.params.id;

	Post.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/posts", (req, res) => {
	Post.remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/posts/:id", (req, res) => {
	var _id = req.params.id;

	Post.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
