import express from 'express';
import mentorController from '../controller/mentor.controller.js';

const router = express.Router();

router.post('/createMentor', mentorController.createMentor)
router.put('/assignStudentsToMentor/:id', mentorController.assignStudentsToMentor)

export default router;