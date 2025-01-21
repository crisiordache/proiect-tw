import tags from "../entities/tag.js";
import notes from "../entities/note.js";
import notes_tags from "../entities/note_tag.js";
import { alias_attachment, alias_subject, alias_tag } from '../entities/const_db.js';
import {like_op, in_op, gte_op, lte_op} from './operators.js'

async function create_tag(tag) {
  return await tags.create(tag);
}

async function get_all_tags() {
  return await tags.findAll();
}

async function get_tag_by_id(id) {
  return await tags.findByPk(id);
}

async function update_tag(id, tag_data) {
  const tag = await get_tag_by_id(id);
  if (tag) {
    return await tag.update(tag_data);
  }
  return null;
}

async function delete_tag(id) {
  const tag = await get_tag_by_id(id);
  if (tag) {
    await tag.destroy();
    return true;
  }
  return false;
}

async function attach_tag_to_note(note_id, tagData) {
  try {
    const note = await notes.findByPk(note_id);
    if (!note) return null;
    
    const [tag] = await tags.findOrCreate({
      where: { tag_name: tagData.tag_name }
    });
    await note.addTag(tag);
    
    return note;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function get_tags_of_note(note_id) {
  try {
    const note = await notes.findByPk(note_id);
    if (!note) return null;

    const associated_note_tags = await notes_tags.findAll({where: {note_id: note_id}, attributes: ['tag_id']});
    const tag_ids = associated_note_tags.map (nt => nt.tag_id);

    if(tag_ids.length === 0) {
      return [];
    }

    const found_tags = await tags.findAll({
      where: {
        tag_id: {
          [in_op]: tag_ids
        }
      }
    })

    return found_tags;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export {
  create_tag,
  get_all_tags,
  get_tag_by_id,
  update_tag,
  delete_tag,
  attach_tag_to_note,
  get_tags_of_note
}
