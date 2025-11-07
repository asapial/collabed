import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import useFetchApi from "../../src/Api/useFetchApi";

export default function AllSessions() {
  const { getAllSessionsGeneral } = useFetchApi();

  const [sessions, setSessions] = useState([]);
  const [total, setTotal] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / cardsPerPage);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const result = await getAllSessionsGeneral(currentPage, cardsPerPage);
      setSessions(result.sessions);
      setTotal(result.total);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, [currentPage, cardsPerPage]);

  const getStatus = (start, end) => {
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);
    return now >= s && now <= e ? "Ongoing" : "Closed";
  };

  const goToDetails = (id) => {
    router.push(`/sessionDetails/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No sessions available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Study Sessions</Text>

      {/* Cards Per Page Picker */}
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={cardsPerPage}
          style={{ width: 150 }}
          onValueChange={(value) => {
            setCardsPerPage(value);
            setCurrentPage(1);
          }}
        >
          <Picker.Item label="3 per page" value={3} />
          <Picker.Item label="6 per page" value={6} />
          <Picker.Item label="9 per page" value={9} />
        </Picker>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={4} style={styles.description}>{item.description}</Text>

            <View style={styles.row}>
              <FontAwesome name="calendar" size={14} />
              <Text style={styles.dateText}> From: {item.registrationStart}</Text>
            </View>

            <View style={styles.row}>
              <FontAwesome name="calendar" size={14} />
              <Text style={styles.dateText}> To: {item.registrationEnd}</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text
                style={[
                  styles.statusBadge,
                  getStatus(item.registrationStart, item.registrationEnd) === "Ongoing"
                    ? styles.ongoing
                    : styles.closed,
                ]}
              >
                {getStatus(item.registrationStart, item.registrationEnd)}
              </Text>

              <TouchableOpacity style={styles.readMoreBtn} onPress={() => goToDetails(item._id)}>
                <FontAwesome5 name="info-circle" size={14} />
                <Text style={{ marginLeft: 4 }}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageBtn,
              currentPage === index + 1 && styles.pageBtnActive
            ]}
            onPress={() => setCurrentPage(index + 1)}
          >
            <Text>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F2F5F9" },
  heading: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  loaderBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  pickerBox: { alignItems: "flex-end", marginBottom: 10 },
  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  description: { fontSize: 14, marginBottom: 8, color: "#444" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  dateText: { marginLeft: 6, fontSize: 13 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, fontWeight: "600" },
  ongoing: { backgroundColor: "#B9F6CA" },
  closed: { backgroundColor: "#FFCDD2" },
  readMoreBtn: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 6, borderRadius: 6 },
  pagination: { flexDirection: "row", justifyContent: "center", marginTop: 10, flexWrap: "wrap" },
  pageBtn: { padding: 6, margin: 4, borderWidth: 1, borderRadius: 6 },
  pageBtnActive: { backgroundColor: "#A3D8FF", borderColor: "#007AFF" },
});
