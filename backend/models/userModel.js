import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    // Password for normal login users (Google users will have empty password)
    password: { type: String, required: false },

    // Google-authenticated users
    googleId: { type: String, required: false },

    // Cart data
    cartData: { type: Object, default: {} }
  },
  { minimize: false }
);

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
