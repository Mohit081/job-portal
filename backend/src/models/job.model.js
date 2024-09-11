import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    descripition: {
        type: String,
        required: true
    },
    requirement: [
        {
            type: String
        }
    ],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    created_By: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [{
        type: Schema.Types.ObjectId,
        ref: "Application"
    }]
},{timestamps: true})


export const Job = mongoose.model("Job", jobSchema)