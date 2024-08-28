import mongoose from "./index.js";
import generateUUID from '../utils/helper.js';
import validators from '../utils/validators.js'

const studentSchema = mongoose.Schema({
    id: {
        type: String,
        default: function (){
            return generateUUID();
        }
    },
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        validator: {
            validate: validators.validateEmail,
            message: props=> `${props.value} is not a valid email`
        }
    },
    mentor: {
        type: String,
        default: null
    },
    previousMentor: {
        type: String,
        default: null
    }
},
{
    Collection: "students",
    versionKey: false
}
)

export default mongoose.model("students", studentSchema)