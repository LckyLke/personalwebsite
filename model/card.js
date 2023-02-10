import { Schema, models, model } from "mongoose";

const cardSchema = new Schema({
  number: Number,
  question: String,
  answers: Array,
  solution: String,
});

const Card = models.card || model("card", cardSchema);

export default Card;
