import FoodCart from "@/components/Home/foodCart";
import Filter from "@/components/search/Filter";
import MenuCard from "@/components/search/MenuCard";
import SearchBar from "@/components/search/SearchBar";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem, RootStackParamList } from "@/type";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



type SearchRouteProp = RouteProp<RootStackParamList, 'Filter'>;

function Search() {
  const route = useRoute<SearchRouteProp>();
  const { category, query } = route.params ?? {};
  // console.log("category param is ", category)
  const { data, loading, error, refetch } = useAppwrite({
    fn: getMenu,
    params: { category: category!, query: query!, limit: 6 },
  });
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category: category!, query: query!, limit: 6 });
  }, [category, query]);
  // console.log(data[0]);
  return (
    <SafeAreaView style={style.safeareaView}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstright = index % 2 === 0;
          return (
            <View style={[!isFirstright ? { transform: [{ translateY: 70 }] } : { transform: [{ translateY: 0 }] }, { flex: 1, padding: 10 }]}>
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          )
        }}
        numColumns={2}
        keyExtractor={(item) => item.$id}
        columnWrapperStyle={{
          gap: 20
        }}
        contentContainerStyle={{ gap: 40 }}
        ListHeaderComponent={() => (
          <View style={style.exteriorHeaderContainer}>
            <View style={style.flexHeaderContainer}>
              <View style={style.interiorHeaderContainer}>
                <Text style={style.searchText}>Search</Text>
                <Text>Find your favorite food</Text>
              </View>
              <FoodCart />
            </View>
            <View style={{ gap: 10 }}>
              <SearchBar />
              <Filter categories={categories as unknown as Category[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text style={{ textAlign: 'center' }}>No content</Text>}
      />
    </SafeAreaView>
  );
}

export default Search;

const style = StyleSheet.create({
  safeareaView: {
    backgroundColor: "#ffffff",
    height: '100%'
  },
  exteriorHeaderContainer: {
    margin: 10,
    gap: 10
  },
  flexHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  interiorHeaderContainer: {
    justifyContent: "flex-start",
    gap: 5
  },
  searchText: {
    color: "#FE8C00",
    fontWeight: 600
  }
})