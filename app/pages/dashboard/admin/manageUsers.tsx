import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

const ManageUsers = () => {
  const { getAllUsers, updateUserRole } = useFetchApi();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [insideLoading, setInsideLoading] = useState(false);

  const loadUsers = async () => {
    if (!user) return;
    try {
      setInsideLoading(true);
      const res = await getAllUsers(searchText, currentPage, limit, user.email);
      setUsers(res.users || []);
      setTotalPages(Math.ceil((res.total || 0) / limit));
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setInsideLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadUsers();
  }, [searchText, currentPage, user]);

  const handleRoleChange = async (id, newRole) => {
    if (!user) return;
    try {
      setInsideLoading(true);
      await updateUserRole(id, newRole, user.email);
      await loadUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setInsideLoading(false);
    }
  };

  if (authLoading || !user) {
    return <ActivityIndicator size="large" style={{ marginTop: 80 }} color="#7C3AED" />;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F9F5FF",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          color: "#6D28D9",
          marginBottom: 20,
          letterSpacing: 0.5,
        }}
      >
        👥 Manage Users
      </Text>

      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: Platform.OS === "ios" ? 10 : 6,
          marginBottom: 18,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <TextInput
          placeholder="🔍 Search by name or email"
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setCurrentPage(1);
          }}
          style={{
            flex: 1,
            fontSize: 16,
            color: "#111827",
          }}
        />
      </View>

      {/* User list */}
      {insideLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 60 }} color="#6D28D9" />
      ) : users.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 60,
            fontSize: 16,
            color: "#6B7280",
          }}
        >
          No users found 🫤
        </Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 16,
                marginBottom: 14,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 5,
                elevation: 3,
                borderLeftWidth: 4,
                borderLeftColor:
                  item.userRole === "Admin"
                    ? "#7C3AED"
                    : item.userRole === "Tutor"
                    ? "#2563EB"
                    : "#10B981",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 14,
                }}
              >
                <Image
                  source={{
                    uri: item.image || "https://via.placeholder.com/150",
                  }}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    backgroundColor: "#F3F4F6",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#111827" }}>
                    {item.userName}
                  </Text>
                  <Text style={{ color: "#6B7280" }}>{item.email}</Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={item.userRole}
                  onValueChange={(value) => handleRoleChange(item._id, value)}
                  style={{ height: 44 }}
                >
                  <Picker.Item label="Student" value="Student" />
                  <Picker.Item label="Tutor" value="Tutor" />
                  <Picker.Item label="Admin" value="Admin" />
                </Picker>
              </View>
            </View>
          )}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            gap: 14,
          }}
        >
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            style={{
              backgroundColor: currentPage === 1 ? "#E5E7EB" : "#7C3AED",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: currentPage === 1 ? "#9CA3AF" : "white",
                fontWeight: "600",
              }}
            >
              Prev
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, color: "#374151" }}>
            Page {currentPage} of {totalPages}
          </Text>

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            style={{
              backgroundColor: currentPage === totalPages ? "#E5E7EB" : "#7C3AED",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: currentPage === totalPages ? "#9CA3AF" : "white",
                fontWeight: "600",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ManageUsers;
