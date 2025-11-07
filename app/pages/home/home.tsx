
import Banner from "@/app/Components/home/banner";
import SixStudySession from "@/app/Components/home/sixStudySession";
import React from "react";
import { View, ScrollView } from "react-native";


const Home = () => {
  return (
    <ScrollView>
      <View>
        <Banner></Banner>\
        <SixStudySession></SixStudySession>
      </View>
    </ScrollView>
  );
};

export default Home;
