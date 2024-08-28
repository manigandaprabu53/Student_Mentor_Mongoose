import mentorModel from '../model/mentor.model.js';
import studModel from '../model/user.model.js'

const createMentor = async (req, res)=>{
    try {
        await mentorModel.create(req.body)
        res.status(201).send({
            message: "Mentor account created Successfully"
        })
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const assignStudentsToMentor = async (req, res)=>{
    try {
        const {id} = req.params
        let user = await mentorModel.findOne({id:id});
        let loop = req.body.students
        if(user){
            console.log(req.body)
            const {name, email, students} = req.body;
            user.name = name?name : user.name;
            user.email = email?email : user.email;
            if(students.length){
                for(let i=0; i<students.length; i++){
                    if(!(user.students.includes(students[i]))){
                        user.students.push(students[i])
                    }
                }
            }

            await user.save()

            for(let i=0; i<loop.length; i++){
                let stud = await studModel.findOne({id: loop[i]})
                stud.previousMentor = stud.mentor;
                stud.mentor = id;

                await stud.save()
            }

            res.status(200).send({message: "Students assigned to mentor", data: user})
        }
    } catch (error) {
        console.log(`Error at ${req.originalURL}`, error)
        res.status(500).status({message: error.message || "Internal Server Error"})
    }
}

export default {createMentor, assignStudentsToMentor}