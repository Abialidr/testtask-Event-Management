import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocalStorage } from '../../localStorage/LocalStorage';
import moment from 'moment';

const ProductOverview = () => {
  const { admin } = useLocalStorage();
  const { id } = useParams();
  const [singleData, setSingleData] = useState([]);
  const navigate = useNavigate();
  console.log(
    '🚀 ~ file: ProductOverview.js ~ line 28 ~ ProductOverview ~ singleData',
    singleData
  );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tickets/getOne/${id}`)
      .then((data) => setSingleData([data.data]));
  }, []);

  const handleClick = (id) => {
    navigate(`/confirmticket/${id}`);
  };
  return (
    <>
      {singleData?.map((product) => {
        return (
          <div className="bg-white h-[calc(100vh-64px)] flex justify-start items-start text-left">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-1 lg:items-center lg:gap-x-8">
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 md:w-1/2 mx-auto">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-left">
                    <span className="font-normal">Show Name:-</span>{' '}
                    {product.name}
                  </h1>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl font-bold tracking-tight text-gray-900 text-left">
                      <span className="font-normal">show Price:-</span>{' '}
                      {product.price}
                    </p>
                  </div>

                  <div className="md:mt-3 mt-1">
                    <h2 className="sr-only">AVAILABLETICKET</h2>
                    <p className="md:text-3xl text-[25px] tracking-tight font-bold text-gray-900 text-left">
                      <span className="font-normal">AVAILABLETICKET :- </span>
                      {product.qauntity}
                    </p>
                  </div>

                  <div className="md:mt-3 mt-1">
                    <h2 className="sr-only">Show Date</h2>
                    <p className="md:text-3xl text-[24.2px] font-bold tracking-tight text-gray-900 text-left">
                      <span className="font-normal">Show Date :-</span>
                      {moment(product.on_date).format('MMM Do YY')}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="sr-only">Description</h3>
                    <p className="md:text-xl font-bold tracking-tight text-gray-900 mb-2 text-left">
                      Show Description
                    </p>
                    <div
                      className="space-y-6 text-base text-gray-700 text-left"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>

                  <form className="mt-6">
                    <div className="sm:flex-col1 mt-10 flex">
                      {!admin ? (
                        <button
                          type="submit"
                          className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                          onClick={() => handleClick(product._id)}
                        >
                          Book Your Ticket
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                          onClick={() => navigate('/productlist')}
                        >
                          Back to Event
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductOverview;
