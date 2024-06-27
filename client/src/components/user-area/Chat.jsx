import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import DashboardSidebar from "./Sidebar";

function Chat() {
  return (
    <>
      <ThemeToggle />
      <NavigationTop />
      <DashboardSidebar />
    </>
  );
}

export default Chat;
