import db from '../db_config.js';
import Sequelize from 'sequelize';

const note_tag = db.define("note_tag", {
  note_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false
  },
  tag_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false
    }
});

export default note_tag;