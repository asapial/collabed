import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";

const fetchOverviewData = async () => {
  return {
    enrolledCourses: 5,
    completedAssignments: 12,
    upcomingExams: 2,
    performance: [
      { subject: "Math", score: 85 },
      { subject: "Physics", score: 78 },
      { subject: "Chemistry", score: 92 },
      { subject: "English", score: 74 },
    ],
  };
};

const StudentOverview = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverviewData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.heading}>
        Welcome Back, <Text style={styles.highlight}>{user?.displayName}</Text>
      </Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Enrolled Courses</Text>
          <Text style={styles.statValue}>{data.enrolledCourses}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Assignments Completed</Text>
          <Text style={styles.statValue}>{data.completedAssignments}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Upcoming Exams</Text>
          <Text style={styles.statValue}>{data.upcomingExams}</Text>
        </View>
      </View>

      {/* Performance */}
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      {data.performance.map((item, index) => (
        <View key={index} style={styles.barRow}>
          <Text style={styles.barLabel}>{item.subject}</Text>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${item.score}%` }]} />
          </View>
          <Text style={styles.scoreText}>{item.score}%</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F5F3FF", padding: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  highlight: { color: "#7C3AED" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
  statCard: {
    width: "32%",
    backgroundColor: "#EDE9FE",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: { fontSize: 14, color: "#4B5563", textAlign: "center" },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#7C3AED", marginTop: 5 },

  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },

  barRow: { marginBottom: 15 },
  barLabel: { fontSize: 14, marginBottom: 5, color: "#374151" },
  barBackground: {
    width: "100%",
    height: 14,
    backgroundColor: "#DDD6FE",
    borderRadius: 8,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#7C3AED",
    borderRadius: 8,
  },
  scoreText: { fontSize: 12, color: "#6B7280", marginTop: 3 },
});

export default StudentOverview;
