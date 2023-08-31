import { Suspense, lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SuspenseLoader from './components/SuspenseLoader';


import {createBrowserRouter, RouterProvider } from 'react-router-dom'; 
// import {Dashboard} from './pages/dashboard';
import { HomePage } from './views/pages/homepage';
// import { Profile } from './pages/Profile';
// import { Users } from './pages/User';
import { DashboardLayout } from './layouts/DashboardLayout';


const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Users = lazy(() => import('./pages/User'));

// const LazyPage = lazy(() => import('./LazyPage'));
// const LazyPage = lazy(() => import('./LazyPage'));

    // element=( 
    //     <Suspense fallback={<div>Loading…</div>}>
    //     <LazyPage />
    //     </Suspense>
    // )

const router = createBrowserRouter([
    // {
    // path: 'admin/dashboard',
    // element: <Dashboard />,
    // },
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: 'admin',
        element: <DashboardLayout />,
        children: [
            {
                path: 'dashboard',
                element: ( 
                    <Suspense fallback={<SuspenseLoader />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<SuspenseLoader />}>
                        <Users />
                    </Suspense>
                )
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<SuspenseLoader />}>
                        <Profile />
                    </Suspense>
                )
            },
        ]
    }
]);

export function Routes() {
    return <RouterProvider router={router} />;
}



