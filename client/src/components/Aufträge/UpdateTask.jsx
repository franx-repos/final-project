import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import Select from "react-select";
import { Link } from "react-router-dom";

const styles = {
  label:
    "flex pl-2 text-gray-700 text-sm font-bold mb-1 dark:bg-[#1f2937] dark:text-gray-400",
  input:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",

  deleteButton:
    "text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
  submitButton:
    "bg-primary-700 hover:bg-teal-500 ring-2 hover:ring-0 ring-teal-500 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 text-gray-900 dark:text-white",
  icon: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
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
  const [task_type, setTask_type] = useState("");
  const [industry, setIndustry] = useState("");
  const [create_date, setCreate_date] = useState("");

  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditTaskId(entryToUpdate?.content?._id || null);
    setTitle(entryToUpdate?.content?.title || "");
    setDescription(entryToUpdate?.content?.description || "");
    setIndustry(entryToUpdate?.content?.industry || "");
    setTask_type(entryToUpdate?.content?.task_type || "");
    setDocuments(entryToUpdate?.documents || []);
  }, [entryToUpdate]);

  // useEffect(() => {
  //   console.log(documents);
  // }, [documents]);

  const fileInputRef = useRef(null);

  const deploy = import.meta.env.VITE_DEPLOY_URL;

  const types = [
    { value: "tax declaration", label: "tax declaration" },
    { value: "insolvency law", label: "insolvency law" },
  ];

  const options = [
    { value: "IT", label: "IT" },
    { value: "Gastronomy", label: "Gastronomy" },
    { value: "Retail", label: "Retail" },
    { value: "Consulting", label: "Consulting" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Construction", label: "Construction" },
    { value: "Education", label: "Education" },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePreview = {
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
      };
      setImages([filePreview]);
      setFile(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages([]);
    // setDocuments([]);
    setFile(null);
  };

  const handleUpdate = async (_id) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("industry", industry);
      formData.append("task_type", task_type);
      // formData.append("documentstitle", title);
      formData.append("icon", "");
      // console.log(formData);

      if (file) {
        // console.log(file);
        formData.append("doc", file);
      }

      const response = await axios.put(`${deploy}/tasks/${_id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        checkUser();
        // toggleUpdateModal();
        // refreshTaskData();
        setDocuments(response.data.documents);
      }
    } catch (error) {
      setError(error.message || "Something went wrong with updating the task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`${deploy}/tasks/${_id}`, {
        withCredentials: true,
      });
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

  const deleteDocument = async (documentID) => {
    // console.log(entryToUpdate);
    let docs = documents.filter((document) => document._id !== documentID);
    // console.log(docs);
    setDocuments(docs);
    try {
      const response = await axios.delete(
        `${deploy}/tasks/${entryToUpdate._id}/${documentID}`,
        {
          withCredentials: true,
        }
      );
      // checkUser();
      // toggleUpdateModal();

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return isUpdateTaskOpen ? (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-90"
    >
      <div className="relative w-full max-w-3xl mt-8 max-h-full shadow py-8 rounded-md bg-white dark:bg-[#1f2937] overflow-auto">
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800   p-4 max-w-2xl ">
          <div className="border border-gray-300 p-4 shadow-lg mb-3 rounded-md bg-white dark:bg-[#1f2937]">
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
                  className={styles.input}
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
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-stretch">
                <div className="w-full mr-2">
                  <label htmlFor="industry" className={styles.label}>
                    Industry
                  </label>

                  <Select
                    options={options}
                    value={options.find(
                      (option) => option.value === industry[0]
                    )}
                    onChange={(selectedOption) =>
                      setIndustry(selectedOption.value)
                    }
                    placeholder="Choose one of the following"
                  />
                </div>
                <div className="w-full ml-2">
                  <label className={styles.label} htmlFor="username">
                    job type
                  </label>

                  <Select
                    className="capitalize"
                    options={types}
                    value={types.find((type) => type.value === task_type[0])}
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
                  className={`relative inline-block px-3 py-1 ml-2 rounded-md font-semibold dark:text-gray-400 leading-tight ${handleStatus(
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
                  className="dark:text-gray-400"
                  hidden
                  type="file"
                  name="doc"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
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
            <div>
              {documents.length > 0 ? (
                documents.map((document) => {
                  return (
                    <div
                      className="rounded-md flex justify-between p-2 dark:text-gray-400"
                      key={document._id}
                    >
                      <Link to={document.url} target="_blank" className="grow">
                        {document.documentstitle}
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteDocument(document._id)}
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
                        <span className="sr-only">Delete Document</span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>No Documents</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
          <div className="text-white">Uploading...</div>
        </div>
      )}
    </div>
  ) : null;
};

export default UpdateTask;
