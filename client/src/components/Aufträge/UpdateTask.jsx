import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import Select from "react-select";

const styles = {
  label:
    "flex pl-2 text-gray-700 text-sm font-bold mb-1 dark:bg-[#1f2937] dark:text-gray-400",
};

const UpdateTask = ({
  isUpdateTaskOpen,
  toggleUpdateModal,
  entryToUpdate,
  checkUser,
}) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [task_type, setTask_type] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [create_date, setCreate_date] = useState("");

  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    setEditTaskId(entryToUpdate?.content?._id || null);
    setTitle(entryToUpdate?.content?.title || "");
    setDescription(entryToUpdate?.content?.description || "");
    setIndustry(entryToUpdate?.content?.industry || []);
    setTask_type(entryToUpdate?.content?.task_type || []);
    setDocuments(entryToUpdate?.content?.documents || []);
  }, [entryToUpdate]);

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

  const handleUpdate = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/tasks/${_id}`,
        {
          title: title,
          description: description,
          industry: industry,
          task_type: task_type,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        checkUser();
        toggleUpdateModal();
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
      checkUser();
      toggleUpdateModal();
    } catch (error) {
      setError(error.message || "Something went wrong with deleting the task");
    }
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

  return isUpdateTaskOpen ? (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className=" fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-90"
    >
      {" "}
      <div className="relative w-full max-w-3xl mt-8 max-h-full shadow py-8 rounded-md bg-white dark:bg-[#1f2937] overflow-auto">
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800   p-4 max-w-2xl ">
          {/* {entries.map((entry) => ( */}
          <div
            // key={entry._id}
            className="border border-gray-300 p-4 shadow-lg mb-3 rounded-md bg-white dark:bg-[#1f2937]"
          >
            <div className="px-5 py-5 bg-white dark:bg-[#1f2937]  text-sm text-center">
              <div className="absolute top-0 right-0 p-4 ">
                <button
                  type="button"
                  onClick={toggleUpdateModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="flex flex-col">
                <label className={styles.label} htmlFor="username">
                  title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-md "
                />
              </div>
              <div className="py-5 max-full border-b-gray-200 text-wrap  bg-white text-sm dark:bg-[#1f2937] dark:text-gray-400">
                <label className={styles.label} htmlFor="username">
                  description
                </label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 h-[7rem] rounded-md overflow-auto"
                />
              </div>
              <div className="flex items-stretch">
                <div className="w-full mr-2 overflow-clip border-b-gray-200 text-wrap bg-white text-sm dark:bg-[#1f2937]">
                  <label className={styles.label} htmlFor="username">
                    industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md dark:text-gray-400"
                  />
                </div>
                <div className="w-full ml-2">
                  <label className={styles.label} htmlFor="username">
                    job type
                  </label>

                  <Select
                    options={types}
                    value={types.find((type) => type.value === task_type)}
                    // value={task_type}
                    onChange={(selectedOption) =>
                      setTask_type(selectedOption.value)
                    }
                    placeholder="Choose one of the following"
                  />
                </div>
              </div>
              <div className="buttons flex justify-end mt-4">
                <button
                  onClick={() => handleUpdate(entryToUpdate._id)}
                  type="button"
                  className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm  px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => handleDelete(entryToUpdate._id)}
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-700  focus:outline-none font-medium rounded-lg text-sm ml-4 px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="px-5 py-5 border-gray-200 bg-white text-sm dark:bg-[#1f2937]">
                <p className="flex text-gray-900 whitespace-no-wrap dark:text-gray-400">
                  date created:
                  <span className="ml-2">
                    {entryToUpdate.content.create_date
                      ? format(
                          new Date(entryToUpdate.content.create_date),
                          "dd MMM yyyy, HH:mm"
                        )
                      : ""}
                  </span>
                </p>
              </div>
              <div className="flex px-5 py-5 border-gray-200 bg-white text-sm dark:bg-[#1f2937]">
                <p className="dark:text-gray-400">Status:</p>
                <span
                  className={`relative inline-block px-3 py-1 ml-2 rounded-md font-semibold leading-tight ${handleStatus(
                    entryToUpdate.content.status
                  )}`}
                >
                  {entryToUpdate.content.status}
                </span>
              </div>
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
          {/* ))} */}
        </div>
      </div>
    </div>
  ) : null;
};

export default UpdateTask;
