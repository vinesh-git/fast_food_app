import React from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { offers } from "../constants";
import Header from "../components/Home/header";
import Foodcard from "../components/Home/foodCard";
import useAuthStore from "@/store/auth.store";

function Home() {
  const {user} = useAuthStore();
  console.log("user",JSON.stringify(user,null,2));
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        renderItem={({ item, index }) => <Foodcard item={item} index={index} />}
        ListHeaderComponent={() => <Header />}
      />
    </SafeAreaView>
  );
}

export default Home;
