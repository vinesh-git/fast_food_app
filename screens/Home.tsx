import React from 'react'
import { FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { offers } from "../constants";
import Header from "../components/Home/header";
import Foodcard from "../components/Home/foodCard";

function Home() {
  return (
    <SafeAreaView>
            <FlatList data={offers}
                renderItem={({ item, index }) => <Foodcard item={item} index={index} />}
                ListHeaderComponent={() => <Header />}
            />
        </SafeAreaView>
  )
}

export default Home