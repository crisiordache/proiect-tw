import db from '../db_config.js';
import Sequelize from 'sequelize';

const subjects = db.define("subject", {
  subject_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  subject_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default subjects;