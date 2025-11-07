// app/tutors/allTutors.jsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import useFetchApi from "@/app/src/Api/useFetchApi";
// import useFetchApi from "../../src/Api/useFetchApi";

export default function AllTutors() {
  const { fetchTutors } = useFetchApi();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tutors on mount
  useEffect(() => {
    fetchTutors()
      .then((data) => setTutors(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00A9FF" />
      </View>
    );
  }

  const renderTutor = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.userName}</Text>
        <View style={styles.emailRow}>
          <FontAwesome name="envelope" size={16} color="#00A9FF" />
          <Text style={styles.emailText}>{item.email}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <FontAwesome5 name="graduation-cap" size={22} color="#00A9FF" /> Meet Our Tutors
        </Text>
        <Text style={styles.subtitle}>
          Learn from experienced and dedicated educators from diverse subjects.
        </Text>
      </View>

      <FlatList
        data={tutors}
        keyExtractor={(item) => item._id}
        renderItem={renderTutor}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16, gap:10 }}
        scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#111", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", maxWidth: 300 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: "100%", height: 120 },
  cardBody: { padding: 12 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  emailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  emailText: { fontSize: 14, color: "#444" },
});
