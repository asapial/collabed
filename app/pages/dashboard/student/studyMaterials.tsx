import useFetchApi from "@/app/src/Api/useFetchApi";
import { AuthContext } from "@/app/src/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Picker,
  ScrollView,
} from "react-native";


const StudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const { getStudentMaterials } = useFetchApi();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState("");

  // Fetch Materials
  const loadMaterials = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getStudentMaterials(user.email);
      setMaterials(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [user]);

  // Extract unique session IDs
  const sessionIds = [...new Set(materials.map((m) => m.sessionId))];

  // Auto-select first session if exists
  useEffect(() => {
    if (sessionIds.length > 0 && !selectedSession) {
      setSelectedSession(sessionIds[0]);
    }
  }, [sessionIds, selectedSession]);

  // Filter materials by selected session
  const filteredMaterials = selectedSession
    ? materials.filter((m) => m.sessionId === selectedSession)
    : [];

  // Image download placeholder (React Native needs a library to download images)
  const downloadImage = (url) => {
    Alert.alert("Download", "Download functionality requires a library in React Native");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading materials...</Text>
      </View>
    );
  }

  if (materials.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No materials found. Join a session to receive study materials.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
        My Learning Materials
      </Text>

      {/* Session Selector */}
      <View style={{ marginBottom: 16 }}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={(itemValue) => setSelectedSession(itemValue)}
        >
          <Picker.Item label="Select a session" value="" />
          {sessionIds.map((id) => (
            <Picker.Item key={id} label={`Session: ${id}`} value={id} />
          ))}
        </Picker>
      </View>

      {/* Materials */}
      {filteredMaterials.length > 0 ? (
        filteredMaterials.map((material) => (
          <View
            key={material._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              marginBottom: 16,
              padding: 12,
              borderWidth: 2,
              borderColor: "#4f46e5",
            }}
          >
            <Image
              source={{ uri: material.image }}
              style={{ width: "100%", height: 150, borderRadius: 12 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => downloadImage(material.image)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Download</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
              {material.title}
            </Text>
            <Text style={{ marginTop: 4, color: "#555" }}>
              Tutor: {material.tutorEmail}
            </Text>

            <TouchableOpacity
              onPress={() => {
                // Open Google Drive link in browser
              }}
              style={{
                marginTop: 8,
                paddingVertical: 8,
                backgroundColor: "#4f46e5",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>View Material</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : selectedSession ? (
        <Text style={{ textAlign: "center" }}>No materials found for this session.</Text>
      ) : null}
    </ScrollView>
  );
};

export default StudyMaterials;
