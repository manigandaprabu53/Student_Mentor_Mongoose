import express from 'express';
import studRoutes from './student.route.js';
import mentRoutes from './mentor.route.js';

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).send('<h1>Student Mentor Task using Mongoose and Express</h1>')
})
router.use('/student', studRoutes)
router.use('/mentor', mentRoutes)

export default router;