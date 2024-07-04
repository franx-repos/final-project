import NavigationTop from "../NavigationTop";
import CreatTask from "./CreatTask";
import Taskoverview from "./Taskoverview";
import UPdateTask from "./UpdateTask";
function AuftragÜbersicht() {
  return (
    <>
      <NavigationTop />
      <div className="flex">
        <div className="flex flex-col">
          <div className=" w-full">
            <CreatTask />
          </div>

          <div className="w-full">
            <Taskoverview />
          </div>
          <div>
            <UPdateTask />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuftragÜbersicht;
