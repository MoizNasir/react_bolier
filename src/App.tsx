import React, { FC } from 'react';
import { Routes, RouteProps, Route, Navigate, BrowserRouter as Router } from "react-router-dom"
import MyRouter from "~/Routes"
import AuthLayout from './components/AuthLayout';
// import VerticalLayout from "~/components/VerticalLayout"

export const App: FC = () => {
    return (
        <React.Fragment>
            <MyRouter />
        </React.Fragment>
    );
};
