import express from 'express';
import {
  create_subject,
  get_all_subjects,
  get_subject_by_id,
  update_subject,
  delete_subject
} from '../data_access/subject_da.js';

const subject_router = express.Router();

subject_router.post('/subject', async (req, res) => {
  return res.json(await create_subject(req.body));
});

subject_router.get('/subject', async (req, res) => {
  return res.json(await get_all_subjects());
});

subject_router.get('/subject/:id', async (req, res) => {
  return res.json(await get_subject_by_id(req.params.id));
});

subject_router.put('/subject/:id', async (req, res) => {
  return res.json(await update_subject(req.params.id, req.body));
});

subject_router.delete('/subject/:id', async (req, res) => {
  return res.json(await delete_subject(req.params.id));
});


export default subject_router;
