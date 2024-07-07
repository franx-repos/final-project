import Client from "../models/clientsSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Funktion für Sign up
export const signUp = asyncHandler(async(req,res,next) => {
    const { data: {
        role,
        first_name, 
        last_name, 
        email, 
        password,
        vat_id,
        tax_id,
        street,
        zip,
        city,
        country,
        phone_number
      },
        industry,
        languages
      } = req.body; 
      const existingClientMail = await Client.findOne({ email });
      if(existingClientMail) throw new ErrorResponse("An account with this Email already exists", 409); // Fehlermeldung für existierende Clients


      const hash = await bcrypt.hash(password, 10); // verschlüssel das passwort im token
      const newClient = await Client.create({ data: {
        role,
        first_name, 
        last_name, 
        email, 
        password: hash,
        vat_id,
        tax_id,
        street,
        zip,
        city, 
        country,
        phone_number
      }, 
        industry,
        languages
      });
      // console.log(role, first_name, last_name, email, password, vat_id, tax_id, street, zip, city, country, phone_number, industry, languages)
      const token = jwt.sign({ cid: newClient._id}, process.env.JWT_SECRET);
      res.status(201).send ({token}) //sendung vom token an die datenbank
})

//funktion für Log in
export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.data;

  const existingClient = await Client.findOne({ "data.email": email }).select(
    "+data.password"
  );
  if (!existingClient) throw new ErrorResponse("Email does not exists", 404);
  // überprüfung ob Email für user existiert
  const match = await bcrypt.compare(password, existingClient.data.password);
  if (!match) throw new ErrorResponse("Password is incorrect", 401);
  // Passwort überprüfung
  const token = jwt.sign({ cid: existingClient._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.cookie("token", token, {
    maxAge: 86400000,
    // httpOnly: true,
    // sameSite: "Lax",
  }); // 30mn
  res.send({ status: "success" });
});
//verification
export const getClient = asyncHandler(async (req, res, next) => {
  // console.log(req);
  const client = await Client.findById(req.cid);
  // console.log(client);
  res.json(client);
});

// logout
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.send({ status: "success" });
});

// // Funktion für Passwort zurücksetzen
// export const forgotpassword = asyncHandler(async (req, res, next) => {
//   const { email } = req.body;
//   const existingClient = await Client.findOne({ "data.email": email });
//   if (!existingClient) throw new ErrorResponse("Email does not exists", 404); // Fehlermeldung für nicht existierende Clients
//   const token = jwt.sign({ cid: existingClient._id }, process.env.JWT_SECRET, {
//     expiresIn: "30m",
//   });
//   res.cookie("token", token, {
//     maxAge: 1800000,
//     // httpOnly: true,
//     // sameSite: "Lax",
//   }); // 30mn 
//   res.send({ token });  
// });