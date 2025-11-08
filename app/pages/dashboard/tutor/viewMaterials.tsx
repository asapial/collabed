import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

const ViewMaterials = () => {
  const { user } = useContext(AuthContext);
  const { getAllMaterials } = useFetchApi();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!user?.email) return;
      try {
        const res = await getAllMaterials(user.email);
        setMaterials(res);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [user?.email]);

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Study Materials</Text>

      {materials.length === 0 ? (
        <Text style={styles.noMaterials}>No materials uploaded yet.</Text>
      ) : (
        <View style={styles.grid}>
          {materials.map((material) => (
            <View key={material._id} style={styles.card}>
              <Image
                source={{ uri: material.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardBody}>
                <Text style={styles.title}>{material.title}</Text>
                <Text style={styles.sessionId}>
                  Session ID: {material.sessionId}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openLink(material.driveLink)}
                >
                  <Text style={styles.buttonText}>View on Google Drive</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3E8FF" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F59E0B",
    textAlign: "center",
    marginBottom: 20,
  },
  noMaterials: { textAlign: "center", color: "#6B7280", fontSize: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    backgroundColor: "#EDE7F6",
    borderRadius: 12,
    marginBottom: 16,
    width: "48%",
    overflow: "hidden",
  },
  image: { width: "100%", height: 120 },
  cardBody: { padding: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  sessionId: { fontSize: 14, color: "#4B5563", marginBottom: 8 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ViewMaterials;
