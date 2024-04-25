import { Suspense, lazy } from "react";
import { BouncingDotsLoader } from "../components//Loader/Loader";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../components/Home/Home"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const App = lazy(() => import("../App"));
const Login = lazy(() => import("../components/Login/Login"));
const AllProducts = lazy(() => import("../components/AllProducts/AllProducts"));
const Product = lazy(() => import("../components/Product/Product"));
const Clothes = lazy(() => import("../components/Clothes/Clothes"));
const Wishlist = lazy(() => import("../components/Favourites/Favourites"));

export const router = createBrowserRouter([

    {
        path: "/",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <App />
        </Suspense>),
        children: [
            {
                path: "/home",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Home />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/store",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <AllProducts />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/clothes",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Clothes />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/product/:id",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Product />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/wishlist",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Wishlist />
                    <Footer />
                </Suspense>),

            },
        ]

    },
    {
        path: "/login",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <Login />
        </Suspense>),

    },
]);

