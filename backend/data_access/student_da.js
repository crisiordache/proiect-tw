import { alias_note } from "../entities/const_db.js";
import notes from "../entities/note.js";
import students from "../entities/student.js";

async function create_student(student){
  return await students.create(student, {include: [{model:notes, as:alias_note}]});
}

async function get_student_by_id(id) {
  return await students.findByPk(id, {include:[alias_note]})
}

export {create_student, get_student_by_id}
