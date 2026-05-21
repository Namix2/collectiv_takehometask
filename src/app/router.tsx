import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PotPage } from "../pages/PotPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/app/pots/:potId',
        element: <PotPage />,
    },

    /* Loader? */
   
]);