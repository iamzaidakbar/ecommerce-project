import { Suspense, lazy } from "react";
import { BouncingDotsLoader } from "../components//Loader/Loader";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../components/Login/Login"));
const AllProducts = lazy(() => import("../components/AllProducts/AllProducts"));
const Product = lazy(() => import("../components/Product/Product"));
const Clothes = lazy(() => import("../components/Clothes/Clothes"));

export const router = createBrowserRouter([

    {
        path: "/",
        element: (<Suspense fallback={<BouncingDotsLoader />}>
            <App />
        </Suspense>),
        children: [
            {
                path: "/store",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <AllProducts />
                </Suspense>),

            },
            {
                path: "/clothes",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Clothes />
                </Suspense>),

            },
            {
                path: "/product/:id",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Product />
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

