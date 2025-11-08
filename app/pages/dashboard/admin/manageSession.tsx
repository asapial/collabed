import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";
// import { ErrorToast, SuccessToast } from "../../../utils/ToastMaker";

const ManageSessions = () => {
  const { user } = useContext(AuthContext);
  const { getAllSessions, approveSession, rejectSession, deleteSession } = useFetchApi();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [rejectingSessionId, setRejectingSessionId] = useState(null);

  // Fetch sessions
  const loadSessions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await getAllSessions(user.email);
      setSessions(res || []);
    } catch (err) {
      console.error(err);
    //   ErrorToast("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [user]);

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const approvedSessions = sessions.filter((s) => s.status === "approved");

  const handleApproveClick = (session) => {
    setSelectedSession(session);
    setShowApproveModal(true);
  };

  const handleApproveSubmit = async () => {
    if (!selectedSession || !user) return;
    try {
      const payload = { id: selectedSession._id, amount: isPaid ? amount : 0 };
      await approveSession(payload, user.email);
      setShowApproveModal(false);
      loadSessions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = (id) => {
    setRejectingSessionId(id);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectingSessionId || !user) return;
    try {
      const payload = { reason: rejectReason, feedback: rejectFeedback };
      await rejectSession(rejectingSessionId, payload, user.email);
      setShowRejectModal(false);
      setRejectReason("");
      setRejectFeedback("");
      setRejectingSessionId(null);
      loadSessions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!user) return;
    try {
      await deleteSession(id, user.email);
      loadSessions();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#7C3AED" style={{ marginTop: 60 }} />;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F9F5FF",
        padding: 18,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "#6D28D9",
        }}
      >
        🎓 Manage Sessions
      </Text>

      {/* ---------- Pending Sessions ---------- */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#4B5563" }}>
        ⏳ Pending Sessions
      </Text>
      {pendingSessions.length === 0 ? (
        <Text style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 20 }}>No pending sessions.</Text>
      ) : (
        pendingSessions.map((session) => (
          <View
            key={session._id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 16,
              borderRadius: 16,
              marginBottom: 14,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3,
              borderLeftWidth: 4,
              borderLeftColor: "#F59E0B",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#111827" }}>{session.title}</Text>
            <Text style={{ color: "#4B5563" }}>Tutor: {session.tutorName}</Text>
            <Text style={{ color: "#4B5563" }}>Email: {session.tutorEmail}</Text>
            <Text style={{ color: "#6B7280" }}>
              Registration: {session.registrationStart} → {session.registrationEnd}
            </Text>
            <Text style={{ color: "#6B7280" }}>
              Class: {session.classStart} → {session.classEnd}
            </Text>
            <Text style={{ color: "#6B7280" }}>Duration: {session.duration}</Text>
            <Text style={{ color: "#6B7280" }}>
              Fee:{" "}
              {parseFloat(session.registrationFee) > 0
                ? `$${session.registrationFee}`
                : "Free"}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 12, gap: 10 }}>
              <TouchableOpacity
                onPress={() => handleApproveClick(session)}
                style={{
                  flex: 1,
                  backgroundColor: "#10B981",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleReject(session._id)}
                style={{
                  flex: 1,
                  backgroundColor: "#EF4444",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* ---------- Approved Sessions ---------- */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 12, color: "#4B5563" }}>
        ✅ Approved Sessions
      </Text>
      {approvedSessions.length === 0 ? (
        <Text style={{ color: "#9CA3AF", fontSize: 16 }}>No approved sessions.</Text>
      ) : (
        approvedSessions.map((session) => (
          <View
            key={session._id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 16,
              borderRadius: 16,
              marginBottom: 14,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3,
              borderLeftWidth: 4,
              borderLeftColor: "#10B981",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#111827" }}>{session.title}</Text>
            <Text style={{ color: "#4B5563" }}>Tutor: {session.tutorName}</Text>
            <Text style={{ color: "#4B5563" }}>Email: {session.tutorEmail}</Text>
            <Text style={{ color: "#6B7280" }}>
              Registration: {session.registrationStart} → {session.registrationEnd}
            </Text>
            <Text style={{ color: "#6B7280" }}>
              Class: {session.classStart} → {session.classEnd}
            </Text>
            <Text style={{ color: "#6B7280" }}>Duration: {session.duration}</Text>
            <Text style={{ color: "#6B7280" }}>
              Fee:{" "}
              {parseFloat(session.registrationFee) > 0
                ? `$${session.registrationFee}`
                : "Free"}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => handleDelete(session._id)}
                style={{
                  flex: 1,
                  backgroundColor: "#9CA3AF",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* ---------- Approve Modal ---------- */}
      <Modal visible={showApproveModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 16, elevation: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 10 }}>
              Approve Session
            </Text>
            <Text style={{ color: "#6B7280", marginBottom: 8 }}>Is this session paid?</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => setIsPaid(false)}
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: !isPaid ? "#7C3AED" : "#E5E7EB",
                  borderRadius: 10,
                  marginRight: 6,
                }}
              >
                <Text
                  style={{ color: !isPaid ? "white" : "#111827", textAlign: "center", fontWeight: "600" }}
                >
                  Free
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsPaid(true)}
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: isPaid ? "#7C3AED" : "#E5E7EB",
                  borderRadius: 10,
                  marginLeft: 6,
                }}
              >
                <Text
                  style={{ color: isPaid ? "white" : "#111827", textAlign: "center", fontWeight: "600" }}
                >
                  Paid
                </Text>
              </TouchableOpacity>
            </View>

            {isPaid && (
              <TextInput
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(text) => setAmount(Number(text))}
                style={{
                  borderWidth: 1,
                  borderColor: "#7C3AED",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 14,
                }}
              />
            )}

            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
              <TouchableOpacity
                onPress={() => setShowApproveModal(false)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderWidth: 1,
                  borderColor: "#7C3AED",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#6B21A8", fontWeight: "500" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApproveSubmit}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  backgroundColor: "#10B981",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ---------- Reject Modal ---------- */}
      <Modal visible={showRejectModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 16, elevation: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 10 }}>
              Reject Session
            </Text>
            <TextInput
              placeholder="Reason"
              value={rejectReason}
              onChangeText={setRejectReason}
              style={{
                borderWidth: 1,
                borderColor: "#EF4444",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Feedback (optional)"
              value={rejectFeedback}
              onChangeText={setRejectFeedback}
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 10,
                padding: 10,
                minHeight: 80,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setRejectFeedback("");
                  setRejectingSessionId(null);
                }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderWidth: 1,
                  borderColor: "#9CA3AF",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#4B5563", fontWeight: "500" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRejectSubmit}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  backgroundColor: "#EF4444",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ManageSessions;
