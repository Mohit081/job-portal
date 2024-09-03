import mongoose,{Schema} from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    descripition: {
        type: string
    },
    website: {
        type: string
    },
    location: {
        type: string
    },
    logo: {
        type: string
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

export default Company = mongoose.model("Company",companySchema)