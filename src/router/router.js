import React from "react";
import About from "../pages/About"
import Error from "../pages/Error"
import { PostIdPage } from "../pages/PostIdPage"
import Posts from "../pages/Posts"
import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";


export const privateRoutes = [
    {path: '/about', element: <About />},
    {path: '/posts', element: <Posts />},
    {path: '/posts/:id', element: <PostIdPage />},
    {path: '/error', element: <Error />},
    {path: '/', element: <Posts />},
    {path: '/login', element: <Posts />},
    {path: '/*', element: <Navigate to="/error" replace />}
]

export const publicRoutes = [
    {path: '/login', element: <Login />},
    {path: '/*', element: <Navigate to="/login" replace />}
]