import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found. Redirecting...");
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    console.log("Token rejected. Redirecting...");
                    localStorage.removeItem("token");
                    navigate("/");
                }
            } catch (error) {
                console.log("Error in token validation:", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        checkTokenValidity();
    }, [location.pathname, navigate]);

    return <Outlet />;
};

export default ProtectedRoute;
