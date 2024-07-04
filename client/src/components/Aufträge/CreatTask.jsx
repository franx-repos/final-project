import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";

const NewPost = ({ isModalOpen, toggleModal }) => {
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

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files).map((file) => ({
  //     url: URL.createObjectURL(file),
  //     name: file.name,
  //     preview: ['jpg', 'jpeg', 'png', 'gif', 'pdf',"webp"].includes(file.name.split('.').pop().toLowerCase()),
  //     size:
  //       file.size > 1024
  //         ? file.size > 1048576
  //           ? Math.round(file.size / 1048576) + 'mb'
  //           : Math.round(file.size / 1024) + 'kb'
  //         : file.size + 'b',
  //   }));
  //   setImages(files);
  //   setDocuments(files);
  // };

  // const handleRemoveImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  //   setDocuments(documents.filter((_, i) => i !== index));
  // };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8001/tasks`,
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

          // documents: documents.map((document) => ({  
          //   documentstitle: document.name,
          //   icon: document.url,
          // })),
        },
        { withCredentials: true }
      );
      // .populate("content.created_by");

          toggleModal();
          toggleModal();
      
      toggleModal();
      
    } catch (error) {
      setError(error.message || "Something went wrong with Login");
      console.log("Error:", error.message);
      console.log("Error:", error.response.data);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  useEffect(() => {
    console.log(
      "title:",
      title,
      "description:",
      description,
      "deadline:",
      deadline,
      "task_type:",
      task_type,
      "industry:",
      industry,
      "create_date:",
      create_date,
      "payment:",
      payment,
      "documents:",
      documents
    );
   
    
  }, [
    title,
    description,
    deadline,
    task_type,
    industry,
    create_date,
    payment,
    documents,
  ]);

  if (!isModalOpen) return null;

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" fixed inset-0  z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-gray-500 bg-opacity-90"
      >
        {" "}
        <div className=" relative p-4 w-full max-w-5xl  max-h-full">
          <form
            className="bg-white shadow p-4 py-8 rounded-lg dark:bg-[#1f2937]"
            onSubmit={handlePost}
          >
            <div className="absolute top-0 right-0  p-4 mr-8 mt-4 ">
              <button
                type="button"
                onClick={toggleModal}
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
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white dark:text-white dark:bg-[#1f2937]">
              New Task
            </div>
            <div className="editor mx-auto  rounded-lg w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
              <input
                className="title bg-gray-200 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
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

              {/* <div className="icons flex text-gray-500 m-2">
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
            />
          </label>
        </div> */}

              {/* <div id="preview" className="my-4 flex">
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
                  <div className="text-xs text-center p-2">{image.size}</div>
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
                  <div className="text-xs text-center p-2">{image.size}</div>
                </div>
              )}
            </div>
          ))}
        </div> */}

              <div className="buttons flex justify-end mt-3">
                <button
                  type="submit"
                  className="text-white bg-teal-500 hover:bg-teal-700 focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPost;
