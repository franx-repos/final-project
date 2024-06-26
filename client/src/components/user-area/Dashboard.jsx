import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import DashboardSidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <ThemeToggle />
      <NavigationTop />
      <DashboardSidebar />
    </>
  );
}

export default Dashboard;
