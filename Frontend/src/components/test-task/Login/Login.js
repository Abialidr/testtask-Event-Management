import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../assets/illustration.svg';
import axios from 'axios';
import { useLocalStorage } from '../../localStorage/LocalStorage';

const Login = () => {
  const { handleToken, handleId, handleAdmin } = useLocalStorage();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    localStorage.setItem('token', null);
  }, []);

  const handleChangeValue = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/user/auth', data)
      .then((res) => {
        localStorage.setItem('token', res.data);
        handleToken(res.data);

        axios
          .post(`http://localhost:5000/api/user/getCurrentUSer`, {
            token: res.data,
          })
          .then((res) => {
            handleId(res.data._id);
            handleAdmin(res.data.isAdmin);
            navigate('/productlist');
          });

        // console.log("🚀 ~ file: Login.js ~ line 23 ~ axios.post ~ object", object)
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  return (
    <>
      <div
        id="Login"
        className="py-10 px-5 sm:py-0 md:h-screen h-auto flex justify-center items-center bg-white"
      >
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-0 md:mt-0  md:col-span-1">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 bg-[#76A9FA] bg-opacity-50 sm:px-9 py-20 pb-14">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Enter your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(event) => handleChangeValue(event)}
                        autoComplete="given-name"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Enter password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={(event) => handleChangeValue(event)}
                        autoComplete="family-name"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <button
                        type="submit"
                        className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Login an account
                      </button>
                    </div>
                    <div className="flex flex-wrap col-span-6 sm:col-span-6">
                      <div className="md:w-1/2 w-full md:block flex justify-center items-center">
                        <div>
                          <input
                            id="draft"
                            className="peer/draft"
                            type="checkbox"
                            name="status"
                          />
                          <label
                            htmlFor="draft"
                            className="peer-checked/draft:text-indigo-600 ml-2"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="md:w-1/2 w-full md:block flex justify-center items-center mt-2">
                        <a
                          href="/"
                          className="font-bold text-[#222222] transition-all ease-in-out hover:text-indigo-600 text-right block hover:underline ml-1"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <p className="text-[15px] font-normal  mt-1 text-center text-[#222222]">
                        Don't have an account?
                        <Link to="/">
                          <a
                            href="/"
                            className="font-bold  hover:underline ml-1 hover:text-indigo-600"
                          >
                            Signup here
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="md:col-span-1 md:block hidden">
            <div className="px-4 sm:px-0">
              <div
                className="felx justify-center items-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <img src={LoginImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
