import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-gray-700'>404 Not Found</h1>
        <Link to='/Dashboard'>
          
            <button className="text-white bg-teal-500 mt-3 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
          >
            GO BACK
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
