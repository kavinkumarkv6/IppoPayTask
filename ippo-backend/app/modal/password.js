import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  }
});

const password = new mongoose.model("Password", passwordSchema);
export default password;
