import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const AppBar = () => {
    // { title, onMenuPress, onProfilePress }
    const title = "Collabed";
    const onMenuPress = () => {
        // Handle menu press
    }
    const onProfilePress = () => {
        // Handle profile press
    }

  return (
    <View style={styles.appBar}>
      {/* Left Menu Icon */}
      <TouchableOpacity onPress={onMenuPress}>
       <AntDesign name="menu-unfold" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        <FontAwesome5 name="graduation-cap" size={24}/>
        {title}</Text>

      {/* Right Profile Icon */}
      <TouchableOpacity onPress={onProfilePress}>
        <MaterialIcons name="account-circle" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    height: 65,
    backgroundColor: "#FEF9F3", // Primary Color
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // Material 3 Rounded Bottom
    // borderBottomLeftRadius: 18,
    // borderBottomRightRadius: 18,

    // Soft shadow
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    color: "#19436D",
    fontSize: 30,
    fontWeight: "700",
  },
});
