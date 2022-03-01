import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { authErrors } from "../firebase/authErrors";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const login = (email, passsword) => {
    setError(null);
    return signInWithEmailAndPassword(auth, email, passsword)
      .then((credential) => dispatch({ type: "LOGIN", payload: credential.user }))
      .catch((err) => {
        setError(err.message);
        throw new Error(authErrors[err.code]);
      });
  };
  return { error, setError, login };
};
