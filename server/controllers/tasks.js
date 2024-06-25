import Task from "../models/tasksSchema.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const task = await Task.find();
    if (!task.length) {
      throw { statusCode: 404, message: "Task not found" };
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const CreateTask = async (req, res, next) => {
  // const {title,deadline,task_type,industry,description,created_by,...documents} = req.body;
  // const {content,...documents} = req.body;
  const { content } = req.body;
  console.log(content);
  // console.log(documents)
  try {
    // const newTask = new Task({title,deadline,task_type,industry,description,created_by,documents} );
    const newTask = new Task({ content });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

// export const updateTask = async (req, res, next) => {
//   const { id } = req.params;
//   const { content, documents } = req.body;
//   // const { title,deadline,task_type,industry,description,created_by,...documents} = req.body;
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { content, documents },
//       { new: true }
//     );
//     if (!updatedTask) {
//       throw { statusCode: 404, message: "Task not found" };
//     }
//     res.json(updatedTask);
//   } catch (error) {
//     next(error);
//   }
// };

//mit multer und cloudinary
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { documentstitle, icon, title } = req.body;
  const documents = { documentstitle, icon };
  const content = { title };
  console.log(documents);
  console.log(content);
  try {
    if (req.file) {
      const url = req.file.path;
      console.log(url);
      documents.url = url;
    }

    const task = await Task.findById(id);

    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }

    let keys = Object.keys(content);

    keys.map((x) => {
      task.content[x] = content[x];
    });
    if (req.file) {
      task.documents.push(documents); // document zum alten hinzufügen
      console.log(documents);
    }

    //Delete Document

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task was deleted" });
  } catch (error) {
    next(error);
  }
};
