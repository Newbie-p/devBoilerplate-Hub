import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

export default function Navbar(){
    const { user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate("/login");
    };

    return(
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-black">
                Dev Boilerplate Hub
            </Link>

            <div className="flex items-center gap-4">
                {!user ? (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-black">
                            Login
                        </Link>
                        <Link to="/register" className="text-gray-700 hover:text-black">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="text-gray-700 hover:text-black">
                            Dashboard
                        </Link>
                        <button className="text-gray-700 hover:text-black">
                            Logout
                        </button>
                    </>
                )}
            

            </div>
        </nav>
    )
}