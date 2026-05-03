import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        toast.error("Please Login First")
        return <Navigate to='/authentication/login' replace />
    }
    return <>

        {children}
    </>
}
export default ProtectedRoute
