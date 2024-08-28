import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuth } from "../../context/UserProvider";
import { Link } from "react-router-dom";
const deploy = import.meta.env.VITE_DEPLOY_URL;

const styles = {
  label:
    "flex pl-2 text-gray-700 text-sm font-bold mb-1 dark:bg-[#1f2937] dark:text-gray-400",
};

const TaskDetail = ({
  isTaskDetailOpen,
  toggleDetailModal,
  entryToShow,
  checkUser,
  currentLocation,
  setCurrentLocation,
}) => {
  const { userData } = useAuth();

  // useEffect(() => {
  //   console.log(entryToShow);
  // }, [entryToShow]);

  const handleStatus = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-green-200 text-green-800";
      case "IN PROGRESS":
        return "bg-yellow-200 text-yellow-800";
      case "CLOSED":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  return isTaskDetailOpen ? (
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
                  onClick={toggleDetailModal}
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
                  Title: {entryToShow?.content?.title || ""}
                </label>
              </div>
              <div className="py-5 max-full border-b-gray-200 text-wrap  bg-white text-sm dark:bg-[#1f2937] dark:text-gray-400">
                <label className={styles.label}>
                  {entryToShow?.content?.description || ""}
                </label>
              </div>
              <div className="flex items-stretch">
                <div className="w-full mr-2 overflow-clip border-b-gray-200 text-wrap bg-white text-sm dark:bg-[#1f2937]">
                  <label className={styles.label}>
                    Industry: {entryToShow?.content?.industry || ""}
                  </label>
                </div>
                <div className="w-full ml-2">
                  <label className={styles.label}>
                    Job Type: {entryToShow?.content?.task_type || ""}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="px-5 py-5 border-gray-200 bg-white text-sm dark:bg-[#1f2937]">
                <p className="flex text-gray-900 whitespace-no-wrap dark:text-gray-400">
                  Date Created:
                  <span className="ml-2">
                    {entryToShow.content.create_date
                      ? format(
                          new Date(entryToShow.content.create_date),
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
                    entryToShow.content.status
                  )}`}
                >
                  {entryToShow.content.status}
                </span>
              </div>
            </div>
            <div>
              {entryToShow.documents.length > 0 ? (
                entryToShow.documents.map((document) => {
                  // console.log(document);
                  return (
                    <div
                      className="rounded-md flex justify-between p-2"
                      key={document._id}
                    >
                      {document.documentstitle.includes(".pdf") ? (
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="-3 0 24 24"
                          id="meteor-icon-kit__solid-file"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 6H5C5.55228 6 6 5.55228 6 5V0H16C17.1046 0 18 0.89543 18 2V22C18 23.1046 17.1046 24 16 24H2C0.89543 24 0 23.1046 0 22V6zM0.34141 4C0.94398 2.29517 2.29517 0.943981 4 0.341411V4H0.34141z"
                            fill="#758CA3"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          id="meteor-icon-kit__solid-image"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3 22H21C21.5523 22 22 21.5523 22 21V17L17.7071 12.7071C17.3166 12.3166 16.6834 12.3166 16.2929 12.7071L10.5 18.5C10.2239 18.7761 9.77614 18.7761 9.5 18.5C9.22386 18.2239 9.22386 17.7761 9.5 17.5L11 16L8.70711 13.7071C8.31658 13.3166 7.68342 13.3166 7.29289 13.7071L2 19V21C2 21.5523 2.44772 22 3 22ZM21 24H3C1.34315 24 0 22.6569 0 21V3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V21C24 22.6569 22.6569 24 21 24ZM6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z"
                            fill="#758CA3"
                          />
                        </svg>
                      )}
                      <Link
                        to={document.url}
                        target="_blank"
                        className="grow dark:text-gray-400"
                      >
                        {document.documentstitle}
                      </Link>
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
    </div>
  ) : null;
};

export default TaskDetail;
