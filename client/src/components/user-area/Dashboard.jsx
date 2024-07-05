import NavigationTop from "../NavigationTop";
import GanttChart from "./GanttChart";
import DashboardSidebar from "./Sidebar";
import { useAuth } from "../../context/UserProvider";
import ParticlesBackground from "../ParticlesBackground";
import Signin from "../Signin";
import { Footer } from "flowbite-react";
import { useState } from "react";
import DashboardContainer from "./DashboardContainer";
import DashboardHeader from "./DashboardHeader";

const tasks = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2024-06-01 00:00",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2024-06-02 00:00",
      duration: 3,
      progress: 0.4,
    },
    {
      id: 3,
      text: "Task #3",
      start_date: "2024-05-30 00:00",
      duration: 3,
      progress: 0.4,
    },
    // Weitere Aufgaben hier hinzufügen
  ],
  links: [
    // { id: 1, source: 1, target: 2, type: "0" },
    // Weitere Links hier hinzufügen
  ],
};

function Dashboard() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();

  const [currentLocation, setCurrentLocation] = useState("Dashboard");

  return isLoggedIn ? (
    <>
      <div className="h-screen bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex">
          <DashboardSidebar
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
          />

          <div className="w-5/6 flex-col bg-teal-600 p-3 dark:text-white dark:bg-gray-900">
            <DashboardHeader currentLocation={currentLocation} />
            <DashboardContainer
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
            {/* <div style={{ width: "100%", height: "500px" }}>

          <div style={{ width: "100%", height: "500px" }}>

            <GanttChart tasks={tasks} />
          </div> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <ParticlesBackground />
      <NavigationTop />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
        You are not allowed to enter this page.
      </h2>
      <p className=" m-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">
        Please login first!
      </p>
      <Signin />
    </>
  );
}

export default Dashboard;
