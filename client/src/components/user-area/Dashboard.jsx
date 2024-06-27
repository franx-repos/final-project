import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import GanttChart from "./GanttChart";
import DashboardSidebar from "./Sidebar";

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
  return (
    <>
      <div className="bg-white border-gray-200 dark:bg-gray-900">
        <ThemeToggle />
        <NavigationTop />
        <div className="flex">
          <DashboardSidebar />
          <div style={{ width: "100%", height: "500px" }}>
            <GanttChart tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
