import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../localStorage/LocalStorage';

const ProductList = () => {
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState();
  const navigate = useNavigate();
  const { admin } = useLocalStorage();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (name && description) {
      axios
        .get(
          `http://localhost:5000/api/event/?page=${page}&name=${name}&description=${description}`
        )
        .then((data) => {
          console.log(data.data, 'nadfonbfdna');
          setData(data.data.event);
          setTotalPage(data.data.total_pages);
        });
    } else if (name) {
      axios
        .get(`http://localhost:5000/api/event/?page=${page}&name=${name}`)
        .then((data) => {
          console.log(data.data, 'nadfonbfdna');
          setData(data.data.event);
          setTotalPage(data.data.total_pages);
        });
    } else if (description) {
      axios
        .get(
          `http://localhost:5000/api/event/?page=${page}&description=${description}`
        )
        .then((data) => {
          console.log(data.data, 'nadfonbfdna');
          setData(data.data.event);
          setTotalPage(data.data.total_pages);
        });
    } else {
      console.log(page, 'innavjosnvsjo');
      axios
        .get(`http://localhost:5000/api/event/?page=${page}`)
        .then((data) => {
          console.log(data.data, 'nadfonbfdna');
          setData(data.data.event);
          setTotalPage(data.data.total_pages);
        });
    }
  }, [refresh, name, description, page]);

  const handleClick = (id) => {
    navigate(`/showlist/${id}`);
    console.log(id, 'id');
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    const headers = {
      token: token,
    };
    axios
      .delete(`http://localhost:5000/api/event/${id}`, {
        headers,
      })
      .then((data) => setRefresh(Math.random));
  };

  if (data) {
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="plSuperMain ">
              {admin ? (
                <button
                  className="PLButton"
                  onClick={() => {
                    navigate('/eventmodal');
                  }}
                >
                  Add Event
                </button>
              ) : null}

              <div className="plMain">
                <h1 className="text-2xl  text-gray-900 mb-1">
                  Filter Events :-
                </h1>
                <div className='mb-3  '>
                  <label
                    htmlFor="Name"
                    className="block text-[15] font-medium text-[#222222] mb-0"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-[15] font-medium text-[#222222] mb-0"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-14 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data?.map((product) => {
                return (
                  <a
                    key={product.id}
                    href={product.href}
                    className="group"
                    onClick={() => handleClick(product._id)}
                  >
                    <div>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={`http://localhost:5000/public/${product.poster}`}
                          alt={product.poster}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="">
                        <h3 className="mt-4 text-2xl text-[#222]">
                          {product.name}
                        </h3>
                      </div>
                      {admin ? (
                        <div>
                          <button
                            className="SLButton"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product._id);
                            }}
                          >
                            Delete Event
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </a>
                );
              })}
            </div>
            <div>
              <div className="plBottom">
                <button
                  className="plBottomButton"
                  onClick={() => {
                    setPage((page) => page - 1);
                  }}
                  disabled={page === 1 ? "disabled" : false}
                >
                  {'<<'}
                </button>
                <div className="plBottomDiv">
                  <h1 className="text-1xl  text-gray-900 mb-1">
                    {page} of {totalPage}
                  </h1>
                </div>
                <button
                  className="plBottomButton"
                  onClick={() => {
                    setPage((page) => page + 1);
                  }}
                  disabled={page === totalPage ? "disable" : false}
                >
                  {'>>'}
                </button>
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

export default ProductList;
