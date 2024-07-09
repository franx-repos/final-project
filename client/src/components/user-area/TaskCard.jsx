import React, { useState } from "react"; 
import DetailMatch from "../Aufträge/DetailMatch";
import { useAuth } from "../../context/UserProvider";

const styles = {
  wrapper: "p-4 text-center bg-white border border-gray-200 rounded-md shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700",
  heading: "mb-2 text-3xl font-bold text-gray-900 dark:text-white",
  card: "max-w-64 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto",
  cardHeading: "mb-2 text-xl tracking-tight text-gray-900 dark:text-white",
  button: "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 hover:bg-teal-700 rounded-md focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
  types: "mb-2 text-base text-gray-500 dark:text-gray-400",
  p: "h-28 flex mb-3 font-normal text-gray-700 dark:text-gray-400 scrollbar-thin overflow-auto",
};

const TaskCard = ({
  task_id,
  title,
  industry,
  create_date,
  task_type,
  description,
  created_by,
}) => {
  const [isDetailMatchOpen, setIsDetailMatchOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState(null);
  const { checkUser } = useAuth();

  const toggleUpdateModal = (entry) => {
    setEntryToUpdate(entry);
    setIsDetailMatchOpen(!isDetailMatchOpen);
  };

  const task = {
    task_id,
    title,
    industry,
    create_date,
    task_type,
    description,
    created_by,
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.cardHeading}>{title}</h5>
      <div className={styles.types}>
        <strong>Industry:</strong> {industry}
      </div>
      <div className={styles.types}>
        <strong>Created:</strong> {create_date}
      </div>
      <div className={styles.types}>
        <strong>Task:</strong> {task_type}
      </div>
      <div className="flex justify-evenly">
        <button
          type="button"
          onClick={() => toggleUpdateModal(task_id)}
          className={styles.button}
        >
          Details
        </button>
      </div>
      {isDetailMatchOpen && (
        <DetailMatch
          isUpdateTaskOpen={isDetailMatchOpen}
          toggleUpdateModal={() => setIsDetailMatchOpen(false)}
          entryToUpdate={entryToUpdate}
          checkUser={checkUser}
        />
      )}
    </div>
  );
};

export default TaskCard;