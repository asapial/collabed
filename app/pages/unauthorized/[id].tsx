import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";

export default function SessionDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { getSessionById, getSessionReviews, bookSession, postReview, checkBooked } = useFetchApi();

  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await getSessionById(id);
        setSession(sessionData);
        const reviewData = await getSessionReviews(id);
        setReviews(reviewData);
        const bookedStatus = await checkBooked(user?.email, id);
        setIsBooked(bookedStatus);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !session) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  console.log("Session Data:", session);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1e3a8a", marginBottom: 8 }}>
        {session.title || session.name}
      </Text>

      <Text style={{ fontSize: 16, opacity: 0.8, marginBottom: 16 }}>
        {session.description || session.desc}
      </Text>

      <View style={{ marginBottom: 24 }}>
        <Text>
          <Ionicons name="person" size={18} /> Tutor: {session.tutorName || session.tutor?.name}
        </Text>
        <Text>
          <FontAwesome name="money" size={18} /> Fee:{" "}
          {session.registrationFee > 0 ? `$${session.registrationFee}` : "Free"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/pages/payment/${session._id}`)}
        disabled={isBooked}
        style={{
          backgroundColor: isBooked ? "#9CA3AF" : "#2563EB",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          {isBooked ? "Already Booked ✅" : "Book Session"}
        </Text>
      </TouchableOpacity>

      {/* Reviews */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Student Reviews</Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review) => (
            <View key={review._id} style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{review.studentEmail}</Text>
              <Text>Rating: {review.rating}/5</Text>
              <Text>{review.review || review.comment}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
