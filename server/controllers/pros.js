import Pro from "../models/prosSchema.js";

export const getAllPros = async (req, res, next) => {
  try {
    const pro = await Pro.find();
    if (!pro.length) {
      throw { statusCode: 404, message: "Pro not found" };
    }
    res.json(pro);
  } catch (error) {
    next(error);
  }
};

export const getProById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pro = await Pro.findById(id);
    if (!pro) {
      throw { statusCode: 404, message: "Pro not found" };
    }
    res.json(pro);
  } catch (error) {}
};

export const getProByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const pro = await Pro.find({ "data.email": email });
    if (!pro) {
      throw { statusCode: 404, message: "Client not found" };
    }
   
    res.json(pro);
  } catch (error) {
    next(error);
  }
};

export const addNewPro = async (req, res, next) => {
  const { role, ...data } = req.body;

  try {
    const newPro = new Pro({ data, role });
    const savedPro = await newPro.save();
    res.status(201).json(savedPro);
  } catch (error) {
    next(error);
  }
};

export const updatePro = async (req, res, next) => {
  const { cid } = req;
  const {
    data,
    email_verified,
    role,
    industry,
    languages,
    image_url,
    tasks,
    description,
  } = req.body;

  try {
    const updatedPro = await Pro.findByIdAndUpdate(
      cid,
      {
        "data.first_name": data.first_name,
        "data.email": data.email,
        "data.street": data.street,
        "data.zip": data.zip,
        "data.city": data.city,
        "data.country": data.country,
        "data.phone_number": data.phone_number,
        image_url,
        email_verified,
        role,
        languages,
        industry,
        tasks,
        description,
      },
      { new: true }
    );
    if (!updatedPro) {
      throw { statusCode: 404, message: "Pro not found" };
    }
    res.json(updatedPro);
  } catch (error) {
    next(error);
  }
};

// export const addTagToPro = async (req, res, next) => {
//   const { id } = req.body;
//   const { tag } = req.body;

//   try {
//     const pro = await Pro.findById(id);
//     if (!pro) {
//       throw { statusCode: 404, message: "Pro not found" };
//     }
//     pro.tags.push(tag);
//     const updatePro = await pro.save();
//     res.json(updatePro);
//   } catch (error) {
//     next(error);
//   }
// };

export const deletePro = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Pro.findByIdAndDelete(id);
    res.json({ message: "Pro was deleted" });
  } catch (error) {
    next(error);
  }
};
