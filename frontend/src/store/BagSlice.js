import { createSlice } from "@reduxjs/toolkit";

const BagSlice = createSlice({
  name: "baglist",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state = state.filter((item) => item.id !== action.payload);
    },
    updateQty: (state, action) => {
      const itemToUpdate = state.find((item) => item.id === action.payload.id);
      if (itemToUpdate && itemToUpdate.Qty !== action.payload.Qty) {
        itemToUpdate.Qty = action.payload.Qty;
      }
      return state;
    }
  }
})

export const bagActions = BagSlice.actions;
export default BagSlice;