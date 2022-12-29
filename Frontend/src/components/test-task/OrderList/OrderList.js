import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from '../../localStorage/LocalStorage';
import moment from 'moment/moment';

const OrderList = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [refresh, setRefresh] = useState();
  const navigate = useNavigate();
  const { admin, token } = useLocalStorage();

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/user/getCurrentUSer`, {
        token,
      })
      .then((res) => {
        console.log(res.data, 'avbibhvsbih');
        if (res.data.isAdmin) {
          axios
            .get(`http://localhost:5000/api/order/getAll`, {
              headers: { token },
            })
            .then((data) => {
              console.log(data.data);
              setOrderData(data.data);
            });
        } else {
          axios
            .get(`http://localhost:5000/api/order/getUsers/${res.data._id}`, {
              headers: { token },
            })
            .then((data) => {
              console.log(data.data);

              setOrderData(data.data);
            });
        }
      });
  }, [refresh]);

  const handleClick = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/api/order/${id}`).then(() => {
      // navigate(`/productlist`);
      setRefresh(Math.random());
    });
    // navigate(`/productoverview/${id}`);
  };

  return (
    <>
      <div className="bg-white p-8 w-full h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-7xl">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal table-auto">
                <thead>
                  <tr>
                    {admin ? (
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Owner Name
                      </th>
                    ) : null}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Show Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Booked Tickets
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Payment
                    </th>
                    {admin ? (
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                {orderData?.map((data) => {
                  return (
                    <tbody>
                      <tr>
                        {admin ? (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.owner.full_name}
                              </p>
                            </div>
                          </td>
                        ) : null}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.event.event.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.event.show.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.ticket}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.total_price}
                          </p>
                        </td>
                        {admin ? (
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
                                Delete Order
                              </span>
                            </button>
                          </td>
                        ) : null}
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
};

export default OrderList;
