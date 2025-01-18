import db from '../db_config.js';
import Sequelize from 'sequelize';

const study_group = db.define("study_group", {
  group_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  group_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default study_group;