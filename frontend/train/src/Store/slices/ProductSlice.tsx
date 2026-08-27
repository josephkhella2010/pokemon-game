import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { inputArrValType, ProductsType } from "../../utilities/interfaces";
import { createId } from "../../utilities/functios";

const productStorage = localStorage.getItem("products");
const parsedProduct = productStorage ? JSON.parse(productStorage) : [];

interface initialStateType {
  products: ProductsType[];
}

const initialState: initialStateType = {
  products: parsedProduct,
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsType[]>) => {
      state.products = action.payload;
    },
    setAddProduct: (state, action: PayloadAction<inputArrValType>) => {
      const product = {
        ...action.payload,
        id: createId(),
      };

      state.products.push(product);

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setDeleteProduct: (state, action: PayloadAction<string | number>) => {
      const productId = action.payload;
      const findProductIndex = state.products.findIndex(
        (item) => item.id === productId,
      );
      if (findProductIndex !== -1) {
        state.products.splice(findProductIndex, 1);
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setUpdateProduct: (
      state,
      action: PayloadAction<{ product: inputArrValType; id: string | number }>,
    ) => {
      const productId = action.payload.id;
      const findProductIndex = state.products.findIndex(
        (item) => item.id === productId,
      );
      if (findProductIndex !== -1) {
        state.products[findProductIndex] = {
          ...state.products[findProductIndex],
          ...action.payload.product,
        };
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const {
  setProducts,
  setAddProduct,
  setDeleteProduct,
  setUpdateProduct,
} = ProductSlice.actions;

export default ProductSlice.reducer;
