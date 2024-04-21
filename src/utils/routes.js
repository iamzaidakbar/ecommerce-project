import { Suspense, lazy } from "react";
import { BouncingDotsLoader } from "../components/Loader";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../components/Login"));
const Home = lazy(() => import("../components/Home"));
const Navbar = lazy(() => import("../components/Navbar"));
const AllProducts = lazy(() => import("../components/allProducts"));
const Product = lazy(() => import("../components/Product"));
const Clothes = lazy(() => import("../components/Clothes"));

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
        path: "/clothes",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Navbar />
            <Clothes />
        </Suspense>),

    },
    {
        path: "/product/:id",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Navbar />
            <Product />
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

