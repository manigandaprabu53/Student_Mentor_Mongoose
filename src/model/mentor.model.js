import mongoose from "./index.js";
import generateUUID from '../utils/helper.js';
import validators from '../utils/validators.js'

const mentorSchema = mongoose.Schema({
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
    students: {
        type: Array,
        default: []
    }
},
{
    Collection: "mentors",
    versionKey: false
}
)

export default mongoose.model("mentors", mentorSchema)