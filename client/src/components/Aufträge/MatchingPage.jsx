import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";

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
  }, []);

  const acceptTask = async (_id) => {
    try {
      const proId = userData._id;
      const name = userData.data.first_name;
      const newtasks = [...userData.tasks, _id];
      const response = await axios.patch(
        `http://localhost:8001/tasks/${_id}`,
        {
          content: {
            status: "IN PROGRESS",
            assigned_to: proId,
          },
        },
        { withCredentials: true }
      );

      const responsepro = await axios.patch(
        `http://localhost:8001/pros`,
        {
          data: {
            first_name: name,
          },

          tasks: newtasks,
        },
        { withCredentials: true }
      );

      console.log("Response from PATCH request to /pros:", responsepro);
      console.log("Response from put request to /tasks:", response);

      if (responsepro.status === 200) {
        console.log("Professional updated with task.");
        checkUser();
      }
    } catch (error) {
      console.error("Error in PATCH request to /pros:", error);
      setError(error.message || "Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(userData.data);
  return (
    // {userData.data.role === "client" ? null}
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Tasks for you
      </h5>
      <div className="flex">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
              <a
                to="#"
                className={styles.button}
                onClick={() => acceptTask(task._id)}
              >
                Accept
              </a>
              <a to="#" className={styles.button}>
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingPage;
