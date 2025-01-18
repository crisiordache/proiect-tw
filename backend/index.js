import express from 'express';
import env from 'dotenv';
import init_DB from './entities/init_db.js';
import create_DB_router from './routes/create_db_router.js';

env.config()

let app = express();
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

init_DB();
app.use('/api',create_DB_router);

let port = process.env.PORT || 9000;
app.listen(port);
console.log('API is runnning at ' + port);