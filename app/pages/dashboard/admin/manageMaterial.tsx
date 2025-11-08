import useFetchApi from "@/app/src/Api/useFetchApi";
import { AuthContext } from "@/app/src/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
// import useFetchApi from "../../../Api/useFetchApi";
// import { AuthContext } from "../../../main";
// import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";

const ManageMaterials = () => {
  const { getAllMaterialsAdmin, deleteMaterial } = useFetchApi();
  const { user } = useContext(AuthContext);

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMaterials = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await getAllMaterialsAdmin(user.email);
      setMaterials(res || []);
    } catch (err) {
      console.error(err);
    //   ErrorToast("Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!user) return;

     await deleteMaterial(id, user.email);

    // Alert.alert(
    //   "Confirm Delete",
    //   "Are you sure you want to remove this material?",
    //   [
    //     { text: "Cancel", style: "cancel" },
    //     {
    //       text: "Delete",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await deleteMaterial(id, user.email);
    //         //   SuccessToast("Material removed successfully");
    //           fetchMaterials();
    //         } catch (err) {
    //           console.error(err);
    //         //   ErrorToast("Failed to remove material");
    //         }
    //       },
    //     },
    //   ]
    // );
  };

  const handleOpenLink = (link) => {
    Linking.openURL(link).catch((err) => console.error("Failed to open link", err));
  };

  useEffect(() => {
    fetchMaterials();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📂 Manage Materials</Text>

      {materials.length === 0 ? (
        <Text style={styles.noData}>No materials found.</Text>
      ) : (
        materials.map((material, index) => (
          <View key={material._id} style={styles.card}>
            <View style={styles.row}>
              <Image
                source={{ uri: material.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.materialTitle}>{material.title}</Text>
                <Text style={styles.materialEmail}>{material.tutorEmail}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => handleOpenLink(material.driveLink)}>
              <Text style={styles.driveLink}>View Drive File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemove(material._id)}
            >
              <Text style={styles.deleteButtonText}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3E8FF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#D97706", // amber-500
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#7C3AED", // primary
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  materialEmail: {
    fontSize: 14,
    color: "#888",
  },
  driveLink: {
    color: "#7C3AED",
    fontSize: 14,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  deleteButton: {
    backgroundColor: "#EF4444", // red-500
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default ManageMaterials;
