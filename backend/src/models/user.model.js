import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['recruiter','applicant'],
        required: true
    },
    profile: {
        bio: {type: string},
        skills: [{type: string}],
        resume: {type: string},
        resumeOringinalName: {type: string},
        company: {type: Schema.Types.ObjectId, ref: 'company'},
        profilePhoto: {
            type: string,
            default: ""
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
