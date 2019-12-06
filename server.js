const express = require('express');
const app = express();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
}
mongoose.connect(process.env.DATABASE_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));


app.use(express.json())

const questionsRouter = require('./routes/questions');
app.use('/questions', questionsRouter);

app.listen(3000, () => console.log('Server Started'));
