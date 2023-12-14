import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user !== null && user.fk_tipo_usuario !== undefined;
};

export const ProtectedRoute = ({
  element,
  path,
  requiredUserRole,
  redirectPath,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (
    ["/", "/login", "/registro", "/recuperar-contraseña"].includes(path) ||
    (isAuthenticated() && user.fk_tipo_usuario === requiredUserRole)
  ) {
    return element;
  } else {
    return <Navigate to={redirectPath || "/"} />;
  }
};
