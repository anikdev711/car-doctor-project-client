import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import BookService from "../pages/BookService/BookService";
import PrivateRoute from "./PrivateRoute";
import Bookings from "../pages/Bookings/Bookings";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/book/:id",
        element: <PrivateRoute><BookService></BookService></PrivateRoute>,
        loader: ({ params }) => fetch(`https://car-doctor-project-server-v2.vercel.app/services/${params.id}`)
      },
      {
        path: "/checkout/:id",
        element: <CheckOut></CheckOut>,
        loader: ({ params }) => fetch(`https://car-doctor-project-server-v2.vercel.app/services/${params.id}`)
      },
      {
        path: "/bookings",
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
      }
    ]
  },
]);

export default router;