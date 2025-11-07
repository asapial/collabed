// app/auth/login.jsx
import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../src/services/firebase.init";
import { AuthContext } from "../../(tabs)/index";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const { loginUser, loginWithGoogle,     mongoLoading, setMongoLoading } = useContext(AuthContext);


//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.replace("/"); // navigate home
//     } catch (error) {
//       console.log("Login Error:", error.message);
//     }
//   };

  const handleGoogleLogin = async () => {
    loginWithGoogle()
      .then((data) => {
        // handleInsertDataLogin(data, findTheUser, postTheUser,mongoLoading, setMongoLoading);
        // navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        // ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>

      {/* Animation */}
      {/* <LottieView 
        source={require("../../assets/Animation/login.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      /> */}

      <Text style={styles.title}>Welcome to CollabEd</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      {/* Email Input */}
      <View style={styles.inputBox}>
        <FontAwesome name="envelope" size={20} color="#666" style={styles.icon}/>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputBox}>
        <FontAwesome name="lock" size={20} color="#666" style={styles.icon}/>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 10 }}>OR</Text>

      {/* Google Login */}
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
        <Ionicons name="logo-google" size={22} color="#000" />
        <Text>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={{ color: "#00A9FF" }}>Register</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}



// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    marginBottom: 20,
    color: "#444",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    width: "100%",
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  btn: {
    backgroundColor: "#00A9FF",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#AAA",
    justifyContent: "center",
    gap: 8,
  },
  linkText: {
    marginTop: 16,
    fontSize: 14,
  },
});
