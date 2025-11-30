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

import axios from "axios";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      try {
        // 1️⃣ Get JWT first
        await axios.post(
          "https://rice-agency-server.vercel.app/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );

        // 2️⃣ Now JWT is ready — use normal axios (not axiosSecure) for user role
        const res = await axios.get(
          `https://rice-agency-server.vercel.app/users?email=${currentUser.email}`,
          { withCredentials: true }
        );

        const userFromDb = res.data;

        // 3️⃣ Save user info
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          uid: currentUser.uid,
          role: userFromDb?.role || "user",
        });
      } catch (error) {
        console.error("Auth load error:", error);
      }
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
