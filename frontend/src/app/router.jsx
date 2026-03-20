import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Dashboard from "../features/auth/pages/Dashboard";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import FrameworkList from "../features/frameworks/pages/FrameworkList";
import FrameworkDetail from "../features/frameworks/pages/FrameworkDetail";
import SnippetList from "../features/snippets/pages/SnippetList";
import SnippetDetail from "../features/snippets/pages/SnippetDetail";
import Layout from "../layout/Layout";
import PublicRoute from "../features/auth/PublicRoute";
import AdminRoute from "../features/auth/AdminRoute";
import AdminDashboard from "../features/auth/pages/AdminDashboard";
import CreateFramework from "../features/admin/pages/createFramework";
import CreateCategory from "../features/admin/pages/CreateCategory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                index: true,
                element:<FrameworkList />
            },
            {
                path: "/login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "/register",
                element:(
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/frameworks/:slug",
                element: <FrameworkDetail />
            },
            {
                path: "/frameworks/:slug/:categorySlug",
                element: <SnippetList />
            },
            {
                path: "/frameworks/:slug/:categorySlug/:integrationSlug",
                element: <SnippetDetail />
            },
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                )
            },
            {
                path: "admin/create-framework",
                element:(
                    <AdminRoute>
                        <CreateFramework />
                    </AdminRoute>
                )
            },
            {
                path: "admin/create-category",
                element: (
                    <AdminRoute>
                        <CreateCategory />
                    </AdminRoute>
                )
            }
        ]
    },
    
])