const express = require('express');
const app = express();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
}
mongoose.connect(process.env.DATABASE_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));


app.use(express.json())

const standardQuestionsRouter = require('./routes/standardQuestions');
app.use('/standard', standardQuestionsRouter);

const universalQuestionsRouter = require('./routes/universalQuestions');
app.use('/universal', universalQuestionsRouter);

app.listen(3000, () => console.log('Server Started'));
