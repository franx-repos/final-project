import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  sowo_id: {
    type: String,
    required: [true, "sowo_id is required"],
    unique: true,
    trim: true,
  },
  data: {
    first_name: {
      type: String,
      required: [true, "first name is required"],
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    vat_id: {
      type: String,
      unique: true,
    },
    tax_id: {
      type: String,
      unique: true,
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
    language: {
      type: String,
    },
  },
  timeOfArrival: {
    type: Date,
  },

  // image_url: {
  //   type: String,
  // },
  // tags: {
  //   type: [String],
  //   default: "NEW",
  // },
});

export default mongoose.model("Client", clientSchema);

// Clients
// {
//     {
//         "id":"3",
//         "first_name":"John",
//         "last_name": "Dou",
//         "email":"johnDoe@email.com",
//         "password":"****",
//         "vatID":"1234",
//         "taxID":"1233",
//         "street": "TestStreet 4",
//         "zip": "48952",
//         "city": "Berlin",
//         "country": "Germany",
//         "Language": "german",
//     orders_ids{
//         "1",
//         "4",
//         }
//     },
