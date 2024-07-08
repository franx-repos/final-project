import Pro from "../models/prosSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Funktion für Sign up
export const signUp = asyncHandler(async (req, res, next) => {
  const {
    data: {
      role,
      first_name,
      last_name,
      email,
      password,
      street,
      zip,
      city,
      country,
      phone_number,
    },
    industry,
    client_countries,
    languages,
    specialization,
  } = req.body;
  const existingPromail = await Pro.findOne({ email });
  if (existingPromail)
    throw new ErrorResponse("An account with this Email already exists", 409); // Fehlermeldung für existierende Pros

  const hash = await bcrypt.hash(password, 10); // verschlüssel das passwort im token
  const newPro = await Pro.create({
    data: {
      role,
      first_name,
      last_name,
      email,
      password: hash,
      street,
      zip,
      city,
      country,
      phone_number,
    },
    industry,
    client_countries,
    languages,
    specialization,
  });
  const token = jwt.sign({ cid: newPro._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.send({ status: "cool thing" });
});

//funktion für Log in
export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.data;

  const existingPro = await Pro.findOne({ "data.email": email }).select(
    "+data.password"
  );
  if (!existingPro) throw new ErrorResponse("Email does not exists", 404);
  // überprüfung ob Email für user existiert
  const match = await bcrypt.compare(password, existingPro.data.password);
  if (!match) throw new ErrorResponse("Password is incorrect", 401);
  // Passwort überprüfung
  const token = jwt.sign({ cid: existingPro._id }, process.env.JWT_SECRET, {
    expiresIn: "30min",
  });
  res.cookie("token", token, {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }); // 30mn
  res.send({ status: "success" });
});
//verification
export const getPro = asyncHandler(async (req, res, next) => {
  const client = await Pro.findById(req.cid);
  res.json(client);
});

// logout
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send({ status: "success" });
});

// export const forgotpassword = asyncHandler(async (req, res, next) => {
//   const { email } = req.body;
//   const existingPro = await Pro.findOne({ 'data.email': email });
//   if (!existingPro) throw new ErrorResponse('Email does not exists', 404);
//   const token = jwt.sign({ cid: existingPro._id}, process.env.JWT_SECRET, { expiresIn: "30min",});
//   res.cookie('token', token, { maxAge: 1800000 }); // 30mn
//   res.send({ token });
// });
