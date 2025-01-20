import express from 'express';
import {get_student_by_id} from '../data_access/student_da.js'
import { hashPassword, verifyPassword } from '../middleware/password_manager.js';
import students from '../entities/student.js';

let student_router = express.Router();

student_router.post('/register', async (req, res, next) => {
    try {
        const { student_name, email, password } = req.body;
        
        const existingStudent = await students.findOne({
            where: { email: email }
        });
        
        if (existingStudent) {
            return res.status(400).json({
                error: 'Email already registered'
            });
        }

        const hashedPassword = await hashPassword(password);
        
        const student = await students.create({
            student_name: student_name,  
            email: email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'Registration successful',
            student: {
                id: student.student_id,
                name: student.student_name,
                email: student.email
            }
        });
    } catch (error) {
        next(error);
    }
});

student_router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const student = await students.findOne({
            where: { email: email }
        });
        
        if (!student) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        
        const is_password_valid = await verifyPassword(password, student.password);
        
        if (!is_password_valid) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        
        const studentData = {
            id: student.id,
            name: student.name,
            email: student.email
        };
        
        return res.json({
            message: 'Login successful',
            student: studentData
        });
        
    } catch (error) {
        next(error);
    }
});

student_router.route('/student/:id').get( async (req, res) => {
  return res.json(await get_student_by_id(req.params.id));
});

export default student_router;