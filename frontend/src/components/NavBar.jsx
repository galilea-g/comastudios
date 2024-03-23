import { Link } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { ButtonLink } from "./ui/ButtonLink";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuthContext();
    console.log(user)

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">
                <Link className="text-white" to={isAuthenticated ? "/themes" : "/"}>Community Manager</Link>
            </h1>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                <>
                    <li className="text-white">
                        Welcome {user.username}
                    </li>
                    <li className="text-white">
                        <Link to="/themes" className="py-2 px-10 hover:text-blue-400">Themes</Link>
                    </li>
                    <li className="text-white">
                        <Link to="/categories" className="py-2 px-10 hover:text-blue-400">Categories</Link>
                    </li>
                    <li className="text-white">
                        <Link to="/login" onClick={() => logout()} className="py-2 px-10 hover:text-blue-400">Logout</Link>
                    </li>
                </>
                ) : (
                <>
                    <li className="text-white">
                        <ButtonLink to="/login">Login</ButtonLink>
                    </li>
                    <li className="text-white">
                        <ButtonLink to="/register">Register</ButtonLink>
                    </li>
                </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;