import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const UploadMaterials = ({ route }) => {
  const { user } = useContext(AuthContext);
  const { approvedSessions, uploadMaterials } = useFetchApi();
  const sessionIdFromParams = route?.params?.id || "";

  const [title, setTitle] = useState("");
  const [sessionId, setSessionId] = useState(sessionIdFromParams);
  const [driveLink, setDriveLink] = useState("");
  const [image, setImage] = useState(null);
  const [sessions, setSessions] = useState([]);

  const imgbbApiKey = "9f78c7ea3eb88b49292eb95698ec8282";

  useEffect(() => {
    if (!user?.email) return;
    approvedSessions(user.email)
      .then((res) => setSessions(res))
      .catch((err) => console.error(err));
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!title || !sessionId || !driveLink || !image) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        name: "material.jpg",
        type: "image/jpeg",
      });

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = imgRes.data.data.url;

      const payload = {
        title,
        sessionId,
        tutorEmail: user.email,
        driveLink,
        image: imageUrl,
      };

      const res = await uploadMaterials(payload, user.email);
      if (res.acknowledged) {
        Alert.alert("Success", "Material uploaded successfully!");
        setTitle("");
        setSessionId(sessionIdFromParams);
        setDriveLink("");
        setImage(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload material");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Upload Study Materials</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Material title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Study Session</Text>
        {!sessionIdFromParams ? (
          <View style={styles.pickerContainer}>
            {sessions.map((session) => (
              <TouchableOpacity
                key={session._id}
                style={[
                  styles.sessionOption,
                  sessionId === session._id && styles.sessionOptionSelected,
                ]}
                onPress={() => setSessionId(session._id)}
              >
                <Text>{session.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TextInput style={[styles.input, { backgroundColor: "#E5E7EB" }]} value={sessionId} editable={false} />
        )}

        <Text style={styles.label}>Tutor Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#E5E7EB" }]}
          value={user?.email}
          editable={false}
        />

        <Text style={styles.label}>Google Drive Link</Text>
        <TextInput
          style={styles.input}
          placeholder="https://drive.google.com/..."
          value={driveLink}
          onChangeText={setDriveLink}
        />

        <Text style={styles.label}>Select Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text>{image ? "Image Selected" : "Pick an Image"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload Material</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3E8FF" },
  formContainer: { backgroundColor: "#EDE7F6", padding: 20, borderRadius: 12 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2563EB" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  pickerContainer: { flexDirection: "column", marginBottom: 12 },
  sessionOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 8,
    marginBottom: 6,
  },
  sessionOptionSelected: { backgroundColor: "#D1FAE5", borderColor: "#10B981" },
  imagePicker: {
    padding: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default UploadMaterials;
