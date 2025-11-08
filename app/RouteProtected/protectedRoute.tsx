import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";


export default function PrivateRoute({ requiredRole, children }) {
  const { user } = useContext(AuthContext);

  // not logged in → redirect to login
  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  // wrong role → redirect to unauthorized page
  if (requiredRole && user.role !== requiredRole) {
    return <Redirect href="/unauthorized" />;
  }

  // allowed
  return children;
}
