import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
//Pages
import Header from "./components/Header/Header";
import AddNewTour from "./pages/AddNewTour/AddNewTour";
import Home from "./pages/Home/Home";
import ManageAllOrders from "./pages/ManageAllOrders/ManageAllOrders";
import MyOrders from "./pages/MyOrders/MyOrders";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TourDetails from "./pages/TourDetails/TourDetails";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound/NotFound";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/tours/:tourId">
            <TourDetails />
          </PrivateRoute>
          <PrivateRoute path="/my-orders">
            <MyOrders />
          </PrivateRoute>
          <PrivateRoute path="/manage-all-orders">
            <ManageAllOrders />
          </PrivateRoute>
          <PrivateRoute path="/add-new-service">
            <AddNewTour />
          </PrivateRoute>
          {/* Redirect user if user already login */}
          <Route path="/login">
            {user.email ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {user.email ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      {/* 
      <Footer />
       */}
    </BrowserRouter>
  );
};

export default App;
