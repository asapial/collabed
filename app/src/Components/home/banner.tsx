import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const Banner = () => {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>
          Shared
        </Text>

        <Text style={styles.gradientText}>
          Collaborative
        </Text>

        <Text style={styles.title}>
          Platform for Education
        </Text>

        <Text style={styles.description}>
          Empower your learning journey with a smart platform built for collaboration,
          tutor guidance, and real-time educational support. Take notes, attend sessions,
          and grow together.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            {/* <Icon name="rocket" size={18} color="#fff" /> */}
            <Text style={styles.primaryBtnText}>Explore Sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn}>
            {/* <Icon name="info-circle" size={18} color="#007bff" /> */}
            <Text style={styles.outlineBtnText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Lottie */}
      <View style={styles.animationContainer}>
        {/* <Lottie source={educationBanner} autoPlay loop style={{ width: 260, height: 260 }} /> */}

        {/* <LottieView source={require('../assets/Animation/educationBanner.json')} autoPlay loop /> */}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FEFFED",
    flexDirection: "column",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  leftSection: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d6efd",
    textAlign: "center",
  },
  gradientText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6a00ff",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    gap: 12,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d6efd",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  primaryBtnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#0d6efd",
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  outlineBtnText: {
    color: "#0d6efd",
    marginLeft: 6,
    fontWeight: "600",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
