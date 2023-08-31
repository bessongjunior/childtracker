// import { Suspense, lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import { RouteObject } from 'react-router';

// import SuspenseLoader from './components/SuspenseLoader';


import {createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Dashboard from './pages/dashboard';
import { HomePage } from './views/pages/homepage';
import { UserDashboard } from './views/dashboard/UserDashboard';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
    {
    path: 'admin/dashboard',
    element: <Dashboard />,
    },
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: 'admin/users',
        element: <UserDashboard />
    },
    {
        path: 'admin/profile',
        element: <Profile />
    }
]);

export function Routes() {
    return <RouterProvider router={router} />;
}



