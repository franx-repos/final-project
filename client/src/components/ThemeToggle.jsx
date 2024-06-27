// import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="flex rounded-full bg-yellow-200 dark:bg-teal-500">
      <button onClick={() => darkModeHandler()} className=" p-3">
        {dark && <IoSunny />}
        {!dark && <IoMoon />}
      </button>
    </div>
  );
};
export default ThemeToggle;
