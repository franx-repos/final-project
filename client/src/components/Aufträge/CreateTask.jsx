import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";

const deploy = import.meta.env.VITE_DEPLOY_URL;

const CreateTask = ({ isCreateTaskOpen, toggleModal, checkUser }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [task_type, setTask_type] = useState("");
  const [industry, setIndustry] = useState("");
  const [create_date, setCreate_date] = useState("");
  const [payment, setPayment] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState([]);

  
  const options = [
    { value: "craft", label: "craft" },
    { value: "it", label: "IT" },
    { value: "gastronomy", label: "gastronomy" },
    { value: "privat", label: "privat" },
    { value: "other", label: "other" },
  ];

  const types = [
    { value: "tax declaration", label: "tax declaration" },
    { value: "insolvency law", label: "insolvency law" },
  ];

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      preview: ["jpg", "jpeg", "png", "gif", "pdf"].includes(
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
    setDocuments((prevDocuments) => [...prevDocuments, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${deploy}/tasks`,
        {
          content: {
            title,
            description,
            deadline,
            task_type,
            industry,
            payment,
          },
          documents: [],
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        checkUser();
        toggleModal();
      }
    } catch (error) {
      setError(error.message || "Something went wrong with Login");
      console.log("Error:", error.message);
      if (error.response) {
      }
    }
  };

  if (!isCreateTaskOpen) return null;

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-90"
      >
        {" "}
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <form
            className="bg-white shadow p-4 py-8 rounded-md dark:bg-[#1f2937]"
            onSubmit={handlePost}
          >
            <div className="absolute top-0 right-0 p-6">
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

            <div className="editor mx-auto  rounded-md w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
              <input
                className="title bg-gray-200 border border-gray-300 p-2 mb-4 outline-none rounded-md"
                spellCheck="false"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none rounded-md"
                spellCheck="false"
                placeholder="Describe everything about this post here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Industry
                </label>
                <div className="mt-2">
                  <Select
                    options={options}
                    value={options.find((option) => option.value === industry)}
                    onChange={(selectedOption) =>
                      setIndustry(selectedOption.value)
                    }
                    placeholder="Choose one of the following"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="task_type"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Type
                </label>
                <div className="mt-2">
                  <Select
                    options={types}
                    value={types.find((type) => type.value === task_type)}
                    onChange={(selectedOption) =>
                      setTask_type(selectedOption.value)
                    }
                    placeholder="Choose one of the following"
                  />
                </div>
              </div>
              <div className="buttons flex justify-end mt-3">
                <button
                  type="submit"
                  className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
