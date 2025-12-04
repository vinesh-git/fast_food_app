import CustomButton from "@/components/Button/CustomButton";
import CartItem from "@/components/Cart/CartItem";
import useCartStore from "@/store/cart.store";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import noitem from '../assets/images/noCartItem.png'


const PaymentInfo = ({
  label,
  value,
  labelStyle = "#6A6A6A",
  valueStyle = "#181C2E",
}: any) => {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <Text style={{ color: labelStyle, fontWeight: 500, fontSize: 16 }}>
        {label}
      </Text>
      <Text style={{ color: valueStyle, fontWeight: 700, fontSize: 16 }}>
        {value}
      </Text>
    </View>
  );
};

function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  console.log(items);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        ListHeaderComponent={()=> <Text style={{fontSize : 20, fontWeight : 800,textAlign : "center", marginVertical : 10,color:'#FE8C00'}}>Cart</Text>}
        ListFooterComponent={() => totalItems>0 && (
          <View style={{ gap: 10, padding: 10 ,marginBottom : 100}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: "#EDEDED",
                padding: 20,
                gap: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#181C2E", fontSize: 20, fontWeight: 700 }}>
                Payment Summary
              </Text>
              <PaymentInfo
                label={"Total Items"}
                value={`$${totalPrice.toFixed(2)}`}
              />
              <PaymentInfo label={"Delivery Fee"} value={`$5.00`} />
              <PaymentInfo
                label={"Discount"}
                value={`-$0.50`}
                valueStyle={"#2F9B65"}
              />
              <View
                style={{
                  borderWidth: 1,
                  width: "100%",
                  marginVertical: 10,
                  borderColor: "#EDEDED",
                }}
              />
              <PaymentInfo label={"Total"} value={`$${(totalPrice - 5 + 0.5).toFixed(2)}`} />
            </View>
            <CustomButton title="Order Now" />
          </View>
        
    )}
    ListEmptyComponent={()=>totalItems ==0 && (
        <View style={{flex : 1,flexDirection : 'column', justifyContent : 'center',alignItems : 'center'}}>
            <Image source={noitem} resizeMode="contain" style={{alignSelf:'center', marginTop : 100,  width : 178,height : 129}} />
            <Text style={{color : '#181C2E',fontSize : 20, fontWeight : 700}}>No items in your cart</Text>
        </View>
    )}
      />
    </SafeAreaView>
  );
}

export default Cart;
