import mongoose from "mongoose";
// import { userAgent } from "next/server";


interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    salt: string
}

const UserSchema = new mongoose.Schema<IUser>({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    salt: String

})

export const User = mongoose.models.User ||  mongoose.model('User', UserSchema)

