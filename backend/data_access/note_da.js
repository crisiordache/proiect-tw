import notes from '../entities/note.js';
import attachments from '../entities/attachment.js';
import tags from '../entities/tag.js';
import { alias_attachment, alias_subject, alias_tag } from '../entities/const_db.js';
import subjects from '../entities/subject.js';

async function create_note(note) {
  return await notes.create(note, { include: [
    { model: attachments, as: alias_attachment },
    {model: subjects, as: alias_subject}
  ] });
}

async function get_note_by_id(id){
  return await notes.findByPk(id, {include: [alias_attachment,alias_tag,alias_subject]});
}

async function get_all_notes() {
  return await notes.findAll({include: [alias_attachment,alias_tag,alias_subject]})
}

async function update_note(id, updatedNote) {
  return await notes.update(updatedNote, { where: { id } });
}

async function delete_note(id) {
  let elem = notes.findByPk(id, {include:[alias_attachment]});
  if(elem) {
    return await elem.destroy();
  }
  return;
}

async function add_attachment_to_note(attachment, note_id) {
  attachment.note_id = note_id;
  return await attachments.create(attachment);
}

async function get_attachments_by_note_id(note_id) {
  return await attachments.findAll({ where: { note_id } });
}

export {
  create_note, 
  get_note_by_id, 
  get_all_notes,
  update_note, 
  delete_note, 
  add_attachment_to_note, 
  get_attachments_by_note_id
}