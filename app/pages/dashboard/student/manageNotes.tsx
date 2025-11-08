import useFetchApi from "@/app/src/Api/useFetchApi";
import { AuthContext } from "@/app/src/context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";


const ManageNotes = () => {
  const { user } = useContext(AuthContext);
  const { getMyNotes, deleteNote, updateNote } = useFetchApi();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedNote, setSelectedNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Load Notes
  const loadNotes = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getMyNotes(user.email);
      setNotes(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [user]);

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id, user.email);
      Alert.alert("Success", "Note deleted");
      loadNotes();
    } catch {
      Alert.alert("Error", "Delete failed");
    }
  };

  // Open Update Modal
  const handleUpdate = (note) => {
    setSelectedNote(note);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
    setShowModal(true);
  };

  // Submit Update
  const handleUpdateSubmit = async () => {
    try {
      await updateNote(
        selectedNote._id,
        { title: updatedTitle, description: updatedDescription },
        user.email
      );
      Alert.alert("Success", "Note updated");
      setShowModal(false);
      loadNotes();
    } catch {
      Alert.alert("Error", "Update failed");
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  if (notes.length === 0)
    return (
      <View style={styles.center}>
        <Text>You haven’t created any notes yet.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <ScrollView style={{ maxHeight: 100, marginVertical: 5 }}>
              <Text style={styles.description}>{item.description}</Text>
            </ScrollView>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => handleUpdate(item)}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Note</Text>

            <TextInput
              style={styles.input}
              value={updatedTitle}
              onChangeText={setUpdatedTitle}
              placeholder="Title"
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={updatedDescription}
              onChangeText={setUpdatedDescription}
              placeholder="Description"
              multiline
            />

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleUpdateSubmit}
              >
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageNotes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4f46e5", // primary color
  },
  noteTitle: { fontSize: 18, fontWeight: "bold" },
  description: { opacity: 0.8 },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  updateBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});
