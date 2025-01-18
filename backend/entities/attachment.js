import db from '../db_config.js';
import Sequelize from 'sequelize';

const attachment = db.define("attachment",{
  attachment_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  note_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  file_path: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default attachment;