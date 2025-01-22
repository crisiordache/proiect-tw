import mysql from 'mysql2/promise.js';
import env from 'dotenv';
import attachments from './attachment.js';
import notes from './note.js';
import students from './student.js';
import study_groups from './study_group.js';
import subjects from './subject.js';
import tags from './tag.js';
import {alias_attachment, alias_group, alias_note, alias_student, alias_tag, alias_subject} from './const_db.js';


env.config();

function create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}
function FK_config() {
  students.hasMany(notes, {as:alias_note, foreignKey:"student_id"});
  notes.belongsTo(students, {as:alias_student, foreignKey:"student_id"});

  subjects.hasMany(notes, {as:alias_note, foreignKey:"subject_id"});
  notes.belongsTo(subjects, {as:alias_subject, foreignKey:"subject_id"});

  notes.hasMany(attachments, {as:alias_attachment, foreignKey:"note_id"});
  attachments.belongsTo(notes, {as:alias_note, foreignKey:"note_id"});

  students.belongsToMany(study_groups, {
    through:"group_member", 
    as: alias_group, 
    foreignKey:"group_id",
    otherKey: "student_id"});
  study_groups.belongsToMany(students, {
    through: "group_member", 
    as: alias_student, 
    foreignKey: "student_id",
    otherKey: "group_id"});

  notes.belongsToMany(tags, {
    through: "note_tag",
    as: alias_tag,
    foreignKey: "note_id"
});
  tags.belongsToMany(notes, {
    through: "note_tag",
    as: alias_note,
    foreignKey: "tag_id"
});
}

function init_DB() {
  create_DB();
  FK_config();
}

export default init_DB;