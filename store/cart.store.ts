import { CartCustomization, CartItemType, CartStore } from "@/type";
import { create } from "zustand";

const areCustomizationEqual = (a : CartCustomization[], b:CartCustomization[]) : boolean => {
    if(a.length!==b.length) return false;
    const asorted = a.sort((x,y)=> x.id.localeCompare(y.id));
    const bsorted = b.sort((x,y)=> x.id.localeCompare(y.id));

    return asorted.every((item,index) => item.id === bsorted[index].id);
}

const useCartStore = create<CartStore>((set,get)=>({
    items : [],
    addItem : (item)=>{
        const customizations = item.customizations ?? [];
        const existing = get().items.find(i => i.id=== item.id && areCustomizationEqual(customizations,i.customizations ?? [])) ;
        console.log("is item exists",existing);
        if(existing){
            set({
                items : get().items.map((i)=> i.id===item.id && areCustomizationEqual(i.customizations ?? [],customizations) ? {...i, quantity : i.quantity+1} : i)
            })
        }
        else{
            set({
                items : [...get().items,{...item, quantity : 1, customizations}]
            });
        }
    },
    removeItem : (id, customizations=[])=>{
        set({
            items : get().items.filter(item => !(item.id===id && areCustomizationEqual(item.customizations ?? [] , customizations)))
        });
    },
    increaseQty : (id,customizations=[])=>{
        set({
            items : get().items.map(item => item.id===id && areCustomizationEqual(item.customizations ?? [],customizations) ? {...item,quantity : item.quantity+1} : item)
        })
    },
    decreaseQty : (id, customizations =[])=>{
        set({
            items : get().items.map(item => id===item.id && areCustomizationEqual(item.customizations ?? [],customizations) ? {...item, quantity : item.quantity-1} : item)
        })
    },
    clearCart : ()=> set({items : []}),

    getTotalItems : () => (
        get().items.reduce((total,item)=>(total + item.quantity),0)
    ),

    getTotalPrice : () => (
        get().items.reduce((total,item) => {
            const basePrice = item.price;
            const custoPrice = item.customizations?.reduce((t:number,i:CartCustomization) => t+i.price,0) ?? 0;
            return total+item.quantity * (basePrice+custoPrice);
        },0)
    )
}))


export default useCartStore;