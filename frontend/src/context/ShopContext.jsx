import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch]= useState("");
    const [showsearch, setshowsearch]= useState(false);


    const ShopContextData = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setshowsearch,
  };

//   const searchedProducts => (()=>{
//       let newProducts = products.slice();
//     if(search){
//         newProducts= newProducts.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
//     }else{
//         null
//     }
//     setfilter
//   })

return (
    <ShopContext.Provider value={ShopContextData}>
        {props.children}
    </ShopContext.Provider>
)

}

export default ShopContextProvider;
