import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useFetchApi from "@/app/src/Api/useFetchApi";

const BookedSession = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
    const { getMyBookedSessions } = useFetchApi();

  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch function (replace with your real API call)
  const fetchBookedSessions = async () => {
    try {
    //   const res = await getMyBookedSessions(user?.email);
      const data = await getMyBookedSessions(user?.email);
      setBookedSessions(data);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookedSessions();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <MaterialIcons name="book-online" size={30} color="#10B981" /> My Booked Sessions
      </Text>

      {bookedSessions.length === 0 ? (
        <Text style={styles.noData}>You haven't booked any sessions yet.</Text>
      ) : (
        <FlatList
          data={bookedSessions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.sessionTitle}>{item.sessionTitle}</Text>
              <Text style={styles.tutorEmail}>Tutor: {item.tutorEmail}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(`/sessionDetails/${item.sessionId}`)}
              >
                <MaterialIcons name="info" size={18} color="#fff" />
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BookedSession;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#10B981",
  },
  noData: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#6B7280" },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10B981",
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  sessionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  tutorEmail: { color: "#4B5563", marginBottom: 12 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingVertical: 8,
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
});
