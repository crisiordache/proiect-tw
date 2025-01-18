import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import attachment from './attachment.js'
import group_member from './group_member.js'
import note_tag from './note_tag.js'
import note from './note.js'
import student from './student.js'
import study_group from './study_group.js'
import subject from './subject.js'
import tag from './tag.js'
import {alias_attachment, alias_group, alias_note, alias_student, alias_tag} from './const_db.js';


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
  student.hasMany(note, {as:alias_note, foreignKey:"student_id"});
  note.belongsTo(student, {foreignKey:"student_id"});

  subject.hasMany(note, {as:alias_note, foreignKey:"subject_id"});
  note.belongsTo(subject, {foreignKey:"subject_id"});

  note.hasMany(attachment, {as:alias_attachment, foreignKey:"note_id"});
  attachment.belongsTo(note, {foreignKey:"note_id"});

  student.belongsToMany(study_group, {through:"group_member", as: alias_group, foreignKey:"group_id"});
  study_group.belongsToMany(student, {through: "group_member", as: alias_student, foreignKey: "student_id"});

  note.belongsToMany(tag, {through: "note_tag", as:alias_tag, foreignKey:"tag_id"});
  tag.belongsToMany(note, {through: "note_tag", as:alias_note, foreignKey:"note_id"});
}

function init_DB() {
  create_DB();
  FK_config();
}

export default init_DB;