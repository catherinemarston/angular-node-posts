const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //multer allows us to extract incoming files
        //storage tells multer where to store these files
        //the path in the callball is relative to server.js file
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('image is invalid');
        if (isValid) {
            error = null
        };
        cb(error, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})

router.post('', multer({storage: storage}).single('image'),(req, res, next) => {
        //constructs url
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
    });
    //will create a new post entry which is called a document
    // then the document is saved in a collection which is the plural name of the associated model
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post created successfully',
            post: {
                id: createdPost._id,
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            }
        });
    });
});

router.patch('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
    console.log(req.params.id);
    let imagePath = req.body.imagePath;
    if(req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename

    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    console.log(post);
    Post.updateOne({
        _id: req.params.id
    }, post).then(result => {
        res.status(200).json({
            message: 'post updated successfully!',
        })
    })
})

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'posts fetched successfully!',
            posts: documents
        });
    });
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json({
          post: post,
          message: 'success'
        });
      } else {
        res.status(404).json({ message: 'post was not found'})
      }
    })
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            message: 'post deleted'
        });
    })
});

module.exports = router;