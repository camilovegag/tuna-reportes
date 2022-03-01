import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { authErrors } from "../firebase/authErrors";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = (email, password, displayName) => {
    setError(null);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        dispatch({ type: "LOGIN", payload: credential.user });
        updateProfile(auth.currentUser, { displayName });
      })
      .catch((err) => {
        setError(err.message);
        throw new Error(authErrors[err.code]);
      });
  };
  return { error, setError, signup };
};
