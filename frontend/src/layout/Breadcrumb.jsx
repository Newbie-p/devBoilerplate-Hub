import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb(){
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    if(pathnames.length === 0) return null;

    return(
        <div className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:underline">
                Home
            </Link>
            {pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index+1).join("/");
                const isLast = index === pathnames.length - 1;

                return(
                    <span key={to}>
                        {" > "}
                        {isLast ? (
                            <span className="text-black font-medium">
                                {value}
                            </span>
                        ) : (
                            <Link to={to} className="hover:underline">
                                {value}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    )
}