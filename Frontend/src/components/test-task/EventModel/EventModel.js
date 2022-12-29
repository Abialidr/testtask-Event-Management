import React from 'react';
import { useState } from 'react';
import BackgroundImage from '../assets/modelbgimage.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EventModel = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    image: '',
    start_date: '',
    end_date: '',
  });

  const handleChangeValue = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };
  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    const formData = new FormData();
    Object.keys(eventData).map((key) => {
      formData.append(key, eventData[key]);
    });
    formData.append(
      'tickets',
      JSON.stringify([
        {
          name: 'match 1',
          description: 'hello vs hiii',
          price: 200,
          qauntity: 50,
          on_date: '2020-10-09T18:30:00.000Z',
        },
      ])
    );
    e.preventDefault();
    console.log('clicked', formData);
    const headers = {
      'content-type': 'multipart/form-data',
      token: token,
    };
    axios
      .post('http://localhost:5000/api/event', formData, {
        headers,
      })
      .then((res) => {
        console.log(res.data._id, 'res');
        const id = res.data._id;
        navigate(`/ticket/${id}`);
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white h-[calc(100vh-64px)]">
        <div className="absolute inset-0 z-0" />
        <div className="sm:max-w-lg w-full p-10 bg-[#76A9FA] bg-opacity-50 rounded-xl z-10 h-full">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-[#222]">Event Model</h2>
          </div>
          <form
            className="mt-8 space-y-3"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="grid grid-cols-1 space-y-2">
              <label
                htmlFor="Prodact Name"
                className="block text-[15] font-medium text-[#222222]"
              >
                Prodact Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={eventData.name}
                onChange={(event) => handleChangeValue(event)}
                className="mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label
                htmlFor="Prodact Description"
                className="block text-[15] font-medium text-[#222222]"
              >
                Product Description
              </label>
              <textarea
                name="description"
                id="description"
                value={eventData.description}
                onChange={(event) => handleChangeValue(event)}
                className="mt-1 py-2 px-3 px-3block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                    <div className="flex flex-auto max-h-48 md:w-2/5 w-auto mx-auto md:mt-0 -mt-0 ">
                      <img
                        className="has-mask md:h-36 object-center rounded-md"
                        src={BackgroundImage}
                        alt="BackgroundImage"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 md:block hidden">
                      <span className="text-sm">Drag and drop</span> files here{' '}
                      <br /> or{' '}
                      <a className="text-blue-600 hover:underline">
                        select a file
                      </a>{' '}
                      from your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={(event) => {
                      console.log(event, 'event');
                      setEventData({
                        ...eventData,
                        [event.target.name]: event.target.files[0],
                      });
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <div className="flex flex-wrap  md:justify-between justify-center items-center mt-1">
                <div className="md:w-1/2 w-full">
                  <div className="flex md:justify-start justify-center">
                    <input
                      type="date"
                      name="start_date"
                      value={eventData.start_date}
                      onChange={(event) => handleChangeValue(event)}
                      className="py-2 px-3 block w-4/5 shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 w-full md:mt-0 mt-2">
                  <div className="flex md:justify-end justify-center">
                    <input
                      type="date"
                      name="end_date"
                      value={eventData.end_date}
                      onChange={(event) => handleChangeValue(event)}
                      className="py-2 px-3 block w-4/5 shadow-sm sm:text-sm rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventModel;
