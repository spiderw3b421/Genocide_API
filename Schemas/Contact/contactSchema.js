import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    greeting: String,
    desc: String,
    firstName: String,
    lastName: String,
    sentBy: {
      type: mongoose.Types.ObjectId,
      ref: "member",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
