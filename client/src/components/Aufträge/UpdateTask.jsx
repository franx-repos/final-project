import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import NavigationTop from "../NavigationTop";
import Select from 'react-select';

const UpdateTask = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [task_type, setTask_type] = useState([]);
  const [newTask_type, setNewTask_type] = useState([]);
  const [industry, setIndustry] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [create_date, setCreate_date] = useState("");

  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState('');

  const fileInputRef = useRef(null);

  const types = [
    { value: "tax declaration", label: "tax declaration" },
    { value: "insolvency law", label: "insolvency law" },
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      preview: ["jpg", "jpeg", "png", "gif", "pdf", "webp"].includes(
        file.name.split(".").pop().toLowerCase()
      ),
      size:
        file.size > 1024
          ? file.size > 1048576
            ? Math.round(file.size / 1048576) + "mb"
            : Math.round(file.size / 1024) + "kb"
          : file.size + "b",
    }));
    setImages(filePreviews);
    setDocuments;
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setDocuments(documents.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/tasks`, {
          withCredentials: true,
        });
        setEntries(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong with fetching tasks");
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdate = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/tasks/${_id}`,
        {
          title: newTitle,
          description: newDescription,
          industry: newIndustry,
          task_type: newTask_type,
         
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === _id
              ? {
                  ...entry,
                  content: {
                    ...entry.content,
                    title: newTitle,
                    description: newDescription,
                    industry: newIndustry,
                    task_type: newTask_type,
                  },
         
                }
              : entry
          )
        );
        setEditTaskId(null);
        
      }
    } catch (error) {
      setError(error.message || "Something went wrong with updating the task");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/tasks/${_id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== _id)
        );
      }
    } catch (error) {
      setError(error.message || "Something went wrong with deleting the task");
    }
  };

  const handleSaveChanges = async (_id) => {
    // Implement save changes logic here
    console.log("Save changes for task with ID:", _id);
  };

  const handleStatus = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-green-200 text-green-800";
      case "SUSPENDED":
        return "bg-yellow-200 text-yellow-800";
      case "CLOSED":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };


  useEffect(() => {
    console.log("Error:", error.message);
    console.log(newTitle, newDescription, newIndustry, newTask_type);
  }, [error, newTitle, newDescription, newIndustry, newTask_type]);

  return (
    <div>
      <NavigationTop />
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white dark:text-white dark:bg-[#1f2937]">
        Task
      </div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
        {entries.map((entry) => (
          <div key={entry._id} className="border-2 border-gray-800 mb-3">
            <div className="px-5 py-5 border-b bg-white text-sm text-center">
              <div className="buttons flex justify-end mb-2">
                <button
                  // onClick={() => setEditTaskId(entry._id)}
                  onClick={() => {
                    setEditTaskId(entry._id);
                    setNewTitle(entry.content.title); // Setze den neuen Titel beim Klick auf "Edit"
                    setNewDescription(entry.content.description); // Setze die neue Beschreibung beim Klick auf "Edit"
                    setNewIndustry(entry.content.industry); // Setze die neue Branche beim Klick auf "Edit"
                    setNewTask_type(entry.content.task_type); // Setze den neuen Task-Typ beim Klick auf "Edit"
                     setDocuments(entry.documents); // Setze die neuen Dokumente beim Klick auf "Edit"
                  }}
                  type="button"
                  className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
              {editTaskId === entry._id ? (
                <>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="px-5 py-5 border-b max-full border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                    <textarea
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full px-2 py-2 border border-gray-300 h-[14rem] rounded-md"
                    />
                  </div>
                  <div className="px-5 py-5 border-b max-w-15 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                    <input
                      type="text"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <div className="mt-2">
                      <Select
                        options={types}
                        value={types.find((type) => type.value === newTask_type)}
                        onChange={(selectedOption) =>
                          setNewTask_type(selectedOption.value)
                        }
                        placeholder="Choose one of the following"
                      />
                    </div>
                  </div>



                  <div className="buttons flex justify-end mb-2">
                    <button
                      onClick={() => handleUpdate(entry._id)}
                      type="button"
                      className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 text-xl font-semibold text-center">
                        {entry.content.title}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-5 border-b max-full border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {entry.content.description}
                    </p>
                  </div>
                  <div className="px-5 py-5 border-b max-w-15 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      Industry
                    </label>
                    <p className="text-gray-900 whitespace-no-wrap text-xl">
                      {entry.content.industry}
                    </p>
                  </div>

                  <div className="px-5 py-5 border-b max-w-15 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                    <label
                      htmlFor="task_type"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      Type
                    </label>
                    <p className="text-gray-900 whitespace-no-wrap text-xl">
                      {entry.content.task_type}
                    </p>
                  </div>

                
                </>
              )}
            </div>

            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {entry.content.create_date
                  ? format(
                      new Date(entry.content.create_date),
                      "dd MMM yyyy, HH:mm"
                    )
                  : ""}
              </p>
            </div>

            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                className={`relative inline-block px-3 py-1 rounded-lg font-semibold leading-tight ${handleStatus(
                  entry.content.status
                )}`}
              >
                {entry.content.status}
              </span>
            </div>

               {/* Add the documents here  */}
            <div className="icons flex text-gray-500 m-2">
              <label id="select-image">
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <input
                  hidden
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  value={file}
                />
              </label>
              {/* <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div> */}
            </div>

            {/* Preview image here */}
            <div id="preview" className="my-4 flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 object-cover rounded"
                >
                  {image.preview ? (
                    <div className="relative w-32 h-32 object-cover rounded">
                      <img
                        src={image.url}
                        className="w-32 h-32 object-cover rounded"
                        alt={image.name}
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
                      >
                        <span className="mx-auto">×</span>
                      </button>
                      <div className="text-xs text-center p-2">
                        {image.size}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-32 h-32 object-cover rounded">
                      <svg
                        className="fill-current w-32 h-32 ml-auto pt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                      </svg>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
                      >
                        <span className="mx-auto">×</span>
                      </button>
                      <div className="text-xs text-center p-2">
                        {image.size}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateTask;
