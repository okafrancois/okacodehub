import {createBrowserRouter} from 'react-router-dom';
import Home from '@views/Home/home';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    }
])

export default routes;
