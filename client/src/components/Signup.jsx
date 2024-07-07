import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationTop from "./NavigationTop";
import ParticlesBackground from "./ParticlesBackground";

const styles = {
  button:
    "text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700",
  label:
    "block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
  input:
    "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
};

function Signup() {
  const [role, setRole] = useState("client");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [tax_id, settax_id] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [client, setClient] = useState(false);
const [error, setError] = useState(null);
const [error2, setError2] = useState(null);
  const navigate = useNavigate();

  const deploy = import.meta.env.VITE_DEPLOY_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
 

    if (client === false) {
      if (password !== confirmPassword) {
        // console.log("Passwords do not match");
        setError("Passwords do not match");
        return;
      }
      else


      try {
        const response = await axios.post(
          `${deploy}/clients/register`,
          {
            data: {
              role,
              first_name,
              last_name,
              email,
              password,
              tax_id,
              street,
              zip,
              city,
              country,
              phone_number,
            },
          },
          { withCredentials: true }
        );

        navigate("/Dashboard");
        if (response.status === 201) {
          
        }
      } catch (error) {
        // console.log(error);
        // console.log(error.response.data.error || "Registration failed");
        setError2("An account with this Email already exists");
      }
    } else {
      handleRegisterprofi(e);
    }
  };

  const handleRegisterprofi = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${deploy}/pros/register`,
        {
          data: {
            role,
            first_name,
            last_name,
            email,
            password,
            street,
            zip,
            city,
            country,
            phone_number,
          },
        },
        { withCredentials: true }
      );

      navigate("/Dashboard");
      if (response.status === 201) {
      }
    } catch (error) {
      toast.error(error.response.data.error || "Registration failed");
      setError2("An account with this Email already exists");
    }
  };

  useEffect(() => {
    console.log(role,first_name, last_name, street, city, zip, country, tax_id, phone_number, email, password,client);
  }, [ role,first_name, last_name, street, city, zip, country, tax_id, phone_number, email, password,client ]);

  return (
    <>
      <ParticlesBackground />
      <div className="wrapper">
        <NavigationTop />

        <form
          onSubmit={handleRegister}
          className="w-fit mx-auto mt-12 rounded-lg p-6 bg-opacity-50 bg-white/75 dark:bg-gray-900/80"
        >
          {/* <ThemeToggle /> */}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Link to="/">
                <img
                  className="mx-auto h-10 w-auto mb-6"
                  src="\src\assets\TaxMax-Logo3.svg"
                  alt="TAXMAX"
                />
              </Link>
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
                      onChange={() => {
                        setClient(false), setRole("client");
                      }}
                      checked={!client}
                    />
                    <label
                      className="segmented-control__label  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      htmlFor="option-1"
                    >
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
                      onClick={() => {
                        setClient(true), setRole("pro");
                      }}
                    />
                    <label
                      className="segmented-control__label dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      htmlFor="option-2"
                    >
                      Professional
                    </label>
                  </a>
                </li>
              </ul>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className={styles.label}>
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={first_name}
                      required
                      onChange={(e) => setfirst_name(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className={styles.label}>
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className={styles.input}
                      value={last_name}
                      required
                      onChange={(e) => setlast_name(e.target.value)}
                    />
                  </div>
                </div>

                {error2 && (
                  <div className="text-sm text-red-500 mt-3 w-full sm:col-span-6 ">
                    <p>{error2}</p>
                  </div>
                )}


                <div className="sm:col-span-6">
                  <label htmlFor="email" className={styles.label}>
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={styles.input}
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-500 mt-3 w-full sm:col-span-6 ">
                    {/* <p>{"your email or password is incorrect"}</p> */}
                    <p>{error}</p>
                  </div>
                )}

                <div className="sm:col-span-3">
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      className={styles.input}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="confirm-password" className={styles.label}>
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      className={styles.input}
                      value={confirmPassword}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {!client && (
                  <div className="sm:col-span-3">
                    <label htmlFor="tax-id" className={styles.label}>
                      TAX ID
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="tax-id"
                        id="tax-id"
                        autoComplete="tax-id"
                        className={styles.input}
                        value={tax_id}
                        required
                        onChange={(e) => settax_id(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className={styles.label}>
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="phone-number"
                      className={styles.input}
                      value={phone_number}
                      required
                      onChange={(e) => setphone_number(e.target.value)}
                    />
                  </div>
                </div>
                <br />

                <div className="col-span-full">
                  <label htmlFor="street-address" className={styles.label}>
                    Street
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className={styles.input}
                      value={street}
                      required
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className={styles.label}>
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className={styles.input}
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                {/* 
            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className={styles.label}
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className={styles.input}
                />
              </div>
            </div> */}

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className={styles.label}>
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className={styles.input}
                      value={zip}
                      required
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className={styles.label}>
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={country}
                      required
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
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 dark:text-white">
            <p className="mt-2">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 underline">
                Login here
              </Link>
            </p>
            <Link to="/">
              <button type="button" className={styles.button}>
                Cancel
              </button>
            </Link>

            <button type="submit" className={styles.button}>
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
