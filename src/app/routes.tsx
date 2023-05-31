import {createBrowserRouter} from "react-router-dom";
import Home from "@views/Home/home";
import Login from "@views/Login/login";
import SignUp from "@views/SignUp/signup";
import Profile from "@views/Profile/profile.tsx";
import Ressources from "@views/Ressources/ressources.tsx";
import ErrorPage from "@views/Error-Page/error-page.tsx";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage/>
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage/>
    },
    {
        path: '/signup',
        element: <SignUp />,
        errorElement: <ErrorPage/>
    },
    {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorPage/>
    },
    {
        path: '/ressources',
        element: <Ressources />,
        errorElement: <ErrorPage/>
    }
])

export default routes;
