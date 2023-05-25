import {createBrowserRouter} from "react-router-dom";
import Home from "@views/Home/home";
import Login from "@views/Login/login";
import SignUp from "@views/SignUp/signup";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    }
])

export default routes;
