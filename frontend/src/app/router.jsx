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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrameworkList />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
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
    }
])