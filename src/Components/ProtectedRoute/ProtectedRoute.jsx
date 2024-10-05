import { Navigate } from "react-router-dom";

export default function getExample({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/Login"}></Navigate>;
  } else {
    return children;
  }
}
