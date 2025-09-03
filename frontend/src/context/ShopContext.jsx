// import { createContext } from "react";
// import { products } from "../assets/assets"; 

// export const ShopContext = createContext();

// const ShopContextProvider = (props)=>{

//     const currency = '$';
//     const delivery_fee = 10;

//     const shopData = {
//         products, currency,delivery_fee
//     }

//     return (
//         <ShopContext.Provider value={shopData}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;


import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    const currency = '$';
    const delivery_fee = 10;

    const ShopContextData = {products, currency, delivery_fee};

return (
    <ShopContext.Provider value={ShopContextData}>
        {props.children}
    </ShopContext.Provider>
)

}

export default ShopContextProvider;


