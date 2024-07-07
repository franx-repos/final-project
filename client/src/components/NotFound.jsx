import { Link } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";
import NavigationTop from "./NavigationTop";

function NotFound() {
  return (
    <>
      <NavigationTop />
      <ParticlesBackground />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-400">404 Not Found</h1>
          <Link to="/">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold p-2 mt-2 rounded-lg">
              GO BACK
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
