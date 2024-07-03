import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const MatchingPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8001/tasks/open", {
          withCredentials: true
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Find your next Contract</h5>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-5 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"><strong>Task:</strong> {task.content.task_type.join(', ')}</div>
            <div className="mb-2 text-base text-gray-500 dark:text-gray-400"><strong>Industry:</strong> {task.content.industry.join(', ')}</div>
            <div className="mb-2 text-base text-gray-500 dark:text-gray-400"><strong>Created: </strong>{task.content.create_date.split('T')[0]}</div>
            <div className="mb-2 text-base text-gray-500 dark:text-gray-400"><strong>{task.content.title}</strong></div>
            <div className="mb-2 text-base text-gray-500 dark:text-gray-400">{task.content.description}</div>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                Accept
              </button>
              <button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                Contact
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingPage;