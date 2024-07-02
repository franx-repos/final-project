import axios from 'axios';
import { useState, useRef, useEffect } from 'react';


const NewPost = () => {
  const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [task_type, setTask_type] = useState("");
    const [industry, setIndustry] = useState("");
    const [create_date, setCreate_date] = useState("");
    const [payment, setPayment] = useState(false);
    const [documents, setDocuments] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState([]);



  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      preview: ['jpg', 'jpeg', 'png', 'gif','pdf' ].includes(file.name.split('.').pop().toLowerCase()),
      size:
        file.size > 1024
          ? file.size > 1048576
            ? Math.round(file.size / 1048576) + 'mb'
            : Math.round(file.size / 1024) + 'kb'
          : file.size + 'b',
    }));
    setImages(files);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };




    // {
    //     "content": {
    //         "title": "Steuererklärung für Webdev",
    //         "deadline": "2024-10-07T22:00:00.000Z",
    //         "task_type": [
    //             "Steuererklärung"
    //         ],
    //         "industry": [
    //             "IT"
    //         ],
    //         "description": "Brauche naja Steuererklärung",
    //         "create_date": "2024-06-26T07:20:37.128Z",
    //         "payment": false,
    //         "status": "OPEN"
    //     },
    //     "_id": "667bc145a84c56faf70cb0ce",
    //     "documents": [],
    //     "__v": 0
    // }
    const handlePost = async (e) => {
        e.preventDefault();
          try {
            const response = await axios.post(
              `http://localhost:8001/tasks`,
              { 
                content: {  title,
                    description,
                    deadline,
                    task_type,
                    industry,
                    
                    payment},
                    documents :[],
                    
                    // documents:file.map ((file) => file.url),           
            
            },
            { withCredentials: true }
          );
    
          if (response.status === 200) {
            setIsLoggedIn(true);
            
          }
        } 
        
        catch (error) {
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
console.log('title:', title, 'description:', description, 'deadline:', deadline, 'task_type:', task_type, 'industry:', industry, 'create_date:', create_date, 'payment:', payment, 'documents:', documents)
console.log(error)
},[title, description, deadline, task_type, industry, create_date, payment, documents ,error]);


  return (
    <form className="bg-white shadow p-4 py-8 dark:bg-[#1f2937]" onSubmit={handlePost}>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white dark:text-white dark:bg-[#1f2937]">New Task</div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
        <input
          className="title bg-gray-200 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>


<div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="industry"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Industry
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="industry"
                  id="industry"
                  autoComplete="address-level2"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={industry}
                  required
                  onChange={(e)=>setIndustry(e.target.value)}
                />
              </div>
            </div>

<div  className="flex items-center mb-4">
    <input id="default-radio-1" onChange={()=>setPayment(true)} type="radio" value={payment} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Paid</label>
</div>
<div className="flex items-center">
    <input checked id="default-radio-2" onChange={()=>setPayment(false)} type="radio" value={payment} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not Paid</label>
</div>


        {/* Icons */}
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
            <div key={index} className="relative w-32 h-32 object-cover rounded">
              {image.preview ? (
                <div className="relative w-32 h-32 object-cover rounded">
                  <img src={image.url} className="w-32 h-32 object-cover rounded" alt={image.name} />
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
        </div>
        {/* Buttons */}
        <div className="buttons flex justify-end" >
          <button type='submit' className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPost;
