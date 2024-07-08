import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";
import DetailMatch from "./DetailMatch";

const deploy = import.meta.env.VITE_DEPLOY_URL;
const styles = {
  button:
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
  types: "mb-2 text-base text-gray-500 dark:text-gray-400",
};

const MatchingPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, checkUser } = useAuth();
  const [isDetailMatchOpen, setIsDetailMatchOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${deploy}/tasks/open`, {
          withCredentials: true,
        });
        const industry = userData.industry;
        const specialization = userData.specialization;

        const filteredTasks = response.data.filter((task) => {
          const matchIndustry =
            industry.length > 0
              ? industry.some((ind) => task.content.industry.includes(ind))
              : true;
          const matchSpecialization =
            specialization.length > 0
              ? specialization.some((spec) =>
                  task.content.task_type.includes(spec)
                )
              : true;

          return matchIndustry && matchSpecialization;
        });
        setTasks(filteredTasks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userData]);

  const toggleUpdateModal = (entry) => {
    setEntryToUpdate(entry);
    setIsDetailMatchOpen(!isDetailMatchOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Tasks for you
      </h5>
      <div className="flex flex-wrap justify-center">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-4 dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {task.content.title}
            </h5>
            <div className={styles.types}>
              <strong>Industry:</strong> {task.content.industry.join(", ")}
            </div>
            <div className={styles.types}>
              <strong>Created: </strong>
              {task.content.create_date.split("T")[0]}
            </div>
            <div className={styles.types}>
              <strong>Task:</strong> {task.content.task_type.join(", ")}
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {task.content.description}
            </p>
            <div className="flex justify-evenly">
              <button
                type="button"
                onClick={() => toggleUpdateModal(task)}
                className={styles.button}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDetailMatchOpen && (
        <DetailMatch
          isUpdateTaskOpen={isDetailMatchOpen}
          toggleUpdateModal={toggleUpdateModal}
          entryToUpdate={entryToUpdate}
          checkUser={checkUser}
        />
      )}
    </div>
  );
};

export default MatchingPage;