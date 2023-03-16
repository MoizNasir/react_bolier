import React, { FC } from 'react';
import { RouteProps } from "react-router-dom"
// import { WithRouterProps } from '../Models/WithRouterProps.model';

interface AuthLayoutProps {
    children: RouteProps["children"];
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <React.Fragment>{children}</React.Fragment>
    );
}

export default AuthLayout;
