const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

//Routes
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();


//you may need to reset the ip address on the cluster if you're unable to connect
mongoose.connect("mongodb+srv://cathy:JAVviVteUUWDQxne@postsappcluster-yfbst.mongodb.net/node-angular?retryWrites=true", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to mongoose');
    })
    .catch(() => {
      'connection failed - should look if IP address is correct';
    });

app.use((req, res, next) => {
    console.log('app is running');
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/images', express.static(path.join('backend/images')));
//only apply to any requests with images, this static middleware will allow any request to access these files
//path forwards to backend images file

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
