import mongoose from "mongoose";
//trim, maxlength, lowercase
const clientSchema = new mongoose.Schema({
  data: {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
      minlength: 6,
      maxlength: 12,
    },
    vat_id: {
      type: String,
      unique: true,
      trim: true,
    },
    tax_id: {
      type: String,
      unique: true,
      trim: true,
    },
    street: {
      type: String,
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  image_url: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },
  industry: {
    type: [String],
  },
  country: {
    type: String,
  },
  languages: {
    type: [String],
  },
});

export default mongoose.model("Client", clientSchema);
