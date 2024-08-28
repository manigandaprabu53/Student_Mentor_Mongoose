import express from 'express'
import studentController from '../controller/student.controller.js'

const router = express.Router();

router.get('/getAllStudent', studentController.getAllStudent)
router.get('/getAllStudentForOneMentor/:id', studentController.getAllStudentForOneMentor)
router.post('/createStudent', studentController.createStudent)
router.get('/studentWithNoMentor', studentController.studentWithNoMentor)
router.put('/assignMentorToStudent/:id', studentController.assignMentorToStudent)
router.get('/previousMentor/:id', studentController.previousMentor)

export default router;