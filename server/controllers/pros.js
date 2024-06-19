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

export const addNewPro = async (req, res, next) => {
  const { sowo_id, name, house, timeOfArrival } = req.body;

  try {
    const newPro = new Pro({ sowo_id, name, house, timeOfArrival });
    const savedPro = await newPro.save();
    res.status(201).json(savedPro);
  } catch (error) {
    next(error);
  }
};

export const updatePro = async (req, res, next) => {
  const { id } = req.params;
  const { sowo_id, name, house } = req.body;

  try {
    const updatedPro = await Pro.findByIdAndUpdate(
      id,
      { sowo_id, name, house, timeOfArrival },
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

export const addTagToPro = async (req, res, next) => {
  const { id } = req.body;
  const { tag } = req.body;

  try {
    const pro = await Pro.findById(id);
    if (!pro) {
      throw { statusCode: 404, message: "Pro not found" };
    }
    pro.tags.push(tag);
    const updatePro = await pro.save();
    res.json(updatePro);
  } catch (error) {
    next(error);
  }
};

export const deletePro = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Pro.findByIdAndDelete(id);
    res.json({ message: "Pro was deleted" });
  } catch (error) {
    next(error);
  }
};
