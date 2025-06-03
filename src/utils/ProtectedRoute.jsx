import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/auth/user", { withCredentials: true })
            .then(res => setAuth(true))
            .catch(err => setAuth(false));
    }, []);

    if (auth === null) return <p>Loading...</p>;
    if (!auth) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
