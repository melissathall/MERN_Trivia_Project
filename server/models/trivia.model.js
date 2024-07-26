
import {model, Schema} from 'mongoose';

const TriviaSchema = new Schema(
    {
        nickName: {
            type: String,
            required: [true, "Nickname is required!"],
            minlength: [2, "Nickname must be at least 2 characters long!"],
            maxlength: [20, "Nickname must be less than 20 characters long"]
        },
        score: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);
const Trivia = model("Trivia", TriviaSchema);
export default Trivia;