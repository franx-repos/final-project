import NavigationTop from "../NavigationTop";
import AuftragÜbersichtSidebar from "./SidebarOr";
import CreatTask from "./CreatTask";
import Taskoverview from "./Taskoverview";
function AuftragÜbersicht() {
  return (
    <>
      <NavigationTop />
      <div className="flex">
        <AuftragÜbersichtSidebar />
        <div className="flex flex-col">
        <div className=" w-full">
          <CreatTask />
        </div>
        
        <div className="w-full">
          <Taskoverview />
        </div>
        </div>
      </div>
    </>
  );
}

export default AuftragÜbersicht;
