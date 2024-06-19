import Client from "../models/clientsSchema.js";

export const getAllClients = async (req, res, next) => {
  try {
    const client = await Client.find();
    if (!client.length) {
      throw { statusCode: 404, message: "Client not found" };
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      throw { statusCode: 404, message: "Client not found" };
    }
    res.json(client);
  } catch (error) {}
};

export const addNewClient = async (req, res, next) => {
  const { sowo_id, name, house, timeOfArrival } = req.body;

  try {
    const newClient = new Client({ sowo_id, name, house, timeOfArrival });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  const { id } = req.params;
  const { sowo_id, name, house } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { sowo_id, name, house, timeOfArrival },
      { new: true }
    );
    if (!updatedClient) {
      throw { statusCode: 404, message: "Client not found" };
    }
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const addTagToClient = async (req, res, next) => {
  const { id } = req.body;
  const { tag } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      throw { statusCode: 404, message: "Client not found" };
    }
    client.tags.push(tag);
    const updateClient = await client.save();
    res.json(updateClient);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndDelete(id);
    res.json({ message: "Client was deleted" });
  } catch (error) {
    next(error);
  }
};
