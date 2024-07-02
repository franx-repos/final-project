import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import TruncatedText from "./TruncatedText";

const Taskoverview = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    // console.log(entries)
    // console.log(error.message || "Something went wrong")
    console.log("Error:", error.message);
    // console.log("Error:", error.response);
  }, [error]);

  return (
    <div className="mt-10 dark:text-white dark:bg-[#1f2937]">
      <div className="bg-white p-8 rounded-md w-full dark:text-white dark:bg-[#1f2937]">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white dark:text-white dark:bg-[#1f2937]">
              Task Overview
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <button className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700">
                Create New Post
              </button>
            </div>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal ">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    description
                  </th>
                  <th className="px-5 py-3 border-b-2 text-center border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entries._id} className=" hover:bg-gray-700">
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {entry.content.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* <td className="px-5 py-5 border-b max-w-10 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm">
                      <TruncatedText text={entry.content.description} maxLength={100} />
                    </td> */}

                    <td className="px-5 py-5 border-b max-w-10 overflow-clip border-b-gray-200 text-wrap  dark:border-x-0  dark:border-r-white dark:border  bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap truncate ">
                        {entry.content.description}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b max-w-15  overflow-clip border-b-gray-200 text-wrap  dark:border-x-0  dark:border-r-white dark:border  bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {entry.content.industry}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {/* {entry.content.create_date} */}
                        {entry.content.create_date
                          ? format(
                              new Date(entry.content.create_date),
                              "dd MMM yyyy, HH:mm"
                            )
                          : ""}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 rounded-lg font-semibold leading-tight ${handelStutas(
                          entry.content.status
                        )}`}
                      >
                        {entry.content.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700">
                  Create New Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskoverview;
