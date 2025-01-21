import db from '../db_config.js';
import Sequelize from 'sequelize';

const students = db.define("student", {
  student_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  student_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: "^[a-zA-Z0-9._%+-]+@stud\.ase\.ro$"
    }
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false,
  }
});

export default students;