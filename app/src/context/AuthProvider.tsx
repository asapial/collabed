import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { auth } from '../services/firebase.init';
import axios from 'axios';
import { AuthContext } from './AuthContext';



const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authActionCount, setAuthActionCount] = useState(0); // Triggers useEffect
  const provider = new GoogleAuthProvider();
  const [mongoLoading, setMongoLoading] = useState(true);

  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setAuthActionCount((prev) => prev + 1); // Trigger effect
          return user;
        });
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
        return res;
      })
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
      })
      .finally(() => setLoading(false));
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
      })
      .finally(() => setLoading(false));
  };

  const loginWithGoogle=()=>{
    setLoading(true);
    return signInWithPopup(auth,provider)
    .finally(() => setLoading(false));
  }

  const resetEmail=(email)=>{
    return sendPasswordResetEmail(auth,email);
  }

useEffect(() => {
  setLoading(true);

  const unsubscribe = onAuthStateChanged(auth, async (userData) => {
    if (userData) {
      try {
        const dbUser = await axios
          .get(`https://collab-ed-server.vercel.app/searchTheUser?email=${userData.email}`)
          .then((res) => res.data);

        console.log("MongoDB user data:", dbUser);

        setUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          accessToken: userData.accessToken,
          ...dbUser,
        });
      } catch (err) {
        console.error("Failed to fetch user from MongoDB:", err);
        setUser(userData);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, [authActionCount,mongoLoading]);



  // data fetching part 



  const userData = {
    createUser,
    loginUser,
    signOutUser,
    updateUser,
    user,
    loading,
    loginWithGoogle,
    resetEmail,
    mongoLoading,
    setMongoLoading
  };
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;