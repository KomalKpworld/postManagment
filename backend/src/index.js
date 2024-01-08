require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute')

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/postCollection", { useNewUrlParser: true })
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/user', userRoute);
app.use('/post', postRoute);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});