import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        typeUser:{
            type : Number, 
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("User", userSchema);