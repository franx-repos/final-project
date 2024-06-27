import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import GanttChart from "./GanttChart";
import DashboardSidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <ThemeToggle />
      <NavigationTop />
      <div className="flex">
        <DashboardSidebar />
        <GanttChart />
      </div>
    </>
  );
}

export default Dashboard;
