// import mongoose ,{Schema}from "mongoose";

// export default mongoose.model(
//   "User",
//   new Schema({
//     name: { type: String, required: true,unique:true },
//     email: { type: String, required: true, unique: true },
//     number: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   } ,{timestamps:true}
// )
// );


import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,unique:true },
    email: { type: String, required: true},
    number: { type: Number, required: true},
    password: { type: String, required: true },
} ,{timestamps:true})

export default mongoose.model("User",userSchema)
