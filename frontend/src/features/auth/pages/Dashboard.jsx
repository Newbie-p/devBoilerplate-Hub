import { useAuth } from "../authContext";

export default function Dashboard(){
    const { logout } = useAuth();
    return(
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button className="bg-red-500 text-white px-4 py-2" onClick={logout}>Logout</button>
        </div>
    )
}