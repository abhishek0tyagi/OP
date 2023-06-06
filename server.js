// Keep this at the top of the first file loaded in your app
// require('dotenv').config();

// till here

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
// const config = require('config');

const Port = 8001;
const cors = require('cors');
const formData = require('express-form-data');

app.use(cors());
app.use(express.static(`${process.cwd()}/images`));
app.use('/images', express.static(`${process.cwd()}/images`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(formData.parse());

mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// mongoose.connect(process.env.MONGOURL, mongoOptions).then(() => {
//     console.log('mongoDb connected!');
//     app.emit('mongoConnected');
// })
//     .catch((err) => {
//         console.log('Mongo Error', err);
//     });

// app.get('/load-test', (req, res) => {
//     res.send({ message: 'Loaded' });
// });
app.use('/api/auth', userRoutes);

// Error middleware
app.use((err, req, res, next) => {
    if (['production', 'staging'].includes(process.env.NODE_ENV)) {
        apm.captureError(err);
    }
    console.error('Error in app', err);
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something Went Wrong';
    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status_code: errorStatus,
        debug: err.stack,
    });
});


app.listen(Port, console.log(`Server is running on port ${Port}`));
