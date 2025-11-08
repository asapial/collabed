import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "@/app/src/context/AuthContext";

const fetchAdminOverview = async () => {
  return {
    totalUsers: 350,
    totalStudents: 250,
    totalTutors: 80,
    totalAdmins: 20,
  };
};

const AdminOverview = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAdminOverview();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !data) {
    return <ActivityIndicator size="large" style={{ marginTop: 60 }} />;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Welcome Admin, <Text style={{ color: "#7C3AED" }}>{user?.displayName || "Admin"}</Text>
      </Text>

      {/* Overview Cards */}
      <View style={{ gap: 12 }}>
        <View style={card}>
          <FontAwesome5 name="users" size={32} color="#7C3AED" />
          <View>
            <Text style={statLabel}>Total Users</Text>
            <Text style={statValue}>{data.totalUsers}</Text>
          </View>
        </View>

        <View style={card}>
          <FontAwesome5 name="user-graduate" size={32} color="#7C3AED" />
          <View>
            <Text style={statLabel}>Total Students</Text>
            <Text style={statValue}>{data.totalStudents}</Text>
          </View>
        </View>

        <View style={card}>
          <FontAwesome5 name="chalkboard-teacher" size={32} color="#7C3AED" />
          <View>
            <Text style={statLabel}>Total Tutors</Text>
            <Text style={statValue}>{data.totalTutors}</Text>
          </View>
        </View>

        <View style={card}>
          <FontAwesome5 name="shield-alt" size={32} color="#7C3AED" />
          <View>
            <Text style={statLabel}>Total Admins</Text>
            <Text style={statValue}>{data.totalAdmins}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminOverview;

const card = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F3E8FF",
  borderWidth: 2,
  borderColor: "#7C3AED",
  borderRadius: 12,
  padding: 16,
  gap: 14,
};

const statLabel = {
  fontSize: 16,
  fontWeight: "600",
};

const statValue = {
  fontSize: 28,
  fontWeight: "bold",
};
