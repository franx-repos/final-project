import axios from "axios";
const deploy = import.meta.env.VITE_DEPLOY_URL;
const styles = {
  wrapper:
    "p-4 text-center bg-white border border-gray-200 rounded-md shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  ",
  heading: "mb-2 text-3xl font-bold text-gray-900 dark:text-white ",
  card: "max-w-64 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto h-[15rem] ",
  cardHeading: "mb-2 text-xl tracking-tight text-gray-900 dark:text-white ",
  button:
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 hover:bg-teal-700 rounded-md focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
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
  const createChat = async () => {
    // console.log(`Task ${task_id} was created by ${created_by}`);
    try {
      const response = await axios.post(
        `${deploy}/chats`,
        {
          client: created_by,
          task: task_id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.card}>
      <h5 className={styles.cardHeading}>{title}</h5>
      <div className={styles.types}>
        <strong>Industry:</strong> {industry}
      </div>
      <div className={styles.types}>
        <strong>Created: </strong>
        {create_date}
      </div>
      <div className={styles.types}>
        <strong>Task:</strong> {task_type}
      </div>
    </div>
  );
};

export default TaskCard;
