import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //ACTIONS
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id 
      );

      let newBasket = [...state.items];

      if(index >= 0){
        //The Item exists in the Basket... Remove it
        newBasket.splice(index, 1);

      }else{
        //The item does not exixts.. 
        console.warn(`Can't remove product (id: ${action.payload.id}) as it is not in the Basket`)
      }

      state.items = newBasket;

    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
//This selectTotal will calculate the total of items in cart...
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price , 0);

export default basketSlice.reducer;
