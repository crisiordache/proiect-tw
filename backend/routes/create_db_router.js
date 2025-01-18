import express from 'express';
import db from '../db_config.js';

let create_DB_router = express.Router();

create_DB_router.route('/create').get(async (req, res) => {
    try{
        await db.sync({force : true})    
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
});

export default create_DB_router;