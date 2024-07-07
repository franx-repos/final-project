import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import GanttChart from "../user-area/GanttChart";
import { useAuth } from "../../context/UserProvider";
import UpdateTask from "./UpdateTask";
import CreateTask from "./CreateTask";

const styles = {
  th: "px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400 dark:bg-[#1f2937]",
  td: "text-left py-5 border-b max-w-10 overflow-clip border-b-gray-200 text-wrap dark:border-x-0 dark:border-r-white dark:border dark:bg-[#1f2937]  bg-white text-sm",
  button:
    "text-white bg-teal-500 hover:bg-teal-700 focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700",
  tdP: "text-gray-900 whitespace-no-wrap dark:text-gray-300",
};

const Taskoverview = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData, checkUser } = useAuth();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState({});

  const fetchTasks = async () => {
    try {
      const taskIds = userData.tasks;
      //TaskIds kommt aus userData, also useAuth, dies wird nicht neu geladen, daher auch nicht die taskIds
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

  useEffect(() => {
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

  const toggleModal = () => {
    setIsCreateTaskOpen(!isCreateTaskOpen);
  };
  const toggleUpdateModal = (entry) => {
    setEntryToUpdate(entry);
    setIsUpdateTaskOpen(!isUpdateTaskOpen);
  };

  return (
    <div className="w-full dark:text-white dark:bg-[#1f2937] rounded-md">
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
                        <p className={styles.tdP}>{entry.content.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.tdP}>{entry.content.description}</p>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.tdP}>{entry.content.industry}</p>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.tdP}>
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
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between dark:bg-[#1f2937]">
            <div className="inline-flex mt-2 xs:mt-0">
              <button onClick={toggleModal} className={styles.button}>
                Create New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreateTask
        isCreateTaskOpen={isCreateTaskOpen}
        toggleModal={toggleModal}
        checkUser={checkUser}
      />
      <UpdateTask
        isUpdateTaskOpen={isUpdateTaskOpen}
        toggleUpdateModal={toggleUpdateModal}
        entryToUpdate={entryToUpdate}
        checkUser={checkUser}
      />
    </div>
  );
};

export default Taskoverview;
