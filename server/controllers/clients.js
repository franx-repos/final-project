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
  const { role, ...data } = req.body;
  console.log(data);
  console.log(role);
  try {
    const newClient = new Client({ data, role });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
};
//Beispiel für Insomnia oder postman
// {
//   "first_name":"John",
//   "last_name":"Doe",
//   "email": "JohnDoe@email.de",
//   "password":"123445639",
//   "vat_id":"23445",
//   "tax_id":"",
//   "street":"hellostreet 19",
//   "zip":"12345",
//   "city":"Berlin",
//   "role":"client"
// }

export const updateClient = async (req, res, next) => {
  const { id } = req.params;
  const { email_verified, role, industry, languages, ...data } = req.body;
  // console.log(industry);
  console.log(data);
  // console.log(country);
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        first_name: data.first_name,
        email_verified,
        role,
        industry,
        languages,
      },
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
