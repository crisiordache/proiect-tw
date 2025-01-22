import express from 'express';
import { 
  create_note, delete_note, 
  get_all_notes, 
  get_note_by_id, 
  update_note,
  get_notes_with_filter_and_pagination,
  get_notes_by_student_id } from '../data_access/note_da.js';
import { attach_tag_to_note, get_tags_of_note } from '../data_access/tag_da.js';


let note_router = express.Router();

note_router.route('/note').post( async (req, res) => {
  return res.json(await create_note(req.body));
});

note_router.route('/note/:id').get( async (req, res) => {
  return res.json(await get_note_by_id(req.params.id));
});

note_router.route('/note').get( async (req, res) => {
  return res.json(await get_all_notes());
});

note_router.route('/note/:id').put( async(req, res)=> {
  return res.json(await update_note(req.params.id, req.body));
});

note_router.route('/note/:id').delete( async(req,res)=> {
  return res.json(await delete_note(req.params.id));
});

note_router.post('/note/:id/tag', async (req, res) => {
  return res.json(await attach_tag_to_note(req.params.id, req.body));
});

note_router.get('/note/:id/tags',async (req, res) => {
  return res.json(await get_tags_of_note(req.params.id));
});

note_router.get('/note_filter', async (req, res) => {
  return res.json(await get_notes_with_filter_and_pagination(req.query));
});

note_router.get('/note/student/:id', async (req, res) => {
  return res.json(await get_notes_by_student_id(req.params.id));
});

export default note_router;