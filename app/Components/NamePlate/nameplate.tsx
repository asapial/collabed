import React from "react";
import { View, Text,  Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import img from "../../assets/Picture/collabed-high-resolution-logo-transparent (1).png";

const CollabEdNamePlate = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Home")}>
      <View style={styles.container}>
        {/* <Image source={img} style={styles.logo} /> */}
        <Text style={styles.title}>CollabEd</Text>
      </View>
    </Pressable>
  );
};

export default CollabEdNamePlate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d6efd", // primary color
  },
});
