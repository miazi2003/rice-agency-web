import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../hook/UseAxiosSecure";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
  const signUpUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  const signInUser = async (email, password) => {
    setLoading(true);

    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const logOutUser = () => signOut(auth);

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        const jwtRes = await axiosSecure.post("http://localhost:5000/jwt", {
          email: currentUser?.email,
        });
        console.log(jwtRes.data);

        setUser(currentUser);
        console.log("user auth", currentUser?.email);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user,
    signUpUser,
    signInUser,
    logOutUser,
    updateUser,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
