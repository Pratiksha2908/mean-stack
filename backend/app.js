const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Pratu:Xx448dXaebaVhhLs@cluster0-seeqz.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to Database!');
})
.catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader ("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Headers","Origin, X-Requested-With, Content-type, accept");
  res.setHeader("Access-control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//Xx448dXaebaVhhLs

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message : "Posts fetched successfully!",
      posts : documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message : "Post Deleted!"
    });
  });
});

module.exports = app;
