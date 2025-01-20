import Sequelize from 'sequelize';

const like_op = Sequelize.Op.like;
const in_op = Sequelize.Op.in;
const gte_op = Sequelize.Op.gte;
const lte_op = Sequelize.Op.lte;

export {
  like_op,
  in_op,
  gte_op,
  lte_op
};