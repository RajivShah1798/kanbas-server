import mongoose from "mongoose";
const modulesSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    course: String,
    lessons: [{
      id: String,
      name: String,
      description: String,
      module: String
    }]
  },
  { collection: "modules" });
export default modulesSchema;