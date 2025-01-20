import { alias_note } from "../entities/const_db.js";
import notes from "../entities/note.js";
import students from "../entities/student.js";

async function get_student_by_id(id) {
  return await students.findByPk(id, {include:[alias_note]})
}

export {get_student_by_id}
