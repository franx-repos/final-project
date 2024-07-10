import Chat from "./Chat";
import Taskoverview from "../Aufträge/Taskoverview";
import UserProfile from "./UserProfile";
import MatchingPage from "../Aufträge/MatchingPage";
import { useEffect } from "react";

const DashboardContainer = ({
  currentLocation,
  setCurrentLocation,
  userData,
}) => {
  const role = userData?.data?.role;

  useEffect(() => {
    console.log("Location: " + currentLocation);
    if (role === "client" && currentLocation === "Dashboard") {
      setCurrentLocation("Task Overview");
    }
  }, [currentLocation, role, setCurrentLocation]);

  switch (currentLocation) {
    case "Dashboard":
      return (
        <MatchingPage
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
      );
    case "Chat":
      return <Chat />;
    case "Task Overview":
      return <Taskoverview />;
    case "User Profile":
      return <UserProfile />;
    default:
      return null;
  }
};

export default DashboardContainer;
