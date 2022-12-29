import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpImage from '../assets/illustration.svg';
import axios from 'axios';

const Signup = () => {
  const [userValue, setUserValue] = useState({
    mobile_phone_number: '',
    email: '',
    password: '',
    nationality: '',
    full_name: '',
  });
  console.log('🚀 ~ file: Signup.js ~ line 15 ~ Signup ~ userValue', userValue);

  const handleUserValue = (event) => {
    setUserValue({ ...userValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked', userValue);
    axios
      .post('http://localhost:5000/api/user', userValue)
      .then((res) => {
        console.log(res, 'res');
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  return (
    <div
      id="signup"
      className="py-10 px-5 sm:py-0 md:h-screen h-auto flex justify-center items-center bg-white"
    >
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="md:col-span-1 md:block hidden">
          <div className="px-4 sm:px-0">
            <div className="felx justify-center items-center">
              <img src={SignUpImage} alt="" />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-5 md:mt-0  md:col-span-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 bg-[#76A9FA] bg-opacity-50 sm:px-9 py-20 pb-14">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mobile number"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Mobile number
                      </label>
                      <input
                        type="text"
                        name="mobile_phone_number"
                        id="mobile number"
                        value={userValue.mobile_phone_number}
                        autoComplete="given-name"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(event) => handleUserValue(event)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userValue.email}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(event) => handleUserValue(event)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Password"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="Password"
                        value={userValue.password}
                        className="mt-1  py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(event) => handleUserValue(event)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Nationality"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        id="Nationality"
                        value={userValue.nationality}
                        autoComplete=""
                        className="mt-1  py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(event) => handleUserValue(event)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="full name"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        id="full name"
                        value={userValue.full_name}
                        autoComplete="email"
                        className="mt-1  py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(event) => handleUserValue(event)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <button
                        type="submit"
                        className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={handleSubmit}
                      >
                        Create an account
                      </button>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <p className="text-[15px] font-normal  mt-1 text-center text-[#222222]">
                        Already have an account?
                        <Link to="/login">
                          <a
                            href="/login"
                            className="font-bold  hover:underline ml-1 hover:text-indigo-600"
                          >
                            Login here
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
