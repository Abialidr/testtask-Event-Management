import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from '../../localStorage/LocalStorage';
import moment from 'moment/moment';

const ShowList = () => {
  const { id } = useParams();
  const [showData, setShowData] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { admin } = useLocalStorage();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tickets/getAll/${id}`)
      .then((data) => setShowData(data.data));

    axios
      .get(`http://localhost:5000/api/event/${id}`)
      .then((data) => {
        console.log(data.data, 'dataSBIBb');
        setData(data.data);
      })
      .catch((err) => {
        console.log(err, 'srbnajonjo');
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/productoverview/${id}`);
  };
  if (data) {
    return (
      <>
        <div className="bg-white p-8 w-full h-[calc(100vh-64px)]">
          <div className="mx-auto max-w-7xl">
            {admin ? (
              <div style={{ display: 'inline-block', width: '100%' }}>
                <button
                  className="PLButton"
                  style={{ float: 'right' }}
                  onClick={() => {
                    navigate(`/ticket/${id}`);
                  }}
                >
                  Add Show
                </button>
              </div>
            ) : null}

            <div style={{ marginBottom: '25px' }}>
              <div className="aspect-w-1 aspect-h-1 w-[500px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={`http://localhost:5000/public/${data.poster}`}
                  alt={data.poster}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="">
                <h1 className="mt-4 text-5xl text-[#222]">{data.name}</h1>
                <h3 className="mt-4 text-3xl text-[#222]">
                  {data.description}
                </h3>
                <h1 className="mt-4 text-1xl text-[#222]">
                  Start Date : {moment(data.start_date).format('MMM Do YY')}
                </h1>
                <h1 className="mt-4 text-1xl text-[#222]">
                  End Date : {moment(data.end_date).format('MMM Do YY')}
                </h1>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal table-auto">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Available Ticket
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  {showData?.map((data) => {
                    return (
                      <tbody>
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.name}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data.qauntity}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(data.on_date).format('MMM Do YY')}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button
                              className="relative inline-block px-3 py-2 font-semibold text-green-900 leading-tight"
                              onClick={() => handleClick(data._id)}
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-lg"
                              />
                              <span className="relative px-4 py-2">
                                {admin ? 'Show' : 'Book'}
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ShowList;
