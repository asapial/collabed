import React, { useContext, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

const CreateSession = () => {
  const { user } = useContext(AuthContext);
  const { createSession } = useFetchApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [registrationStart, setRegistrationStart] = useState("");
  const [registrationEnd, setRegistrationEnd] = useState("");
  const [classStart, setClassStart] = useState("");
  const [classEnd, setClassEnd] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Validation Error", "Title and Description are required!");
      return;
    }

    const sessionData = {
      title,
      description,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration,
      registrationFee: 0,
      status: "pending",
    };

    try {
      const res = await createSession(user.email, sessionData);
      if (res.acknowledged) {
        Alert.alert("Success", "Session Created Successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setRegistrationStart("");
        setRegistrationEnd("");
        setClassStart("");
        setClassEnd("");
        setDuration("");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      Alert.alert("Error", "Failed to create session.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create Study Session</Text>

        <Text style={styles.label}>Session Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Advanced JavaScript"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Tutor Name</Text>
        <TextInput
          style={styles.input}
          value={user?.displayName}
          editable={false}
        />

        <Text style={styles.label}>Tutor Email</Text>
        <TextInput
          style={styles.input}
          value={user?.email}
          editable={false}
        />

        <Text style={styles.label}>Session Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Write a short description about the session..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Registration Start</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={registrationStart}
          onChangeText={setRegistrationStart}
        />

        <Text style={styles.label}>Registration End</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={registrationEnd}
          onChangeText={setRegistrationEnd}
        />

        <Text style={styles.label}>Class Start</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={classStart}
          onChangeText={setClassStart}
        />

        <Text style={styles.label}>Class End</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={classEnd}
          onChangeText={setClassEnd}
        />

        <Text style={styles.label}>Session Duration</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 4 Weeks, 8 Classes"
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={styles.label}>Registration Fee</Text>
        <TextInput
          style={styles.input}
          value="0"
          editable={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Session</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3E8FF" },
  formContainer: { backgroundColor: "#EDE7F6", padding: 20, borderRadius: 12 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#16A34A" },
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
  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CreateSession;
