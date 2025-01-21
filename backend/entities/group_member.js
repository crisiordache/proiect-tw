import db from '../db_config.js';
import Sequelize from 'sequelize';

const group_members = db.define("group_member", {
  group_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false
  },
  student_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false
  }
});

export default group_members;