import express from 'express';
import env from 'dotenv';
import init_DB from './entities/init_db.js';
import create_DB_router from './routes/create_db_router.js';
import student_router from './routes/student_router.js';
import cors from 'cors';
import note_router from './routes/note_router.js';
import tag_router from './routes/tag_router.js'
import subject_router from './routes/subject_router.js'
import study_group_router from './routes/study_group_router.js'
import errorHandler from './middleware/error_handler.js';

env.config()

let app = express();
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE'
  };
app.use(cors(corsOptions));

init_DB();
app.use('/api',create_DB_router);
app.use('/api',student_router);
app.use('/api',note_router);
app.use('/api',tag_router);
app.use('/api',subject_router);
app.use('/api',study_group_router);

app.use(errorHandler);

let port = process.env.PORT || 9000;
app.listen(port);
console.log('API is runnning at ' + port);