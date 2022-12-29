import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EventModel from './components/test-task/EventModel/EventModel';
import Header from './components/test-task/header/Header';
import Login from './components/test-task/Login/Login';
import Signup from './components/test-task/signup-page/Signup';
import Ticket from './components/test-task/Ticket/Ticket';
import ConfirmTicket from './components/test-task/ConfirmTicket/ConfirmTicket';
import ProductList from './components/test-task/productList/ProductList';
import ProductOverview from './components/test-task/ProductOverview/ProductOverview';
import ShowList from './components/test-task/ShowList/ShowList';
import Payment from './components/test-task/ConfirmTicket/payment';
import {
  LocalStorageProvider,
  useLocalStorage,
} from './components/localStorage/LocalStorage';
import Logout from './components/test-task/logout/Logout';
import OrderList from './components/test-task/OrderList/OrderList';

const App = () => {
  const { token } = useLocalStorage();
  function PrivateRoute({ children }) {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>

          {/* <Route exact path='/eventmodal' element={<EventModel />}/> */}
          <Route
            exact
            path="/eventmodal"
            element={
              <PrivateRoute>
                <EventModel />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ticket/:id"
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/productlist"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/showlist/:id"
            element={
              <PrivateRoute>
                <ShowList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/orderlist"
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/productoverview/:id"
            element={
              <PrivateRoute>
                <ProductOverview />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/confirmticket/:id"
            element={
              <PrivateRoute>
                <ConfirmTicket />
              </PrivateRoute>
            }
          ></Route>
          <Route exact path="/payment" element={<Payment />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
