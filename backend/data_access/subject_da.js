import subjects from "../entities/subject.js";
import notes from "../entities/note.js";

async function create_subject(subject) {
  return await subjects.create(subject);
}

async function get_all_subjects() {
  return await subjects.findAll();
}

async function get_subject_by_id(id) {
  return await subjects.findByPk(id);
}

async function update_subject(id, updatedSubject) {
  const subject = await subjects.findByPk(id);
  if (subject) {
    return await subject.update(updatedSubject);
  }
  return;
}

async function delete_subject(id) {
  const subject = await subjects.findByPk(id);
  if (subject) {
    await subject.destroy();
    return true;
  }
  return false;
}

export {
  create_subject,
  get_all_subjects,
  get_subject_by_id,
  update_subject,
  delete_subject
}