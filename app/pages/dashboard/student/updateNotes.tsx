import React, { useContext, useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  StyleSheet 
} from "react-native";
import { FaStickyNote, FaPen, FaSave, FaEnvelope, FaRegStickyNote } from "react-icons/fa";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";


const UpdateNotes = ({ route }) => {
  const { id } = route.params; // React Native route params
  const { user } = useContext(AuthContext);
  const { getNoteById, updateNoteById } = useFetchApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch note data
  const loadNote = async () => {
    if (!id || !user?.email) return;
    setLoading(true);
    try {
      const note = await getNoteById(id, user.email);
      setTitle(note.title);
      setDescription(note.description);
    } catch (err) {
      Alert.alert("Error", "Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNote();
  }, [id, user]);

  // Update note
  const handleSave = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Note description cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const res = await updateNoteById(id, { title, description }, user.email);
      if (res.modifiedCount > 0) {
        Alert.alert("Success", "Note updated successfully");
      } else {
        Alert.alert("Info", "No changes made");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading note...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>
          <FaStickyNote /> Update Note
        </Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <FaEnvelope /> Your Email
          </Text>
          <TextInput
            value={user?.email || ""}
            editable={false}
            style={[styles.input, styles.disabledInput]}
          />
        </View>

        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <FaPen /> Note Title
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a descriptive note title"
            style={styles.input}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <FaRegStickyNote /> Note Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Write your note description here..."
            multiline
            style={[styles.input, styles.textarea]}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            <FaSave /> {saving ? "Saving..." : "Save Note"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#4f46e5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  disabledInput: {
    backgroundColor: "#eee",
  },
  textarea: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UpdateNotes;
