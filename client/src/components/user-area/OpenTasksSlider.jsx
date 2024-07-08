import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        const response = await axios.get(`${deploy}/tasks/open`, {
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

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.heading}>Available Tasks</h5>
      <div className="w-full p-3">
        <Slider {...settings}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.card}>
              <h5 className={styles.cardHeading}>{task.content.title}</h5>
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
              <p className={styles.p}>{task.content.description}</p>
              <div className="flex justify-evenly">
                <a href="#" className={styles.button}>
                  Accept
                </a>
                <a href="#" className={styles.button}>
                  Contact
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default OpenTasksSlider;
