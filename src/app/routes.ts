import {createBrowserRouter} from 'react-router-dom';
import Home from '@views/Home/home';
import ErrorPage from "@views/Error-Page/error-page.tsx";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage/>
    },
])

export default routes;
