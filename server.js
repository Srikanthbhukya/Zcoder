require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const qnaRoutes = require('./routes/qna')
const commentsRoute = require('./routes/comments')
const profileRoutes=require('./routes/profile')


// express app
const app = express();


// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/comments', commentsRoute);
app.use('/api/qna', qnaRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile',profileRoutes);



// connected to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listens for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch(err => console.log(err));