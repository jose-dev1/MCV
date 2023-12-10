import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

export const ProtectedRoute = ({ element, path }) => {
  if (
    ["/", "/login", "/registro", "/recuperar-contraseña"].includes(path) ||
    isAuthenticated()
  ) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};
