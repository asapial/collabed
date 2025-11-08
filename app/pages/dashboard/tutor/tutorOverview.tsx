import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/app/src/context/AuthContext";

// Simulated fetch function
const fetchTutorOverview = async () => {
  return {
    name: "",
    totalStudents: 120,
    coursesTaught: 8,
    upcomingClasses: 3,
    performance: [
      { subject: "React", rating: 4.7 },
      { subject: "JavaScript", rating: 4.5 },
      { subject: "HTML/CSS", rating: 4.9 },
      { subject: "Node.js", rating: 4.6 },
    ],
  };
};

const TutorOverview = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchTutorOverview();
      setData(result);
      setLoading(false);

      // Smooth fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Loading your overview...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Header Gradient */}
      <LinearGradient colors={["#7C3AED", "#A78BFA"]} style={styles.header}>
        <Text style={styles.headerTitle}>
          Welcome,{" "}
          <Text style={styles.headerName}>{user?.displayName || data.name}</Text> 👋
        </Text>
      </LinearGradient>

      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Stat Cards */}
        <View style={styles.cardsContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Total Students</Text>
            <Text style={styles.cardValue}>{data.totalStudents}</Text>
          </View>

          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Courses Taught</Text>
            <Text style={styles.cardValue}>{data.coursesTaught}</Text>
          </View>

          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Upcoming Classes</Text>
            <Text style={styles.cardValue}>{data.upcomingClasses}</Text>
          </View>
        </View>

        {/* Performance Section */}
        <View style={[styles.performanceContainer, styles.shadow]}>
          <Text style={styles.sectionTitle}>📊 Course Performance</Text>
          {data.performance.map((item, index) => (
            <View key={index} style={styles.performanceItem}>
              <View style={styles.performanceLabel}>
                <Text style={styles.performanceSubject}>{item.subject}</Text>
                <Text style={styles.performanceRating}>{item.rating.toFixed(1)}⭐</Text>
              </View>
              <View style={styles.ratingBarBackground}>
                <View
                  style={[
                    styles.ratingBarFill,
                    { width: `${(item.rating / 5) * 100}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5FF",
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
  },
  headerName: {
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#7C3AED",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    marginHorizontal: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    color: "#6B21A8",
    fontWeight: "500",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7C3AED",
  },
  performanceContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B21A8",
    marginBottom: 15,
    textAlign: "center",
  },
  performanceItem: {
    marginBottom: 14,
  },
  performanceLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  performanceSubject: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
  },
  performanceRating: {
    fontSize: 15,
    color: "#7C3AED",
    fontWeight: "bold",
  },
  ratingBarBackground: {
    height: 8,
    backgroundColor: "#EDE9FE",
    borderRadius: 5,
  },
  ratingBarFill: {
    height: 8,
    backgroundColor: "#7C3AED",
    borderRadius: 5,
  },
});

export default TutorOverview;
