import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  ratings: { type: Array, default: Array(388).fill(10) },
});

const User = models.user || model("user", userSchema);

export default User;
