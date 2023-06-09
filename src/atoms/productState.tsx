import { atom } from "recoil";
import { ProductModel } from "../models/product.model";

export const productState = atom<ProductModel[]>({
  key: "productState",
  default: [],
});
