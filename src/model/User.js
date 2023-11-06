import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const userSchema = mongoose.Schema(
    {
        ci:{
            type: String,
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },        
        imagePath:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'User' 
    }
);
export default mongoose.models.User || mongoose.model('User',  userSchema);
