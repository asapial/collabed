import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

// Icons (using react-native-vector-icons)
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const MySession = () => {
  const { user } = useContext(AuthContext);
  const { mySession, resendApprovalRequest } = useFetchApi();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      if (!user?.email) return;
      setLoading(true);
      const res = await mySession(user.email);
      setSessions(res);
      setLoading(false);
    };
    loadSessions();
  }, [user?.email]);

  const handleResendRequest = async (id) => {
    try {
      const res = await resendApprovalRequest(id, user.email);
      if (res.modifiedCount > 0) {
        alert("Approval request resent successfully!");
        // Refresh sessions
        const updatedSessions = await mySession(user.email);
        setSessions(updatedSessions);
      } else {
        alert("Failed to resend approval request.");
      }
    } catch (err) {
      console.error("Error resending request:", err);
      alert("Error resending request.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 60 }} />;
  }

  console.log("Sessions Data:", sessions);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>
        <MaterialIcon name="menu-book" size={24} color="#7C3AED" /> My Study Sessions
      </Text>

      {sessions.map((session) => (
        <View key={session._id} style={styles.card}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Icon name="check-circle" size={20} color="#7C3AED" />
            <Text style={styles.titleText}>{session.title}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {session.description?.slice(0, 120)}...
          </Text>

          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View
              style={[
                styles.statusBadge,
                session.status === "approved"
                  ? styles.badgeSuccess
                  : session.status === "rejected"
                  ? styles.badgeError
                  : styles.badgeWarning,
              ]}
            >
              {session.status === "approved" && <Icon name="check-circle" size={14} color="white" />}
              {session.status === "rejected" && <Icon name="times-circle" size={14} color="white" />}
              {session.status === "pending" && <Icon name="clock-o" size={14} color="white" />}
              <Text style={styles.statusText}>{session.status}</Text>
            </View>
          </View>

          {/* Rejection Reason + Feedback */}
          {session.status === "rejected" && (
            <View style={styles.rejectionContainer}>
              {session.rejectionReason && (
                <Text style={styles.rejectionText}>
                  <Text style={{ fontWeight: "bold" }}>Reason:</Text> {session.rejectionReason}
                </Text>
              )}
              {session.rejectionFeedback && (
                <Text style={styles.rejectionText}>
                  <Text style={{ fontWeight: "bold" }}>Feedback:</Text> {session.rejectionFeedback}
                </Text>
              )}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {session.status === "rejected" && (
              <TouchableOpacity
                style={[styles.button, styles.warningButton]}
                onPress={() => handleResendRequest(session._id)}
              >
                <Icon name="refresh" size={16} color="#D97706" />
                <Text style={[styles.buttonText, { color: "#D97706" }]}> Resend Approval Request</Text>
              </TouchableOpacity>
            )}
            {session.status === "approved" && (
              <TouchableOpacity style={[styles.button, styles.primaryButton]}>
                <Text style={[styles.buttonText, { color: "#4F46E5" }]}>Upload Materials</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3E8FF" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#EDE7F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  titleText: { fontSize: 18, fontWeight: "bold", marginLeft: 6 },
  description: { fontSize: 14, color: "#374151", marginBottom: 8 },
  statusContainer: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  statusLabel: { fontSize: 14, fontWeight: "500" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeSuccess: { backgroundColor: "#16A34A" },
  badgeError: { backgroundColor: "#DC2626" },
  badgeWarning: { backgroundColor: "#F59E0B" },
  statusText: { color: "white", fontWeight: "bold", textTransform: "capitalize" },
  rejectionContainer: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  rejectionText: { fontSize: 14, color: "#B91C1C", marginBottom: 4 },
  actionsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  primaryButton: { borderWidth: 1, borderColor: "#4F46E5", backgroundColor: "white" },
  warningButton: { borderWidth: 1, borderColor: "#D97706", backgroundColor: "white" },
  buttonText: { fontSize: 14, fontWeight: "600" },
});

export default MySession;
