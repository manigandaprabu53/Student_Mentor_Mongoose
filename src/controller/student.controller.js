import studModel from '../model/user.model.js';
import mentorModel from '../model/mentor.model.js';

const getAllStudent = async (req, res)=>{
    try {
        let user = await studModel.find({}, {_id:0});
        if(user.length){
            res.status(201).send({message: "Data Fetched Successfully", data: user})
        }
        else{
            res.status(400).send({message: "No User Data Available"})
        }
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error);
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

const getAllStudentForOneMentor = async (req, res)=>{
    try {
        const {id} = req.params;
        let user = await studModel.find({mentor: id}, {_id:0});
        if(user.length){
            res.status(200).send({message: "Data Fetched Successfully", data: user})
        }
        else{
            res.status(400).send({message: "No User Data Available"})
        }
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error);
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}


const createStudent = async (req, res)=>{
    try {
        await studModel.create(req.body);
        res.status(201).send({message: "Student Created Successfully"})
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error)
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

const studentWithNoMentor = async (req, res)=>{
    try {
        let data = await studModel.find({mentor: null})
        if(data){
            res.status(200).send({message: "Student Data With No Mentors", data: data})
        }
        else{
            res.status(400).send({message: "All Students Got Mentor"})
        }
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error);
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

const assignMentorToStudent = async (req, res)=>{
    try {
        const {id} = req.params;
        let stud = await studModel.findOne({id: id});
        if(stud){
            const {name, email, mentor, previousMentor} = req.body;
            stud.name = name?name : stud.name
            stud.email = email?email: stud.email
            // stud.previousMentor = stud.mentor
            // stud.mentor = mentor?mentor : stud.mentor
            if(mentor){
                stud.previousMentor = stud.mentor
                stud.mentor = mentor?mentor : stud.mentor
                
            }
            

            await stud.save();

            let mentdata = await mentorModel.findOne({id: req.body.mentor})
            console.log("Mentor Data: "+mentdata)
            mentdata.students.push(mentor)

            res.status(201).send({message: "Mentor Assigned to Student", data: stud})
        }
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error)
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

const previousMentor = async (req, res)=>{
    try {
        const {id} = req.params;
        let stud = await studModel.findOne({id: id})
        res.status(200).send({message: "Students With Previous Mentor", data: stud})
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error);
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

export default {getAllStudent, studentWithNoMentor, createStudent, assignMentorToStudent, previousMentor, getAllStudentForOneMentor}