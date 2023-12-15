import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from "./Main";
// import dashboard
import DashboardMain from "./dashboard/Dashboard";
import { salesRoutes } from "./sales/salesRoutes";
import { inventoryRoutes } from "./inventory/inventoryRoutes";
// Login
import LoginPage from './LoginPage';
// import finance
import Finance from "./finance/Finance";
// import admin
import AdminProtector from './admin/AdminProtector';
import Users from "./admin/users/Users";
import Audition from "./admin/audit/Audition";
import Requests from "./admin/requests/Requests";
// Human Resource
import HumanResource from './hr/HumanResource';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <DashboardMain />
            },
            salesRoutes,
            inventoryRoutes,
            {
                path: "human_resource",
                element: <HumanResource />,
                children: [
                    {
                        path: "employees",
                        element: <></>
                    },
                    {
                        path: "commissions",
                        element: <></>
                    },
                    {
                        path: 'payroll',
                        element: <></>
                    }
                ]
            },
            {
                path: 'finance',
                element: <Finance />
            },
            {
                path: "admin",
                element: <AdminProtector />,
                children: [
                    {
                        path: "users",
                        element: <Users />
                    },
                    {
                        path: 'audition',
                        element: <Audition />
                    },
                    {
                        path: 'requests',
                        element: <Requests />
                    }
                ]
            },
            {
                path: 'requests',
                element: <></>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    }


]);

function Routes() {
    return (
        <RouterProvider router={router} />
    );
}

export default Routes;
