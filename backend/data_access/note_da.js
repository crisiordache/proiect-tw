import notes from '../entities/note.js';
import attachments from '../entities/attachment.js';
import tags from '../entities/tag.js';
import { alias_attachment, alias_subject, alias_tag } from '../entities/const_db.js';
import subjects from '../entities/subject.js';
import {like_op, in_op, gte_op, lte_op} from './operators.js'

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

async function update_note(id, updated_note) {
  return await notes.update(updated_note, { where: { note_id: id } });
}
/*
async function delete_note(id) {
  let elem = notes.findByPk(id, {include:[alias_attachment]});
  if(elem) {
    return await elem.destroy();
  }
  return;
}
*/

async function delete_note(id) {
  notes.destroy({
    where: {
      note_id: id
    }
  })
  return;
}

async function get_notes_with_filter_and_pagination(filter) {
  if(!filter.take) {
    filter.take = 3;
  }

  if(!filter.skip) {
    filter.skip = 1;
  }

  let where_clause = {};
  if(filter.title) {
    where_clause.title = {[like_op]: `%${filter.title}%`};
  }

  let include_clause = [];
  if(filter.tags) {
    include_clause.push({
      model: tags, 
      as: alias_tag, 
      where: {name: {[in_op]: filter.tags}}});
  }

  if(filter.subjects) {
    include_clause.push({
      model: subjects, 
      as: alias_subject, 
      where: {name: {[in_op]: filter.subjects}}});
  }

  if(filter.created_date) {
    where_clause.created_date = {[gte_op]: filter.created_date};
  }

  if(filter.last_updated_date) {
    where_clause.last_updated_date = {[lte_op]: filter.last_updated_date};
  }

  return await notes.findAndCountAll({
    distinct: true,
    where: where_clause,
    include: include_clause,
    limit: parseInt(filter.take),
    offset: parseInt(filter.skip-1) * parseInt(filter.take)
  });
}

export {
  create_note, 
  get_note_by_id, 
  get_all_notes,
  update_note, 
  delete_note,
  get_notes_with_filter_and_pagination
}