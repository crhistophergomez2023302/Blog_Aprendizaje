import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    
    description:{
        type: String,
        required: false
    }
})

export default model("Category", categorySchema)