import ThemeToggle from "../ThemeToggle";

function DashboardHeader(currentLocation) {
  console.log(currentLocation);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-full rounded-md mb-3 p-2 bg-white dark:bg-[#1f2937]">
          <h2 className="heading font-bold text-2xl m-1 text-gray-800 dark:text-white">
            {currentLocation.currentLocation}
          </h2>
          <div className="flex ml-auto">
            <button
              type="button"
              className="flex text-sm bg-gray-900 rounded-full md:me-3 p-1 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              // aria-expanded={isDropdownOpen}
              // onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
