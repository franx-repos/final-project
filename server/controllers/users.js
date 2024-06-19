import User from "../models/usersSchema.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user.length) {
      throw { statusCode: 404, message: "User not found" };
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    res.json(user);
  } catch (error) {}
};

export const addNewUser = async (req, res, next) => {
  const { sowo_id, name, house, timeOfArrival } = req.body;

  try {
    const newUser = new User({ sowo_id, name, house, timeOfArrival });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { sowo_id, name, house } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { sowo_id, name, house, timeOfArrival },
      { new: true }
    );
    if (!updatedUser) {
      throw { statusCode: 404, message: "User not found" };
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const addTagToUser = async (req, res, next) => {
  const { id } = req.body;
  const { tag } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    user.tags.push(tag);
    const updateUser = await user.save();
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User was deleted" });
  } catch (error) {
    next(error);
  }
};
