import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const styles = {
  container: `max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 border-y-2 border-teal-500 shadow-2xl`,
  logo: "flex items-center ml-2 space-x-3 rtl:space-x-reverse",
  button: `text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700`,
  userButton:
    "flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",
  userImage: "w-8 h-8 rounded-full",
  dropdown:
    "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600",
  dropdownOpen: "block", // Tailwind class for displaying the dropdown
  dropdownItem:
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
  dropdownInfo: "px-4 py-3",
  dropdownName: "block text-sm text-gray-900 dark:text-white",
  dropdownEmail: "block text-sm text-gray-500 truncate dark:text-gray-400",
  toggleButton:
    "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
  menuIcon: "w-5 h-5",
  nav: "items-center justify-between w-full md:flex md:w-auto md:order-1",
  navList:
    "flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700",
  activeMenuItem:
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-teal-700 md:p-0 md:dark:text-teal-300",
  menuItem:
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-teal-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
};

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [streetN, setStreetN] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [Tax_id, setTax_id] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const deploy = import.meta.env.VITE_DEPLOY_URL;
    // ${deploy}

    
if(client === false){
    try {
      const response = await axios.post(
        `http://localhost:8001/clients/`,
       
        {
          firstname,
          lastname,
          streetN,
          city,
          zip,
          country,
          Tax_id,
          telefon,
          email,
          password,
        },
        // { withCredentials: true }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Registration failed");
    }}

    else{
      handleRegisterprofi(e);
    }

  };

  const handleRegisterprofi = async (e) => {
    e.preventDefault();
    const deploy = import.meta.env.VITE_DEPLOY_URL;
    try {
      const response = await axios.post(
        `${deploy}/pros/`,
        {
          firstname,
          lastname,
          streetN,
          city,
          zip,
          country,
          telefon,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Registration failed");
    }
  };


  // useEffect(() => {
  //   console.log(client);
  // }, [client]);

  
  return (
    <form onSubmit={handleRegister} className="bg-slate-300 rounded-3xl p-6 bg-opacity-50 dark:bg-[#111827] dark:bg-opacity-50">
      <ThemeToggle />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800mb-2">
          Personal Registrierung
          </h2>

          <ul className="segmented-control shadow-sm shadow-gray-900 ">
            <li className="segmented-control__item ">
              <a href="#">
                <input
                  className="segmented-control__input "
                  type="radio"
                  value="1"
                  name="option"
                  id="option-1"
                  onClick={() => setClient(false)}
                  checked={!client}
                />
                <label className="segmented-control__label  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 " htmlFor="option-1">
                  Client
                </label>
              </a>
            </li>
            <li className="segmented-control__item">
              <a href="#">
                <input
                  className="segmented-control__input"
                  type="radio"
                  value="2"
                  name="option"
                  id="option-2"
                  onClick={() => setClient(true)}
                />
                <label className="segmented-control__label dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" htmlFor="option-2">
                  Professional
                </label>
              </a>
            </li>
          </ul>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {!client && (
              <div className="sm:col-span-3">
                <label
                  htmlFor="tax-id"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  TAX ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tax-id"
                    id="tax-id"
                    autoComplete="tax-id"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={Tax_id}
                    onChange={(e) => setTax_id(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="sm:col-span-3">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="phone-number"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Albania</option>
                  <option>Andorra</option>
                  <option>Belgium</option>
                  <option>Bosnia and Herzegovina</option>
                  <option>Bulgaria</option>
                  <option>Denmark</option>
                  <option>Germany</option>
                  <option>Estonia</option>
                  <option>Finland</option>
                  <option>France</option>
                  <option>Greece</option>
                  <option>Ireland</option>
                  <option>Iceland</option>
                  <option>Italy</option>
                  <option>Kosovo</option>
                  <option>Croatia</option>
                  <option>Latvia</option>
                  <option>Liechtenstein</option>
                  <option>Lithuania</option>
                  <option>Luxembourg</option>
                  <option>Malta</option>
                  <option>North Macedonia</option>
                  <option>Moldova</option>
                  <option>Monaco</option>
                  <option>Montenegro</option>
                  <option>Netherlands</option>
                  <option>Norway</option>
                  <option>Austria</option>
                  <option>Poland</option>
                  <option>Portugal</option>
                  <option>Romania</option>
                  <option>San Marino</option>
                  <option>Sweden</option>
                  <option>Switzerland</option>
                  <option>Serbia</option>
                  <option>Slovakia</option>
                  <option>Slovenia</option>
                  <option>Spain</option>
                  <option>Czech Republic</option>
                  <option>Ukraine</option>
                  <option>Hungary</option>
                  <option>Vatican City</option>
                  <option>United Kingdom</option>
                  <option>Belarus</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={streetN}
                  onChange={(e) => setStreetN(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue underline">
            Login here
          </Link>
        </p>
        <Link to="/">
          <button
            type="button"
            // className="inline-block rounded shadow-gray-900 bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            className={styles.button}
         >
            Cancel
          </button>
        </Link>

        <button
          type="submit"
          // className="inline-block rounded shadow-gray-900 bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        className={styles.button}
        >
          REGISTER
        </button>
      </div>
    </form>
  );
}

export default Signup;
