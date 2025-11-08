import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";

import { FaSave } from "react-icons/fa";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const { createNote } = useFetchApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return Alert.alert("Validation", "Please enter a title");
    if (!description.trim()) return Alert.alert("Validation", "Please enter some description");

    const noteData = {
      email: user?.email,
      title,
      description,
    };

    try {
      setIsSaving(true);
      const res = await createNote(noteData, user.email);

      if (res?.success) {
        Alert.alert("Success", "Note created successfully!");
        setTitle("");
        setDescription("");
      } else {
        Alert.alert("Error", "Failed to create note");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create a Note</Text>

      {/* Email */}
      <Text style={styles.label}>Your Email</Text>
      <TextInput value={user?.email} editable={false} style={[styles.input, { backgroundColor: "#e5e5e5" }]} />

      {/* Title */}
      <Text style={styles.label}>Note Title</Text>
      <TextInput
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Description */}
      <Text style={styles.label}>Note Description</Text>
      <TextInput
        placeholder="Write your note..."
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.textarea]}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isSaving}>
        <Text style={styles.buttonText}>{isSaving ? "Saving..." : "Save Note"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#7C3AED",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 15,
    fontSize: 16,
  },
  textarea: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CreateNote;
