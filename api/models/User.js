import mongoose, {Schema} from "mongoose";
const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }, 
    roles: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Role"
    }]
}, {
    timestamps: true
});

UserSchema.index({ firstName: 'text', lastName: 'text' });


export default mongoose.model("user", UserSchema);  