import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

export default function Layout(){
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1 container mx-auto px-6 py-8">
                <Breadcrumb />
                <Outlet />
            </main>
        </div>
    );
}