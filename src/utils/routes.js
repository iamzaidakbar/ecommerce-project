import { Suspense, lazy } from "react";
import { BouncingDotsLoader } from "../components//Loader/Loader";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("../App"));
const AllProducts = lazy(() => import("../components/AllProducts/AllProducts"));
const Clothes = lazy(() => import("../components/Clothes/Clothes"));
const Electronics = lazy(() => import("../components/Electronics/Electronics"));
const Jewelery = lazy(() => import("../components/Jewelery/Jewelery"));
const About = lazy(() => import("../components/About/About"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Checkout = lazy(() => import("../components/Checkout/Checkout"));
const Wishlist = lazy(() => import("../components/Favourites/Favourites"));
const Product = lazy(() => import("../components/Product/Product"));
const Footer = lazy(() => import("../components/Footer/Footer"));

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
                    <Footer />
                </Suspense>),

            },
            {
                path: "/checkout/cart",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Checkout />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/checkout/address",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Checkout />
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
                path: "/electronics",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Electronics />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/jewelery",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Jewelery />
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
            {
                path: "/contact",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <Contact />
                    <Footer />
                </Suspense>),

            },
            {
                path: "/about",
                element: (<Suspense fallback={<BouncingDotsLoader />}>
                    <About />
                    <Footer />
                </Suspense>),

            },
        ]

    },
]);

