import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
const UPdateTask = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState(null);
  const [description, sedivescription] = useState("");
  const [newDescription, setNewDescription] = useState(null);
  const [deadline, sediveadline] = useState("");
  const [task_type, setTask_type] = useState("");
  const [industry, setIndustry] = useState("");
  const [create_date, setCreate_date] = useState("");
  const [payment, setPayment] = useState(false);
  const [documents, sedivocuments] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);

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
    sedivocuments((prevDocuments) => [...prevDocuments, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    sedivocuments(documents.filter((_, i) => i !== index));
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
  //   sedivocuments(files);
  // };

  // const handleRemoveImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  //   sedivocuments(documents.filter((_, i) => i !== index));
  // };

  useEffect(() => {
    const fetchTasks = async () => {
      //   const deploy=import.meta.env.VITE_DEPLOY_URL;
      //   console.log(deploy);
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8001/tasks`,
          // {headers:{'Authorization':`bearer${token}`}},
          { withCredentials: true }
        );
        setEntries(response.data);
        //  console.log(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong with Login");
        console.log(error);
      }
    };
    fetchTasks();
  }, [entries]);

  const handelStutas = (status) => {
    if (status === "OPEN") {
      return "bg-green-200 text-green-800";
    } else if (status === "SUSPENDED") {
      return "bg-yellow-200 text-yellow-800";
    } else if (status === "CLOSED") {
      return "bg-red-200 text-red-800";
    }
  };

  const handleUPdatePost = async (_id) => {
    try {
      const response = await axios
        .put(
          `http://localhost:8001/tasks/${_id}`,
          {
            title: newTitle,
            description: newDescription,
            deadline,
            task_type,
            industry,
            create_date,
            payment,
            documents,
          },
          {
            content: {
              title,
              description,
            },
            documents: [documentstitle, url, icon],

            // documents:file.map ((file) => file.url),
          },
          { withCredentials: true }
        )
        .populate("created_by");

      if (response.status === 200) {
        setIsLoggedIn(true);
      }
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



  
  const DeletePost =async(_id)=> {try {
    
    const response = await axios.delete(`http://localhost:8001/tasks/${_id}`);
    if (response.status === 200) {
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error('Error removing task', error);
    
  }} 

  useEffect(() => {
    console.log("title:",title,"description:",description,"deadline:",deadline,"task_type:",task_type,"industry:",industry,
      "create_date:",create_date,"payment:",payment,"documents:",
      documents
    );
    console.log(error);
  }, [title,description,deadline,task_type,industry,create_date,payment,documents,error,]);

  return (
    
      <div className=""
        onSubmit={handleUPdatePost}
      >
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white dark:text-white dark:bg-[#1f2937]">
          Task
        </div>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">

          {entries.map((entry) => (
            <div key={entries._id} className="border-2 border-gray-800 mb-3">
              <div className="px-5 py-5 border-b bg-white text-sm text-center">
          <div className="buttons flex justify-end mb-2 ">
            <button
              type=""
              className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
            >
              Update Post
            </button>
          </div>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-gray-900 text-xl font-semibold text-center">
                      {entry.content.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 border-b max-full  border-b-gray-200 text-wrap  dark:border-x-0  dark:border-r-white dark:border  bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap  ">
                  {entry.content.description}
                </p>
              </div>
              <div className="px-5 py-5 border-b max-w-15  overflow-clip border-b-gray-200 text-wrap  dark:border-x-0  dark:border-r-white dark:border  bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap text-xl">
                  {entry.content.industry}
                </p>
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
                  className={`relative inline-block px-3 py-1 rounded-lg font-semibold leading-tight ${handelStutas(
                    entry.content.status
                  )}`}
                >
                  {entry.content.status}
                </span>
              </div>

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
              <div className="buttons flex justify-end mb-2">
                <button
                onClick={DeletePost(entry._id)}
                  type="submt"
                  className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                 Delete
                </button>
              </div>
              <div className="buttons flex justify-end mb-2">
                <button
                  type="submt"
                  className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                >
                 SAVE CHANGES
                </button>
              </div>
            </div>
          ))}
        </div>
       </div>
    
  );
};
export default UPdateTask;

{
  /* <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              onChange={() => setPayment(true)}
              type="radio"
              value={payment}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Paid
            </label>
          </div> */
}

{
  /* <div className="flex items-center">
            <input
              checked
              id="default-radio-2"
              onChange={() => setPayment(false)}
              type="radio"
              value={payment}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Not Paid
            </label>
          </div> */
}
