import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TaskCard from "./TaskCard";

const deploy = import.meta.env.VITE_DEPLOY_URL;

const styles = {
  wrapper:
    "p-4 text-center bg-white border border-gray-200 rounded-md shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700",
  heading: "mb-2 text-3xl font-bold text-gray-900 dark:text-white",
  card: "max-w-64 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto",
  cardHeading: "mb-2 text-xl tracking-tight text-gray-900 dark:text-white",
  button:
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 hover:bg-teal-700 rounded-md focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
  types: "mb-2 text-base text-gray-500 dark:text-gray-400",
  p: "h-28 flex mb-3 font-normal text-gray-700 dark:text-gray-400 scrollbar-thin overflow-auto",
};

function OpenTasksSlider() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${deploy}/tasks/open_free`, {
          withCredentials: true,
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

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const settings = {
    className: "flex justify-between",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // const createChat = async () => {
  //   // console.log(task);
  //   try {
  //     const response = await axios.post(`http://localhost:8001/chats`,{
  //       client: task.created_by,
  //       task: task._id
  //     })
  //   } catch (error) {

  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.heading}>Available Tasks</h5>
      <div className="w-full p-3">
        <Slider {...settings}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task_id={task._id}
              title={task.content.title}
              industry={task.content.industry.join(", ")}
              create_date={task.content.create_date.split("T")[0]}
              task_type={task.content.task_type.join(", ")}
              description={task.content.description}
              created_by={task.content.created_by}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default OpenTasksSlider;
