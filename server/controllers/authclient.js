import Client from "../models/clientsSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from "../utils/asyncHandler.js";


// Funktion für Sign up
export const signUp = asyncHandler(async(req,res,next) => {
    const { data: {
        first_name, 
        last_name, 
        email, 
        password,
        vat_id,
        tax_id,
        street,
        zip,
        city },
        industry,
        languages
      } = req.body; 
      const existingClientMail = await Client.findOne({ email });
      if(existingClientMail) throw new ErrorResponse("An account with this Email already exists", 409); // Fehlermeldung für existierende Clients


      const hash = await bcrypt.hash(password, 10); // verschlüssel das passwort im token
      const newClient = await Client.create({ data: {
        first_name, 
        last_name, 
        email, 
        password: hash,
        vat_id,
        tax_id,
        street,
        zip,
        city }, 
        industry,
        languages
      });
      const token = jwt.sign({ cid: newClient}, process.env.JWT_SECRET);
      res.status(201).send ({token}) //sendung vom token an die datenbank
})

//funktion für Log in
export const logIn = asyncHandler(async(req, res, next) => { const { email, password } = req.body.data;

const existingClient = await Client.findOne({ 'data.email': email }).select(
  '+data.password'
);
if (!existingClient) throw new ErrorResponse("Email does not exists", 404);
 // überprüfung ob Email für user existiert
  const match = await bcrypt.compare(password, existingClient.data.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);
// Passwort überprüfung
const token = jwt.sign({ cid: existingClient._id}, process.env.JWT_SECRET, { expiresIn: "30min",});
res.cookie('token', token, { maxAge: 1800000 }); // 30mn
res.send({ status: 'success' });
})
//verification
export const getClient = asyncHandler(async (req, res, next) => {
  const client = await Client.findById(req.cid);
  res.json(client);
});

// logout 
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.send({ status: 'success' });
});
