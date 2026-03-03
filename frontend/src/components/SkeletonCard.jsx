export default function SkeletonCard(){
    return(
        <div className="animate-pulse p-6 border rounded shadow">
            <div className="h-6 bg-gray-300 rounded mb-4 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
    )
}