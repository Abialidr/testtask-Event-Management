import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useLocalStorage } from '../../localStorage/LocalStorage';

const ConfirmTicket = () => {
  const { admin } = useLocalStorage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleData, setSingleData] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticket_qauntity, setTicket_qauntity] = useState(0);

  const [userId, setUserId] = useState('');
  console.log(
    '🚀 ~ file: ProductOverview.js ~ line 10 ~ ProductOverview ~ userId',
    userId
  );
  console.log(
    '🚀 ~ file: ConfirmTicket.js ~ line 10 ~ ConfirmTicket ~ singleData',
    ticketPrice
  );
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tickets/getOne/${id}`)
      .then((data) => setSingleData([data.data]));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .post(`http://localhost:5000/api/user/getCurrentUSer`, {
        token,
      })
      .then((res) => {
        console.log(res, 'resss');
        setUserId(res.data._id);
      });
  });
  const token = localStorage.getItem('token');
  const headers = {
    token: token,
  };
  const handleClick = () => {
    axios
      .post(
        `http://localhost:5000/api/order`,
        { user_id: userId, ticket_id: id, ticket_qauntity: ticketPrice },
        { headers }
      )
      .then((res) => {
        navigate('/payment');
      });
  };
  return (
    <>
      {singleData?.map((product) => {
        const price = product.price;
        const totalPrice = price * ticketPrice;
        return (
          <div className="flex items-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-[#76A9FA] bg-opacity-50 rounded-lg shadow-xl sm:px-9 sm:py-20 sm:pb-14 px-4 py-5">
              <div className="flex items-center justify-center p-6 sm:p-6 ">
                <div className="w-full">
                  <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                    Confirm Your Ticket
                  </h1>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <p
                        htmlFor="name"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Show Name
                      </p>
                      <div className="mt-1 bg-white py-[12px] px-3  w-full shadow-sm text-base  rounded-md">
                        {product.name}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <p
                        htmlFor="name"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Show Description
                      </p>
                      <div className="mt-1 bg-white py-[12px] px-3  w-full shadow-sm text-base  rounded-md">
                        {product.description}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <p
                        htmlFor="name"
                        className="block text-[15] font-medium text-[#222222]"
                      >
                        Show Date
                      </p>
                      <div className="mt-1 bg-white py-[12px] px-3  w-full shadow-sm text-base  rounded-md">
                        {product.on_date}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <div className="flex gap-x-6 md:justify-between justify-center items-center mt-1">
                        <div className="md:w-1/2 w-full">
                          <p
                            htmlFor="name"
                            className="block text-[15] font-medium text-[#222222]"
                          >
                            Ticket Price
                          </p>
                          <div className="mt-1 bg-white py-3 px-3  w-full shadow-sm text-base  rounded-md price">
                            ${product.price}
                            {/* {setTicketPrice(product.price)} */}
                          </div>
                        </div>
                        <span className="mt-7">*</span>
                        <div className="md:w-1/2 w-full">
                          <div>
                            <label
                              htmlFor="Quantity"
                              className="block text-[15] font-medium text-[#222222]"
                            >
                              Enter Quantity
                            </label>
                            <input
                              type="text"
                              name="qauntity"
                              id="Quantity"
                              autoComplete="on"
                              // value={product.qauntity}
                              onChange={(e) => {
                                setTicketPrice(e.target.value);
                              }}
                              className="mt-1 py-[13px] px-3 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <div className="w-1/2 mx-auto">
                        <p
                          htmlFor="name"
                          className="block text-[15] font-medium text-[#222222]"
                        >
                          Total Price
                        </p>
                        <div className="mt-1 bg-white py-[12px] px-3  w-full mx-auto shadow-sm text-base  rounded-md">
                          ${totalPrice}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      {!admin ? (
                        <button
                          onClick={() => {
                            localStorage.setItem('price', totalPrice);
                            handleClick();
                          }}
                          type="submit"
                          className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Confirm Your Ticket
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ConfirmTicket;
