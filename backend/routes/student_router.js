import express from 'express';
import {create_student, get_student_by_id} from '../data_access/student_da.js'

let student_router = express.Router();

student_router.route('/student').post( async (req, res) => {
  return res.json(await create_student(req.body));
});

student_router.route('/student/:id').get( async (req, res) => {
  return res.json(await get_student_by_id(req.params.id));
});

export default student_router;