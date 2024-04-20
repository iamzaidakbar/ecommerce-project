import { Suspense, lazy } from "react";
import { BouncingDotsLoader } from "../components/Loader";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../components/Login"));
const Home = lazy(() => import("../components/Home"));
const Navbar = lazy(() => import("../components/Navbar"));
const AllProducts = lazy(() => import("../components/allProducts"));

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Login />
        </Suspense>),

    },
    {
        path: "/all-products",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Navbar />
            <AllProducts />
        </Suspense>),

    },
    {
        path: "/home",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Navbar />
            <Home />
        </Suspense>),

    },
    {
        path: "/",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Navbar />
            <Home />
        </Suspense>),

    },
]);

