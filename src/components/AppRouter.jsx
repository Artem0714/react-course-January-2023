import React, { useContext } from "react";
import { BrowserRouter, Routes, Navigate, useRoutes, Router } from "react-router-dom";
import { AuthContext } from "../context";
import { publicRoutes, privateRoutes } from "../router/router";
import { Loader } from "./UI/Loader/Loader";



export const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    let routes = [];
    isAuth ? routes=privateRoutes : routes=publicRoutes;

    return (
        <>{useRoutes(routes)}</>
    )
}