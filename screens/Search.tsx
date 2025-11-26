import FoodCart from "@/components/Home/foodCart";
import MenuCard from "@/components/search/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
function Search() {
  const { category, query } = useLocalSearchParams<{
    category?: string;
    query?: string;
  }>();

  const { data, loading, error, refetch } = useAppwrite({
    fn: getMenu,
    params: { category: category!, query: query!, limit: 6 },
  });
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category: category!, query: query!, limit: 6 });
  }, [category, query]);
   console.log(data);
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstright = index % 2 === 0;
          return (
            <View style={[!isFirstright ? {transform : [{translateY : 50}] } : {transform : [{translateY : 0}] },{flex : 1,padding : 10}]}>
              <MenuCard item={item as unknown as MenuItem}/>
            </View>
          )
        }}
        numColumns={2}
        keyExtractor={(item) => item.$id}
        columnWrapperStyle = {{
          gap : 20
        }}
        contentContainerStyle = {{gap : 40}}
        ListHeaderComponent={() => (
          <View style={{ margin: 10, gap: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ color: "#FE8C00", fontWeight: 600 }}>Search</Text>
                <Text>Find your favorite food</Text>
              </View>
              <FoodCart />
            </View>
            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No content</Text>}
      />
    </SafeAreaView>
  );
}

export default Search;
