import {View,Image,Pressable,Text} from 'react-native'
import { Fragment } from 'react';
import cta from '../../assets/images/cta.png'
import { FoodType } from '@/interface/foodType';

const Foodcard = ({item,index}:{item:FoodType,index:number}) => {
    const iseven = index %2 === 0;
    return (
        <View>
            <Pressable android_ripple={{ color: 'red' }} style={[{ backgroundColor: item.color, height: 200, margin: 10, borderRadius: 10, flex: 1, flexDirection: 'row' }, iseven ? { flexDirection: "row" } : { flexDirection: 'row-reverse' }]} >
                {({ pressed }) => (
                    <Fragment>
                        <View style={{ height: '100%', width: '50%' }}>
                            <Image source={item.image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                        </View>
                        <View style={[{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }, iseven ? { paddingLeft: 20 } : { paddingLeft: 20 }]}>
                            <Text style={{ color: '#ffffff', fontWeight: 800, fontSize: 24 }}>{item.title}</Text>
                            <Image source={cta} resizeMode="contain" tintColor='#ffffff' />
                        </View>
                    </Fragment>
                )}
            </Pressable>
        </View>
    )
}

export default Foodcard;