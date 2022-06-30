const express = require('express');
const app = express();
const { port } = require('./config/index');
const connection = require('./database/index');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const { errorHandler } = require('./middleware/ErrorHandler');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connection();

app.use('/users', userRouter);
app.use(commentRouter);
app.use('/posts', postRouter);

app.use(errorHandler);

// server
app.listen(port, () => {
    console.log('Server is running');
});
