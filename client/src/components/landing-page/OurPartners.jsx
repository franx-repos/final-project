import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import taxConsultant from "../../assets/tax_consultant1.jpg";

function OurPartners() {
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deploy = import.meta.env.VITE_DEPLOY_URL;

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const response = await axios.get(`${deploy}/pros`, {
          withCredentials: true,
        });
        setPros(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPro();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // useEffect(() => {
  //  console.log(pros);
  // }, [pros]);

  const settings = {
    className:
      "flex flex-wrap w-full space-x-4 gap-8 mb-6 lg:mb-6 lg:space-x-8 lg:gap-8 lg:flex-row lg:w-full lg:space-x-4 lg:gap-8 rounded-md dark:border-gray-700",
    dots: true,
    infinitfalse: false,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <section className="bg-slate-200/90 dark:bg-gray-900/80 ">
      <div className="py-6 px-4 mx-auto max-w-screen-xl lg:py6 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Partners
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore Our tax experts specialized in various areas to meet diverse
            client needs
          </p>
        </div>
        <div className="w-full p-1">
          <Slider {...settings}>
            {pros.map((pro, index) => (
              <div
                key={index}
                className="flex flex-col justify-center max-w-[15rem] max-h-[30rem] overflow-hidden my-2 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 "
              >
                <div className="flex">
                  <a href="#">
                    <img
                      className="h-28 rounded-tl-md"
                      src={taxConsultant}
                      alt="Foto"
                    />
                  </a>
                  <a href="#" className="flex mx-auto">
                    <h2 className="self-center m-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {pro.data.first_name} {pro.data.last_name}
                    </h2>
                  </a>
                </div>
                <div className="mt-2 p-2">
                  <p className="h-28 flex mb-3 font-normal text-gray-700 dark:text-gray-400 scrollbar-thin overflow-auto">
                    {pro.description}
                  </p>
                </div>

                <div className="flex items-center mb-3">
                  <svg
                    // className="w-4 h-4 text-yellow-300 ms-1"
                    className="w-4 h-4 text-gray-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    // className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    className="w-4 h-4 text-gray-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default OurPartners;
