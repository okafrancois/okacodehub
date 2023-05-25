import './App.css'
import {RouterProvider} from "react-router";
import routes from "./app/routes.ts";

const App = () => <RouterProvider router={routes} />

export default App
