import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const SALT = 'hardcoded_salt'; // Replace this with your desired hardcoded salt

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    encryptedUsername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
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

UserSchema.pre('save', async function (next) {
    if (this.isModified('username')) {
        this.encryptedUsername = await bcrypt.hash(this.username + SALT, 10);
    }
    next();
});

export default mongoose.model("User", UserSchema);
