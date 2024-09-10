import mongoose,{Schema} from "mongoose";

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    descripition: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

export const Company = mongoose.model("Company",companySchema)