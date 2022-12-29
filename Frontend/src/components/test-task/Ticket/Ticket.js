import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TickImage from '../assets/modelbgimage.png';
import axios from 'axios';

const Ticket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState({
    name: '',
    description: '',
    on_date: '',
    price: '',
    qauntity: '',
  });

  const handleChangeValue = (event) => {
    setTicketData({ ...ticketData, [event.target.name]: event.target.value });
    console.log(ticketData, 'ttttt');
  };
  const token = localStorage.getItem('token');
  console.log('🚀 ~ file: Ticket.js ~ line 22 ~ Ticket ~ token', token);
  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = {
      token: token,
    };
    axios
      .post(`http://localhost:5000/api/tickets/${id}`, ticketData, { headers })
      .then((res) => {
        navigate(`/showlist/${id}`);
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  return (
    <>
      <div className="flex items-center min-h-screen bg-gray-50 px-4">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-[#76A9FA] bg-opacity-50 rounded-lg shadow-xl sm:px-9 sm:py-20 sm:pb-14 px-4 py-5">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                className="object-cover w-full h-full rounded-md"
                src={TickImage}
                alt="img"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  Ticket
                </h1>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="name"
                      className="block text-[15] font-medium text-[#222222]"
                    >
                      Enter name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      value={ticketData.name}
                      onChange={(event) => handleChangeValue(event)}
                      className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="Description"
                      className="block text-[15] font-medium text-[#222222]"
                    >
                      Enter Description
                    </label>
                    <input
                      type="Text"
                      name="description"
                      id="Description"
                      value={ticketData.description}
                      onChange={(event) => handleChangeValue(event)}
                      autoComplete="family-name"
                      className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="Date"
                      className="block text-[15] font-medium text-[#222222]"
                    >
                      Enter Date
                    </label>
                    <input
                      type="date"
                      name="on_date"
                      id="Date"
                      value={ticketData.on_date}
                      onChange={(event) => handleChangeValue(event)}
                      autoComplete="family-name"
                      className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <div className="flex md:justify-between justify-center items-center mt-1">
                      <div className="md:w-1/2 w-full">
                        <div className="md:justify-start justify-center">
                          <label
                            htmlFor="price"
                            className="block text-[15] font-medium text-[#222222]"
                          >
                            Price
                          </label>

                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={ticketData.price}
                            onChange={(event) => handleChangeValue(event)}
                            className="py-2 px-3 block w-4/5 shadow-sm sm:text-sm rounded-md"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 w-full md:mt-0 mt-2">
                        <div className="md:justify-end justify-center">
                          <label
                            htmlFor="quantity"
                            className="block text-[15] font-medium text-[#222222]"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="qauntity"
                            id="Quantity"
                            value={ticketData.qauntity}
                            onChange={(event) => handleChangeValue(event)}
                            className="py-2 px-3 block w-4/5 shadow-sm sm:text-sm rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <button
                      onClick={(event) => handleSubmit(event)}
                      type="submit"
                      className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Show
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
