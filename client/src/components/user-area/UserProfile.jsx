import { useState, useEffect } from "react";
import { useAuth } from "../../context/UserProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label, Checkbox } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import Toastify, { notify } from "./Toastify";

const styles = {
  input:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
  label:
    "block mb-2 text-left text-sm pl-2 font-medium text-gray-900 dark:text-white",
  deleteButton:
    "text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
  submitButton:
    "bg-primary-700 hover:bg-teal-500 ring-2 hover:ring-0 ring-teal-500 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 text-gray-900 dark:text-white",
  icon: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
};

const fields = [
  { id: "first-name", label: "First Name", value: "first_name" },
  { id: "last-name", label: "Last Name", value: "last_name" },
  { id: "street", label: "Street", value: "street" },
  { id: "city", label: "City", value: "city" },
  { id: "zip", label: "Zip Code", value: "zip" },
  { id: "country", label: "Country", value: "country" },
  { id: "phone", label: "Phone Number", value: "phone_number" },
  { id: "mail", label: "E-mail", value: "email" },
];

function UserProfile() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData, checkUser } =
    useAuth();
  const navigate = useNavigate();
  const deploy = import.meta.env.VITE_DEPLOY_URL;

  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    phone_number: "",
    email: "",
    languages: [],
    industry: [],
    description: "",
  });

  const languages = [
    { title: "german", short: "DE" },
    { title: "english", short: "GB" },
    { title: "spanish", short: "ES" },
    { title: "italian", short: "IT" },
    { title: "dutch", short: "NL" },
    { title: "polish", short: "PL" },
    { title: "french", short: "FR" },
  ];
  const industries = [
    "IT",
    "Gastronomy",
    "Retail",
    "Consulting",
    "Healthcare",
    "Construction",
    "Education",
    "Finance",
  ];
  useEffect(() => {
    if (userData) {
      setFormState({
        ...userData.data,
        languages: userData.languages || [],
        industry: userData.industry || [],
        description: userData.description || "no description available yet",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleOptionChange = (optionType, optionValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [optionType]: prevState[optionType].includes(optionValue)
        ? prevState[optionType].filter((item) => item !== optionValue)
        : [...prevState[optionType], optionValue],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      street,
      zip,
      city,
      country,
      phone_number,
      languages,
      industry,
      description,
    } = formState;

    try {
      const deploy = import.meta.env.VITE_DEPLOY_URL;
      const response = await axios.patch(
        userData.data.role === "client"
          ? `${deploy}/clients`
          : `${deploy}/pros`,
        {
          data: {
            first_name,
            last_name,
            email,
            street,
            zip,
            city,
            country,
            phone_number,
          },
          languages,
          industry,
          description,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        notify("User data has been updated.");
        checkUser();
      }

      if (response.status === 401) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error || "Updating user data failed");
    }
  };

  //console.log(userData);
  return (
    <>
      <Toastify />
      <div className="flex h-[calc(100%-4rem)]">
        <div className="flex flex-col">
          {/* user picture and name */}
          <div className="flex w-fit h-fit p-3 bg-gray-50 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex">
              <a className="w-1/3" href="#">
                <img
                  className="rounded-md"
                  src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png"
                  alt={`${formState.first_name} Avatar`}
                />
              </a>
              <div className="w-2/3 p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{formState.first_name}</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  {formState.last_name}
                </span>
              </div>
            </div>
          </div>
          {/* languages & industries */}
          <section className="h-full rounded-md mt-3 p-3 bg-white dark:bg-gray-800">
            <h2 className="mb-4 text-xl text-left font-bold text-gray-900 dark:text-white">
              Preferences
            </h2>
            <div className="flex">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4 sm:mb-5">
                  <div className="w-full" key={userData._id}>
                    <fieldset className="flex flex-col">
                      <p className={`pl-0 ${styles.label}`}>Languages:</p>

                      <Dropdown
                        id="dropdown"
                        label={
                          <span className="text-gray-900 dark:text-white capitalize">
                            {formState.languages.join(` | `) || "None"}
                          </span>
                        }
                        dismissOnClick={false}
                        className="z-50"
                      >
                        {languages.map((l) => (
                          <Dropdown.Item key={l.title}>
                            <div className="flex items-center gap-2 capitalize">
                              <Checkbox
                                id={l}
                                checked={formState.languages.includes(l.title)}
                                onChange={() =>
                                  handleOptionChange("languages", l.title)
                                }
                              />
                              <Label
                                className="flex text-gray-900 dark:text-white"
                                htmlFor={l}
                              >
                                <img
                                  src={`https://flagsapi.com/${l.short}/flat/24.png`}
                                  alt={l.short}
                                  className="pr-2"
                                />
                                {l.title}
                              </Label>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </fieldset>
                  </div>
                </div>

                <fieldset className="flex flex-col">
                  <p className={`pl-0 ${styles.label}`}>Industries:</p>
                  <Dropdown
                    label=<span className="text-gray-900 dark:text-white">
                      {formState.industry.join(" | ") || "None"}
                    </span>
                    dismissOnClick={false}
                  >
                    {industries.map((i) => (
                      <Dropdown.Item key={i}>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={i}
                            checked={formState.industry.includes(i)}
                            onChange={() => handleOptionChange("industry", i)}
                          />
                          <Label className="capitalize" htmlFor={i}>
                            {i}
                          </Label>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </fieldset>
                <div className="flex items-center space-x-4 mt-6">
                  <button type="submit" className={styles.submitButton}>
                    Update User
                  </button>
                  <button type="button" className={styles.deleteButton}>
                    <svg
                      className="w-5 h-5 mr-1 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d={styles.icon}
                        class-rule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
        {/* address section */}
        <section className="w-full rounded-md ml-3 bg-white dark:bg-gray-800">
          <div className="px-4 py-8">
            <h2 className="mb-4 text-xl text-left font-bold text-gray-900 dark:text-white">
              General Info
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                {fields.map((field) => (
                  <div className="w-full" key={field.id}>
                    <label htmlFor={field.id} className={styles.label}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.value}
                      id={field.id}
                      className={styles.input}
                      value={formState[field.value]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>
              {userData.data.role === "client" ? null : (
                <>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left pl-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    name="description"
                    value={formState.description}
                    placeholder="Add your description here..."
                  ></textarea>
                </>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserProfile;
