import mongoose from "mongoose";
const coursesSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
    startDate: String,
    endDate: String,
    imageurl: String
},
{ collection: "courses"});
export default coursesSchema;
