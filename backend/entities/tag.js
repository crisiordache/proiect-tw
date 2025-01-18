import db from '../db_config.js';
import Sequelize from 'sequelize';

const tag = db.define("tag", {
  tag_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  tag_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default tag;