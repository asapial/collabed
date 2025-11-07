import Banner from "@/app/Components/banner";
import React from "react";
import { View, ScrollView } from "react-native";

// import Banner from "../../components/Home/Banner";
// import SixStudySession from "../../components/Home/SixStudySession";
// import TopCollaborations from "../../components/Home/TopCollaborations";
// import UpcomingLiveCollaborations from "../../components/Home/UpcomingLiveCollaborations";
// import ResourcesLearningPaths from "../../components/Home/ResourcesLearningPaths";

const Home = () => {
  return (
    <ScrollView>
      <View>
        <Banner></Banner>

      </View>
    </ScrollView>
  );
};

export default Home;
