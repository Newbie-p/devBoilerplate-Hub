import { Link } from "react-router-dom";

export default function AdminDashboard(){
    return(
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                to="/admin/create-framework"
                className="p-6 border rounded shadow hover:shadow-lg"
                >
                Create Framework
                </Link>

                <Link
                to="/admin/create-category"
                className="p-6 border rounded shadow hover:shadow-lg"
                >
                Create Category
                </Link>

                <Link
                to="/admin/create-snippet"
                className="p-6 border rounded shadow hover:shadow-lg"
                >
                Create Snippet
                </Link>
            </div>
        </div>
    );
}