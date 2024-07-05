import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import GanttChart from "../user-area/GanttChart";
import { useAuth } from "../../context/UserProvider";
import NewPost from "./CreatTask";
import UpdateTask from "./UpdateTask";

const styles = {
  th: "px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ",
  td: "text-left py-5 border-b max-w-10 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border bg-white text-sm",
  button:
    "text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700",
};

const Taskoverview = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData } = useAuth();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // let response;
        // if (userData.data && userData.data.role === "client") {
        //   response = await axios.get('http://localhost:8001/clients/me', { withCredentials: true });
        // } else {
        //   response = await axios.get('http://localhost:8001/pros/me', { withCredentials: true });
        // }

        const taskIds = userData.tasks;

        const detailedTasksPromises = taskIds.map((id) =>
          axios.get(`http://localhost:8001/tasks/${id}`, {
            withCredentials: true,
          })
        );

        const detailedTasksResults = await Promise.allSettled(
          detailedTasksPromises
        );

        const detailedTasksData = detailedTasksResults
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data);

        setEntries(detailedTasksData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong with fetching tasks");
        console.log(error);
      }
    };

    fetchTasks();
  }, [userData]);

  const handleStatus = (status) => {
    if (status === "OPEN") {
      return "bg-green-200 text-green-800";
    } else if (status === "SUSPENDED") {
      return "bg-yellow-200 text-yellow-800";
    } else if (status === "CLOSED") {
      return "bg-red-200 text-red-800";
    }
  };

  useEffect(() => {
    console.log("Error:", error.message);
  }, [error]);

  const toggleModal = () => {
    setIsCreateTaskOpen(!isCreateTaskOpen);
  };
  const toggleUpdateModal = (entry) => {
    setEntryToUpdate(entry);
    setIsUpdateTaskOpen(!isUpdateTaskOpen);
  };

  return (
    <div className="w-full dark:text-white dark:bg-[#1f2937]">
      <div className="bg-white p-4 w-full dark:text-white dark:bg-[#1f2937] rounded-md">
        <div className="inline-block min-w-full shadow rounded-md overflow-hidden">
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th className={styles.th}>Order Title</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Industry</th>
                <th className={styles.th}>Created at</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id}>
                  <td className={styles.td}>
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {entry.content.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className="text-gray-900 whitespace-no-wrap truncate">
                      {entry.content.description}
                    </p>
                  </td>
                  <td className={styles.td}>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {entry.content.industry}
                    </p>
                  </td>
                  <td className={styles.td}>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {entry.content.create_date
                        ? format(
                            new Date(entry.content.create_date),
                            "dd MMM yyyy, HH:mm"
                          )
                        : ""}
                    </p>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`relative inline-block px-3 py-1 rounded-lg font-semibold leading-tight ${handleStatus(
                        entry.content.status
                      )}`}
                    >
                      {entry.content.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button
                      type="button"
                      // onClick={toggleUpdateModal}
                      onClick={() => {
                        toggleUpdateModal(entries[index]);
                      }}
                      className={styles.button}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="inline-flex mt-2 xs:mt-0">
              <button onClick={toggleModal} className={styles.button}>
                Create New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewPost isCreateTaskOpen={isCreateTaskOpen} toggleModal={toggleModal} />
      <UpdateTask
        isUpdateTaskOpen={isUpdateTaskOpen}
        toggleUpdateModal={toggleUpdateModal}
        entryToUpdate={entryToUpdate}
        setEntryToUpdate={setEntryToUpdate}
      />
    </div>
  );
};

export default Taskoverview;
