 import { alias_student } from "../entities/const_db.js";
import students from "../entities/student.js";
import study_groups from "../entities/study_group.js";

async function create_group(study_group) {
  return await study_groups.create(study_group, { include: [
    { model: students, as: alias_student }
  ] });
}

async function get_group_by_id(id){
  return await study_groups.findByPk(id, {include: [alias_student]});
}

async function get_all_groups() {
  return await study_groups.findAll({include: [alias_student]})
}

async function update_group(id, updated_group) {
  return await study_groups.update(updated_group, { where: { id } });
}

async function delete_group(id) {
  let elem = notes.findByPk(id, {include:[alias_student]});
  if(elem) {
    return await elem.destroy();
  }
  return;
}

async function add_student_to_group(group_id, student_id) {
  try {
    const group = await study_groups.findByPk(group_id);
    if (!group) return null;
    
    const student = await students.findByPk(student_id);
    await group.addStudent(student);
    
    return group;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {
  create_group,
  get_group_by_id,
  get_all_groups,
  update_group,
  delete_group,
  add_student_to_group
}