import { useAuthContext } from './context/AuthContext'
import { Navigate, Outlet } from  "react-router-dom";

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuthContext()

    if(loading){
        return <div><h1>Loading...</h1></div>
    }

    if(!loading && !isAuthenticated){
        return <Navigate to='/login' replace/>
    }

    //Outlet continues with the route  below it in the file hierarchy. It allows us  to render nested routes
    return <Outlet/>
}

export default ProtectedRoute