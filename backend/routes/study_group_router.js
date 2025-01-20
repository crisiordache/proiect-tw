import express from 'express';
import {
  create_group,
  delete_group,
  get_all_groups,
  get_group_by_id,
  update_group,
  add_student_to_group
} from '../data_access/study_group_da.js';


let study_group_router = express.Router();

study_group_router.route('/group').post(async (req, res) => {
  return res.json(await create_group(req.body));
});

study_group_router.route('/group/:id').get(async (req, res) => {
  return res.json(await get_group_by_id(req.params.id));
});

study_group_router.route('/group').get(async (req, res) => {
  return res.json(await get_all_groups());
});

study_group_router.route('/group/:id').put(async (req, res) => {
  return res.json(await update_group(req.params.id));
});

study_group_router.route('/group/:id').delete(async (req, res) => {
  return res.json(await delete_group(req.params.id));
});

study_group_router.route('/group/:group_id/student/:student_id').post(async (req, res) => {
  return res.json(await add_student_to_group(req.params.group_id, req.params.student_id));
});

export default study_group_router;