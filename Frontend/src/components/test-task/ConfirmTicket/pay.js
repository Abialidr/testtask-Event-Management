import React from 'react';
import './payment.css';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Pay() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const price = localStorage.getItem('price');
  const pay = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/order/pay', {
        amount: price,
      });
      const cardElement = elements.getElement(CardElement);
      const confirmPayment = await stripe.confirmCardPayment(
        response.data.client_secret,
        {
          payment_method: { card: cardElement },
        }
      );
      const { paymentIntent } = confirmPayment;
      switch (paymentIntent.status) {
        case 'succeeded':
          // if(confirm("Payment succeeded")) {
          //     navigate('/orderlist')
          // }
          alert('Payment succeeded');
          navigate('/orderlist');
          break;
        case 'processing':
          alert('Your payment is processing.');
          break;
        case 'requires_payment_method':
          alert('Your payment was not successful, please try again.');
          break;
        default:
          alert('Something went wrong.');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-[calc(100vh-2rem)] flex justify-center items-center mx-auto">
      <div className="bg-white p-5 rounded-xl w-[600px] max-w-[600px]">
        <CardElement />
        <div className="mt-5">
          <label
            htmlFor="text"
            className="block text-base font-medium text-[#222222]"
          >
            Name
          </label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Card Holder Name"
            className="mt-1  py-2 px-3 focus:outline-none  border-2 block w-full shadow-sm sm:text-sm rounded-md"
          />
        </div>
        <button className="w-full mt-7" onClick={pay}>
          pay
        </button>
      </div>
      {/* <div className="mt-5 md:mt-0  md:col-span-2">
                <form>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 bg-[#76A9FA] bg-opacity-50 sm:px-9 py-20 pb-14">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    <label
                                        htmlFor="Card Number"
                                        className="block text-[15] font-medium text-[#222222]"
                                    >
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="Card Number"
                                        id="Card Number"
                                        autoComplete="given-name"
                                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

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

                            </div>
                        </div>
                    </div>
                </form>
            </div> */}
    </div>
  );
}
