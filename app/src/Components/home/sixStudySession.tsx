import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SixStudySession = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axios.get("https://collab-ed-server.vercel.app/getSixSessions"); // replace with your API
                const approved = res.data.filter((s) => s.status === "approved").slice(0, 6);
                setSessions(approved);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const getSessionStatus = (start, end) => {
        const now = new Date();
        const s = new Date(start);
        const e = new Date(end);
        return now >= s && now <= e ? "Ongoing" : "Closed";
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0d6efd" />
            </View>
        );
    }

    if (sessions.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={{ fontSize: 16 }}>No approved sessions found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>
                <FontAwesome name="book" size={22} color="#0d6efd" /> Available Study Sessions
            </Text>

            <FlatList
                data={sessions}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const status = getSessionStatus(item.registrationStart, item.registrationEnd);

                    return (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>
                                <FontAwesome name="book" size={16} color="#0d6efd" /> {item.title}
                            </Text>

                            <Text style={styles.description}>{item.description}</Text>

                            <Text style={styles.meta}>
                                <FontAwesome name="calendar" size={14} color="#6c757d" /> Reg: {item.registrationStart} → {item.registrationEnd}
                            </Text>

                            <Text style={styles.meta}>
                                <FontAwesome name="clock-o" size={14} color="#6c757d" /> Status:{" "}
                                <Text style={{ color: status === "Ongoing" ? "green" : "red" }}>{status}</Text>
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate("SessionDetails", { id: item._id })}
                            >
                                <FontAwesome name="info-circle" size={16} color="#fff" />
                                <Text style={styles.buttonText}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </ScrollView>
    );
};

export default SixStudySession;

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: "#FEFBF8" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    heading: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20, color: "#0d6efd" },
    card: {
        backgroundColor: "#FEFFED",
        width: "48%",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 3,
       
    },
    cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6, color: "#0d6efd" },
    description: { fontSize: 13, color: "#555", marginBottom: 8, textAlign:"justify" },
    meta: { fontSize: 12, color: "#666", marginBottom: 4 },
    button: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0d6efd",
        paddingVertical: 6,
        borderRadius: 6,
        justifyContent: "center",
        gap: 6,
    },
    buttonText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
});
