import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const location = useLocation();
  setTimeout(async() => {
    await localStorage.removeItem("token");
  },60000*5);
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
