import ThemeToggle from "../ThemeToggle";
import UserDropdown from "../UserDropdown";

function DashboardHeader(currentLocation) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-full rounded-md mb-3 p-2 bg-white dark:bg-[#1f2937]">
          <h2 className="heading font-bold text-2xl m-1 text-gray-800 dark:text-white">
            {currentLocation.currentLocation}
          </h2>
          <div className="flex ml-auto">
            <UserDropdown />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
