import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router, useNavigation } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

const AppBar = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  // console.log("AppBar User:", user);

  const title = "Collabed";


const onMenuPress = () => {
  navigation.toggleDrawer();  // open/close drawer
};

  const onProfilePress = () => {
    router.push("/pages/authentication/login");
  };

  return (
    <View style={styles.appBar}>
      {/* Left Menu Icon */}
      <TouchableOpacity onPress={onMenuPress}>
        <AntDesign name="menu-unfold" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <FontAwesome5 name="graduation-cap" size={24} style={{ marginRight: 8 }} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Profile Icon */}
      <TouchableOpacity onPress={onProfilePress}>
        <View>
          {user && user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}  // <-- use photoURL, not image
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <MaterialIcons name="account-circle" size={40} color="black" />
          )}
        </View>

        <Text style={{ marginLeft: 8 }}>{user?.displayName || "Profile"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    height: 65,
    backgroundColor: "#FEF9F3",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#19436D",
    fontSize: 24,
    fontWeight: "700",
  },
});
