import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/app/src/context/AuthContext";
import useFetchApi from "@/app/src/Api/useFetchApi";
// import { AuthContext } from "../../main";
// import useFetchApi from "../../Api/useFetchApi";
// import { SuccessToast, ErrorToast } from "../../utils/ToastMaker";

const SessionDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { getSessionById, getSessionReviews, bookSession, postReview, checkBooked } = useFetchApi();

  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getSessionById(id);
        const r = await getSessionReviews(id);
        const b = await checkBooked(user?.email, id);

        setSession(s);
        setReviews(r || []);
        setIsBooked(b);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // ErrorToast("Failed to load data");
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  const currentDate = new Date();
  const isRegistrationOpen =
    currentDate >= new Date(session.registrationStart) &&
    currentDate <= new Date(session.registrationEnd);

  const handleBooking = async () => {
    if (parseFloat(session?.registrationFee) > 0) {
      router.push(`/payment/${session._id}`);
    } else {
      const data = await bookSession({
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        sessionId: session._id,
        sessionTitle: session.title,
      });

      // if (data?.acknowledged) SuccessToast("Session booked successfully!");
    }
  };

  const handleReviewSubmit = async () => {
    // if (!rating || !comment) return ErrorToast("Fill both fields");

    const res = await postReview({
      reviewerEmail: user.email,
      comment,
      rating,
      sessionId: id,
    });

    if (res?.acknowledged) {
      // SuccessToast("Review posted");
      setComment("");
      setRating(0);
      const newReviews = await getSessionReviews(id);
      setReviews(newReviews);
    } else {
      // ErrorToast("Failed to post review");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ borderWidth: 2, borderColor: "#7C3AED", padding: 15, borderRadius: 15 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#7C3AED" }}>
          <FontAwesome name="book" size={22} /> {session.title}
        </Text>

        <Text style={{ marginTop: 10 }}>
          <FontAwesome name="user" /> Tutor: {session.tutorName}
        </Text>

        <Text>
          <FontAwesome name="star" /> Avg Rating: 4.5 (mocked)
        </Text>

        <Text style={{ marginVertical: 10 }}>{session.description}</Text>

        <Text>
          <FontAwesome name="calendar" /> Registration: {session.registrationStart} → {session.registrationEnd}
        </Text>

        <Text>
          <FontAwesome name="calendar" /> Class: {session.classStart} → {session.classEnd}
        </Text>

        <Text>
          <FontAwesome name="clock-o" /> Duration: {session.duration}
        </Text>

        <Text>
          <FontAwesome name="money" /> Fee: {parseFloat(session.registrationFee) > 0 ? `$${session.registrationFee}` : "Free"}
        </Text>

        <TouchableOpacity
          onPress={handleBooking}
          disabled={!isRegistrationOpen || isBooked || user?.userRole !== "Student"}
          style={{
            backgroundColor: isBooked ? "gray" : isRegistrationOpen ? "#7C3AED" : "gray",
            padding: 12,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
            {isBooked ? "✅ Already Booked" : isRegistrationOpen ? "📅 Book Now" : "❌ Registration Closed"}
          </Text>
        </TouchableOpacity>

        {/* REVIEW FORM */}
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>📝 Leave a Review</Text>

          <TextInput
            placeholder="Rating (1-5)"
            keyboardType="numeric"
            value={String(rating)}
            onChangeText={(t) => setRating(Number(t))}
            style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 10 }}
          />

          <TextInput
            placeholder="Write your comment"
            multiline
            value={comment}
            onChangeText={setComment}
            style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 10 }}
          />

          <TouchableOpacity
            onPress={handleReviewSubmit}
            style={{ backgroundColor: "#7C3AED", padding: 12, borderRadius: 10, marginTop: 10 }}
          >
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* REVIEWS */}
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>💬 Student Reviews</Text>

          {reviews.length === 0 ? (
            <Text>No reviews yet.</Text>
          ) : reviews.map((review) => (
            <View key={review._id} style={{ borderWidth: 1, padding: 10, borderRadius: 10, marginTop: 8 }}>
              <Text style={{ fontWeight: "bold" }}>{review.studentEmail}</Text>
              <Text>Rating: {review.rating} / 5</Text>
              <Text>{review.review}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SessionDetails;
