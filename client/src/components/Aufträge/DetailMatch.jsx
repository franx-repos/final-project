import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const styles = {
  label:
    "flex pl-2 text-gray-700 text-sm font-bold mb-1 dark:bg-[#1f2937] dark:text-gray-400",
};

const DetailMatch = ({
  isUpdateTaskOpen,
  toggleUpdateModal,
  entryToUpdate,
  checkUser,
  userData, 
}) => {
  useEffect(() => {
  }, [entryToUpdate]);

  const deploy = import.meta.env.VITE_DEPLOY_URL;

  const acceptTask = async (_id) => {
    try {
      const proId = userData._id;
      const name = userData.data.first_name;
      const newtasks = [...userData.tasks, _id];
      console.log(name, proId, newtasks)
      const response = await axios.patch(
        `${deploy}/tasks/${_id}`,
        {
          content: {
            status: 'IN PROGRESS',
            assigned_to: proId,
          },
        },
        { withCredentials: true }
      );

      const responsepro = await axios.patch(
        `${deploy}/pros`,
        {
          data: {
            first_name: name
          },
          tasks: newtasks
        },
        { withCredentials: true }
      );

      console.log('Response from PATCH request to /pros:', responsepro);
      console.log('Response from put request to /tasks:', response);

      if (responsepro.status === 200) {
        console.log("Professional updated with task.");
        checkUser();
      }
    } catch (error) {
      console.error('Error in PATCH request to /pros:', error);
      setError(error.message || "Something went wrong");
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
                <label className={styles.label}>
                  Title: {entryToUpdate?.content?.title || ""}
                </label>
              </div>
              <div className="py-5 max-full border-b-gray-200 text-wrap  bg-white text-sm dark:bg-[#1f2937] dark:text-gray-400">
                <label className={styles.label}>
                  Description: {entryToUpdate?.content?.description || ""}
                </label>
              </div>
              <div className="flex items-stretch">
                <div className="w-full mr-2 overflow-clip border-b-gray-200 text-wrap bg-white text-sm dark:bg-[#1f2937]">
                  <label className={styles.label}>
                    Industry: {entryToUpdate?.content?.industry || ""}
                  </label>
                </div>
                <div className="w-full ml-2">
                  <label className={styles.label}>
                    Job Type: {entryToUpdate?.content?.task_type || ""}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="px-5 py-5 border-gray-200 bg-white text-sm dark:bg-[#1f2937]">
                <p className="flex text-gray-900 whitespace-no-wrap dark:text-gray-400">
                  Date Created:
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
            <div className="buttons flex justify-end mt-4">
              <button
                onClick={() => acceptTask(entryToUpdate._id)}
                type="button"
                className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm  px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
              >
                Accept Task
              </button>
              <button
                type="button"
                className="text-white bg-red-500 hover:bg-red-700  focus:outline-none font-medium rounded-lg text-sm ml-4 px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-700"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DetailMatch;