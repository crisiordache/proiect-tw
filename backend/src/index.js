import express from 'express';

let app = express();
let router = express.Router();
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))