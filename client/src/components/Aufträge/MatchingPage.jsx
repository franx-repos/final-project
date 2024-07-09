import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";
import DetailMatch from "./DetailMatch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const deploy = import.meta.env.VITE_DEPLOY_URL;
const styles = {
  button:
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
  types: "mb-2 text-base text-gray-500 dark:text-gray-400",
};

const MatchingPage = ({ currentLocation, setCurrentLocation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, checkUser } = useAuth();
  const [isDetailMatchOpen, setIsDetailMatchOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState(null);

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinitfalse: false,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerPadding: "30px",
  };

  useEffect(() => {
    const fetchTasks = async () => {
      let success = false;
      while (!success) {
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
          setError(null);
          success = true;
        } catch (err) {
          setError(err.message);
          setLoading(false);
          await delay(1000);
        }
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
    <div className="w-full p-4 text-center bg-white rounded-md sm:p-8 dark:bg-gray-800">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Tasks for you
      </h5>

      <Slider {...settings}>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="max-w-64 p-4 bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto"
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
      </Slider>

      {isDetailMatchOpen && (
        <DetailMatch
          isUpdateTaskOpen={isDetailMatchOpen}
          toggleUpdateModal={toggleUpdateModal}
          entryToUpdate={entryToUpdate}
          checkUser={checkUser}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
      )}
    </div>
  );
};

export default MatchingPage;
