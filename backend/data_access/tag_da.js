import tags from "../entities/tag.js";
import notes from "../entities/note.js";

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

async function attach_tag_to_note(note_id, tag_id) {
  const note = await notes.findByPk(note_id);
  const tag = await tags.findByPk(tag_id);
  if (note && tag) {
    await note.addTag(tag);
    return note;
  }
  return null;
}


export {
  create_tag,
  get_all_tags,
  get_tag_by_id,
  update_tag,
  delete_tag,
  attach_tag_to_note
}
