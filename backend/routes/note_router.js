import express from 'express';
import { add_attachment_to_note, 
  create_note, delete_note, 
  get_all_notes, 
  get_attachments_by_note_id, 
  get_note_by_id, 
  update_note } from '../data_access/note_da.js';
import { attach_tag_to_note } from '../data_access/tag_da.js';

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
  return res.json(await update_note(req.params.id));
});

note_router.route('note/:id').delete( async(req,res)=> {
  return res.json(await delete_note(req.params.id));
});

note_router.route('note/:id/attachment').post( async(req, res)=> {
  return res.json(await add_attachment_to_note(req.body,req.params.id));
});

note_router.route('note/:id/attachment').get( async(req,res)=> {
  return res.json(await get_attachments_by_note_id(req.params.id));
});

note_router.put('/note/:id/tag', async (req, res) => {
  return res.json(await attach_tag_to_note(req.params.id, req.body));
});


export default note_router;