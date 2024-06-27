import mongoose from "mongoose";

const proSchema = new mongoose.Schema({
  data: {
    role: {
      type: String,
    },
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
    country: {
      type: String,
    },
    phone_number: {
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
  
  client_countries: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  specialization: {
    type: [String],
  },
  favorite: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  comments: [
    {
      client_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Client",
      },
      comment: {
        type: String,
        maxlength: 280,
      },
    },
  ],
});

export default mongoose.model("Pro", proSchema);
