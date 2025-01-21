import express from 'express';
import { 
  create_tag, 
  get_all_tags, 
  get_tag_by_id, 
  update_tag, 
  delete_tag, 
  attach_tag_to_note
} from '../data_access/tag_da.js';

const tag_router = express.Router();

tag_router.post('/tag', async (req, res) => {
  return res.json(await create_tag(req.body))
});
 
tag_router.get('/tag', async (req, res) => {
  return res.json(await get_all_tags())
});

tag_router.get('/tag/:id', async (req, res) => {
  return res.json(await get_tag_by_id(req.params.id))
});

tag_router.get('/tag/search', async (req, res) => {
  const { name } = req.query;
  const searchtag = await tag.findOne({ where: { tag_name: name } });
  if (searchtag) {
    return res.json(searchtag);
  } else {
    return res.status(404).send('Tag not found');
  }
});

tag_router.put('/tag/:id', async (req, res) => {
  return res.json(await update_tag(req.params.id, req.body));
});

tag_router.delete('/tag/:id', async (req, res) => {
  return res.json(await delete_tag(req.params.id));
});

tag_router.put('/tag/:id/note/:note_id', async (req, res) => {
  return res.json(await attach_tag_to_note(req.params.note_id, req.params.id));
});

export default tag_router;
